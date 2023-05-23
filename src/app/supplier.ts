export interface Supplier {
  id: number;
  name: string;
  phone_number: number;
  cnpj: number;
  categoria: string;
  produto: string;
  isAcceptedTerms: boolean;
  isVerifiedSupplier: boolean;
}
