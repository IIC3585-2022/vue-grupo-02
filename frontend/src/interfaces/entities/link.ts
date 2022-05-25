import type { Account, AccountSnaked } from '@/interfaces/entities/account';
import type { FinancialInstitution } from '@/interfaces/entities/financialInstitution';
import type { Mode, Status } from '@/interfaces/enums';
import type { Nullable } from '@/interfaces/common';

export interface BackendLink {
  id: string
  fintocId: string
  fintocToken: string
  refreshed: boolean
}

export interface Link {
  id: string
  object: 'link'
  username: string
  holderId: string
  linkToken: Nullable<string>
  holderType: string
  createdAt: string
  institution: FinancialInstitution
  mode: Mode
  active: boolean
  status: Status
  accounts: Nullable<Array<Account>>
}

export interface LinkSnaked {
  id: string
  object: 'link'
  username: string
  holder_id: string
  link_token: Nullable<string>
  holder_type: string
  created_at: string
  institution: FinancialInstitution
  mode: Mode
  active: boolean
  status: Status
  accounts: Nullable<Array<AccountSnaked>>
}
