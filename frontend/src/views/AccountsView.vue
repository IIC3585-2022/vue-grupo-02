<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountsStore } from '@/stores/accounts';

const router = useRouter();
const accountsStore = useAccountsStore();

const inboundAccount = ref('');
const outboundAccount = ref('');

const saveAccounts = () => {
  accountsStore.loadUsableAccounts(inboundAccount.value, outboundAccount.value);
  router.push({ path: '/waiting' });
};
</script>

<template>
  <v-container class="h-100 d-flex flex-column justify-space-around">
    <div class="d-flex justify-space-around">
      <div class="w-100 d-flex flex-column">
        <h2>Select the account that receives money</h2>
        <v-select
          v-model="inboundAccount"
          label="Account that receives money"
          :items="accountsStore.allAccountsFormatted"
        />
        <h2>Select the account that spends money</h2>
        <v-select
          v-model="outboundAccount"
          label="Account that spends money"
          :items="accountsStore.allAccountsFormatted"
        />
        <v-btn
          size="large"
          @click="saveAccounts"
        >
          To the dashboard!
        </v-btn>
      </div>
    </div>
  </v-container>
</template>
