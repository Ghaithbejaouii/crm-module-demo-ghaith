import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOpportuniteDto } from './dto/create-opportunite.dto';
import { UpdateOpportuniteDto } from './dto/update-opportunite.dto';
import { FilterOpportuniteDto } from './dto/filter-opportunite.dto';

const JOURS_STAGNATION = 21;
const ETAPES_FINALES = ['GAGNE', 'PERDU'];

function estAProblem(op: { etape: string; dateSignaturePrevue: Date; updatedAt: Date }) {
  if (ETAPES_FINALES.includes(op.etape)) return false;
  const maintenant = new Date();
  const enRetard = op.dateSignaturePrevue < maintenant;
  const joursDepuisMaj = (maintenant.getTime() - op.updatedAt.getTime()) / (1000 * 60 * 60 * 24);
  const stagnante = joursDepuisMaj > JOURS_STAGNATION;
  return enRetard || stagnante;
}

@Injectable()
export class OpportunitesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateOpportuniteDto) {
    return this.prisma.opportunite.create({ data: dto });
  }

  async findAll(filter: FilterOpportuniteDto) {
    const page = filter.page ?? 1;
    const limit = filter.limit ?? 10;

    const where: any = {};
    if (filter.etape) where.etape = filter.etape;
    if (filter.typeClient) where.client = { type: filter.typeClient };

    const [data, total] = await Promise.all([
      this.prisma.opportunite.findMany({
        where,
        include: { client: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.opportunite.count({ where }),
    ]);

    const dataAvecFlag = data.map((op) => ({
      ...op,
      estAProblem: estAProblem(op),
    }));

    return {
      data: dataAvecFlag,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const op = await this.prisma.opportunite.findUnique({
      where: { id },
      include: { client: true },
    });
    if (!op) throw new NotFoundException(`Opportunité ${id} introuvable`);
    return { ...op, estAProblem: estAProblem(op) };
  }

  async update(id: string, dto: UpdateOpportuniteDto) {
    await this.findOne(id);
    return this.prisma.opportunite.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.opportunite.delete({ where: { id } });
  }

  async recapPipeline() {
    const opportunites = await this.prisma.opportunite.findMany();

    const valeurTotale = opportunites.reduce((sum, op) => sum + Number(op.montant), 0);
    const nombreTotal = opportunites.length;
    const aRisque = opportunites.filter(estAProblem).length;

    const etapes = ['PROSPECTION', 'QUALIFICATION', 'PROPOSITION', 'NEGOCIATION', 'GAGNE', 'PERDU'];
    const parEtape = etapes.map((etape) => {
      const opsEtape = opportunites.filter((op) => op.etape === etape);
      return {
        etape,
        nombre: opsEtape.length,
        montant: opsEtape.reduce((sum, op) => sum + Number(op.montant), 0),
      };
    });

    return { valeurTotale, nombreTotal, aRisque, parEtape };
  }
}