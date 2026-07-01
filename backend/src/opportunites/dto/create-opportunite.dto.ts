import { IsEnum, IsString, IsNumber, IsPositive, IsDateString, IsUUID } from 'class-validator';

export enum EtapePipeline {
  PROSPECTION = 'PROSPECTION',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSITION = 'PROPOSITION',
  NEGOCIATION = 'NEGOCIATION',
  GAGNE = 'GAGNE',
  PERDU = 'PERDU',
}

export class CreateOpportuniteDto {
  @IsString()
  titre!: string;

  @IsNumber()
  @IsPositive()
  montant!: number;

  @IsDateString()
  dateSignaturePrevue!: string;

  @IsEnum(EtapePipeline)
  etape!: EtapePipeline;

  @IsUUID()
  clientId!: string;
}