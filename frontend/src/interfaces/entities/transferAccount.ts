import { FinancialInstitution } from '@/interfaces/entities/financialInstitution';
import { Nullable } from '@/interfaces/common';

export interface TransferAccount {
  holderId: string
  holderName: string
  number: string
  institution: Nullable<FinancialInstitution>
}
