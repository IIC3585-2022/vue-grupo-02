import client from '@/api/client';
import type { Movement } from '@/interfaces/entities/movement';

export const list = async (
  linkId: string,
  inboundAccountId: string,
  outboundAccountId: string,
): Promise<{ inboundMovements: Array<Movement>, outboundMovements: Array<Movement> }> => {
  const response = await client.post(`/links/${linkId}/movements`, {
    inboundAccountId,
    outboundAccountId,
  });
  return response.data;
};
