import { defineStore, acceptHMRUpdate } from 'pinia';
import { camelizeKeys } from 'humps';
import * as api from '@/api';
import type { Link, LinkSnaked } from '@/interfaces/entities/link';
import type { Nullable } from '@/interfaces/common';

export const useLinkStore = defineStore('link', {
  state: () => ({
    link: <Nullable<Link>>null,
  }),
  actions: {
    async loadLink(snakedLink: LinkSnaked) {
      this.link = camelizeKeys(snakedLink) as Link;
      const accounts = await api.accounts.list(this.link.id);
      this.link.accounts = accounts;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLinkStore, import.meta.hot));
}
