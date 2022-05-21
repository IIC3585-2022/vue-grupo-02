import { getFintoc } from '@fintoc/fintoc-js';
import { BASE_API_HOST, FINTOC_PUBLIC_KEY, LINK_CREATED_WEBHOOK_PATH } from '@/constants';
import type { LinkSnaked } from '@/interfaces/entities/link';

const WEBHOOK_ENDPOINT_URL = `${BASE_API_HOST}${LINK_CREATED_WEBHOOK_PATH}`;

const fintocPromise = getFintoc();

export const useFintocWidget = async ({
  onSuccess = () => null,
  onExit = () => null,
}: {
  onSuccess?: (link: LinkSnaked) => void,
  onExit?: () => void,
}) => {
  const fintoc = await fintocPromise;

  return fintoc?.create({
    publicKey: FINTOC_PUBLIC_KEY,
    webhookUrl: WEBHOOK_ENDPOINT_URL,
    holderType: 'individual',
    product: 'movements',
    onSuccess,
    onExit,
  }) || null;
};
