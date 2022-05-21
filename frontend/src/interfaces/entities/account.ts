export interface Account {
  id: string
  object: 'account'
  name: string
  officialName: string
  number: string
  holderId: string
  holderName: string
  type: string
  currency: string
  balance: {
    available: number
    current: number
    limit: number
  }
  refreshedAt: string
}

export interface AccountSnaked {
  id: string
  object: 'account'
  name: string
  official_name: string
  number: string
  holder_id: string
  holder_name: string
  type: string
  currency: string
  balance: {
    available: number
    current: number
    limit: number
  }
  refreshed_at: string
}
