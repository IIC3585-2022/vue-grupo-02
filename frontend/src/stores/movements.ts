import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { useAccountsStore } from '@/stores/accounts';
import { useLinkStore } from '@/stores/link';

export const useMovementsStore = defineStore('movements', {
  state: () => ({
    loading: true,
    inbound: <Array<any>>[],
    outbound: <Array<any>>[],
  }),
  actions: {
    async loadMovements() {
      const accountsStore = useAccountsStore();
      const linkStore = useLinkStore();

      if (linkStore.link && accountsStore.inboundAccount && accountsStore.outboundAccount) {
        this.loading = true;

        const { inboundMovements, outboundMovements } = await api.movements.list(
          linkStore.link.id,
          accountsStore.inboundAccount.id,
          accountsStore.outboundAccount.id,
        );

        this.inbound = inboundMovements;
        this.outbound = outboundMovements;

        this.loading = false;
      }
    },
  },
  getters: {
    totalInbound: (state): number => (
      state.inbound.reduce((total: number, mov) => total + mov.amount, 0)
    ),
    totalOutbound: (state): number => (
      state.outbound.reduce((total: number, mov) => total + mov.amount, 0)
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovementsStore, import.meta.hot));
}
