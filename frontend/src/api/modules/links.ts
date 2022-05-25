import client from '@/api/client';
import { BackendLink } from '@/interfaces/entities/link';

export const get = async (linkId: string): Promise<BackendLink> => {
  const response = await client.get(`/links/${linkId}`);
  return response.data;
};
