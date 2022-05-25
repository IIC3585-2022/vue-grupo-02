import { TransferAccount } from '@/interfaces/entities/transferAccount';
import { Nullable } from '@/interfaces/common';

export interface Movement {
  amount: number
  postDate: string
  description: string
  recipientAccount: Nullable<TransferAccount>
  comment: Nullable<string>
}
