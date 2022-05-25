import { defineStore, acceptHMRUpdate } from 'pinia';
import { camelizeKeys } from 'humps';
import * as api from '@/api';
import { useAccountsStore } from '@/stores/accounts';
import type { Link, LinkSnaked } from '@/interfaces/entities/link';
import type { Nullable } from '@/interfaces/common';

export const useLinkStore = defineStore('link', {
  state: () => ({
    link: <Nullable<Link>>null,
  }),
  actions: {
    async loadLink(snakedLink: LinkSnaked) {
      this.link = camelizeKeys(snakedLink) as Link;

      const accountsStore = useAccountsStore();
      await accountsStore.loadAccounts(this.link.id);
    },
    async isRefreshed() {
      if (!this.link) {
        return false;
      }
      const link = await api.links.get(this.link.id);

      const accountsStore = useAccountsStore();
      return (
        link.refreshedAccounts.includes(accountsStore.outboundAccount?.id || '')
        && link.refreshedAccounts.includes(accountsStore.inboundAccount?.id || '')
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinkStore, import.meta.hot));
}
