import axios from 'axios';
import { onMounted, onUnmounted, ref } from 'vue';
import { BASE_API_HOST, PING_PATH, POLLING_INTERVAL_IN_SECONDS } from '@/constants';
import { Nullable } from '@/interfaces/common';

const PING_URL = `${BASE_API_HOST}${PING_PATH}`;

const ping = async () => {
  try {
    await axios.get(PING_URL);
    return true;
  } catch {
    return false;
  }
};

export const useHerokuSleepingDyno = () => {
  const ready = ref(false);
  let interval: Nullable<number> = null;

  const callback = async () => {
    if (await ping()) {
      ready.value = true;
    }
  };

  onMounted(() => {
    callback();
    interval = setInterval(callback, POLLING_INTERVAL_IN_SECONDS * 1000);
  });

  onUnmounted(() => {
    if (interval !== null) {
      clearInterval(interval);
    }
  });

  return { ready };
};
