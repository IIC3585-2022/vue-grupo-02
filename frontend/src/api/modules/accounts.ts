import client from '@/api/client';
import { Account } from '@/interfaces/entities/account';

export const list = async (linkId: string): Promise<Array<Account>> => {
  const response = await client.get(`/links/${linkId}/accounts`);
  return response.data;
};
