import { IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';

export enum TypeClient {
  ENTREPRISE = 'ENTREPRISE',
  PARTICULIER = 'PARTICULIER',
}

export class CreateClientDto {
  @IsEnum(TypeClient)
  type!: TypeClient;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  // Champs particulier
  @IsOptional()
  @IsString()
  nom?: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  // Champs entreprise
  @IsOptional()
  @IsString()
  raisonSociale?: string;

  @IsOptional()
  @IsString()
  siret?: string;

  @IsOptional()
  @IsString()
  secteurActivite?: string;

  @IsOptional()
  @IsString()
  nomContact?: string;
}
