export type TypeClient = "ENTREPRISE" | "PARTICULIER";

export type EtapePipeline =
  | "PROSPECTION"
  | "QUALIFICATION"
  | "PROPOSITION"
  | "NEGOCIATION"
  | "GAGNE"
  | "PERDU";

export interface Client {
  id: string;
  type: TypeClient;
  email?: string | null;
  telephone?: string | null;
  adresse?: string | null;
  nom?: string | null;
  prenom?: string | null;
  raisonSociale?: string | null;
  siret?: string | null;
  secteurActivite?: string | null;
  nomContact?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunite {
  id: string;
  titre: string;
  montant: string;
  dateSignaturePrevue: string;
  etape: EtapePipeline;
  clientId: string;
  client?: Client;
  createdAt: string;
  updatedAt: string;
  estAProblem?: boolean;
}

export interface PaginatedOpportunites {
  data: Opportunite[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PipelineRecap {
  valeurTotale: number;
  nombreTotal: number;
  aRisque: number;
  parEtape: {
    etape: EtapePipeline;
    nombre: number;
    montant: number;
  }[];
}