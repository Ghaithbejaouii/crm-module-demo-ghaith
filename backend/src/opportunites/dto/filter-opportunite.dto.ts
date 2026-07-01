import { IsEnum, IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { EtapePipeline } from './create-opportunite.dto';

export enum TypeClientFilter {
  ENTREPRISE = 'ENTREPRISE',
  PARTICULIER = 'PARTICULIER',
}

export class FilterOpportuniteDto {
  @IsOptional()
  @IsEnum(EtapePipeline)
  etape?: EtapePipeline;

  @IsOptional()
  @IsEnum(TypeClientFilter)
  typeClient?: TypeClientFilter;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}