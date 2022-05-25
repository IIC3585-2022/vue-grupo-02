import { defineStore, acceptHMRUpdate } from 'pinia';
import * as api from '@/api';
import { useAccountsStore } from '@/stores/accounts';
import { useLinkStore } from '@/stores/link';
import type { Movement } from '@/interfaces/entities/movement';

export const useMovementsStore = defineStore('movements', {
  state: () => ({
    loading: true,
    search: '',
    inbound: <Array<Movement>>[],
    outbound: <Array<Movement>>[],
    searchedOutbound: <Array<Movement>>[],
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
        this.searchedOutbound = outboundMovements;

        this.loading = false;
      }
    },
    searchOutbound() {
      if (this.search.trim() === '') {
        this.searchedOutbound = this.outbound;
      }
      this.searchedOutbound = this.outbound.filter(
        (mov) => (
          mov.description.toLowerCase().includes(this.search.toLowerCase())
          || mov.comment?.toLowerCase()?.includes(this.search.toLowerCase())
        ),
      );
    },
  },
  getters: {
    totalInbound: (state): number => (
      state.inbound.reduce((total: number, mov) => total + mov.amount, 0)
    ),
    totalOutbound: (state): number => (
      state.outbound.reduce((total: number, mov) => total + mov.amount, 0)
    ),
    dates: (state) => Array.from(new Set(
      state.inbound.map((mov) => mov.postDate).concat(state.outbound.map((mov) => mov.postDate)),
    )).sort((a, b) => {
      if (a < b) {
        return 1;
      }
      return -1;
    }),
    orderedInbound: (state) => (
      Object.entries(state.inbound.reduce((added: Record<string, number>, mov) => {
        if (mov.postDate in added) {
          return { ...added, [mov.postDate]: added[mov.postDate] + mov.amount };
        }
        return { ...added, [mov.postDate]: mov.amount };
      }, {})).sort(
        (a: [string, number], b: [string, number]) => {
          if (a[0] < b[0]) {
            return 1;
          }
          return -1;
        },
      )
    ).map(([key, value]) => ({ postDate: key, amount: value })),
    orderedOutbound: (state) => (
      Object.entries(state.searchedOutbound.reduce((added: Record<string, number>, mov) => {
        if (mov.postDate in added) {
          return { ...added, [mov.postDate]: added[mov.postDate] + mov.amount };
        }
        return { ...added, [mov.postDate]: mov.amount };
      }, {})).sort(
        (a: [string, number], b: [string, number]) => {
          if (a[0] < b[0]) {
            return 1;
          }
          return -1;
        },
      ).map(([key, value]) => ({ postDate: key, amount: value }))
    ),
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovementsStore, import.meta.hot));
}
