import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import type { Account } from '@/interfaces/entities/account';
import type { Nullable } from '@/interfaces/common';

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    allAccounts: <Array<Account>>[],
    inboundAccount: <Nullable<Account>>null,
    outboundAccount: <Nullable<Account>>null,
  }),
  actions: {
    async loadAccounts(linkId: string) {
      this.allAccounts = await api.accounts.list(linkId);
    },
    loadUsableAccounts(inboundString: string, outboundtring: string) {
      this.inboundAccount = this.getByFormattedString(inboundString);
      this.outboundAccount = this.getByFormattedString(outboundtring);
    },
    getByFormattedString(formattedString: string) {
      if ((this?.allAccounts ?? null) === null) {
        return null;
      }
      const number = formattedString.split(' ').at(-1);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.allAccounts!.filter((account) => account.number === number).at(0) ?? null;
    },
  },
  getters: {
    allAccountsFormatted: (state) => state.allAccounts.map((account) => ({
      text: '', // Vuetify has the wrong type declarations for the v-select item
      title: `${account.name} ${account.number}`,
      value: `${account.name} ${account.number}`,
    })),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountsStore, import.meta.hot));
}
