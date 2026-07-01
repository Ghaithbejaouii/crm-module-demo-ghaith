import { Module } from '@nestjs/common';
import { OpportunitesService } from './opportunites.service';
import { OpportunitesController } from './opportunites.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OpportunitesController],
  providers: [OpportunitesService],
})
export class OpportunitesModule {}