import client from '@/api/client';

export const list = async (
  linkId: string,
  inboundAccountId: string,
  outboundAccountId: string,
): Promise<{ inboundMovements: Array<any>, outboundMovements: Array<any> }> => {
  const response = await client.post(`/links/${linkId}/movements`, {
    inboundAccountId,
    outboundAccountId,
  });
  return response.data;
};
