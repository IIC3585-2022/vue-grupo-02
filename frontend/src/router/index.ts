import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AccountsView from '@/views/AccountsView.vue';
import WaitingView from '@/views/WaitingView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/accounts', component: AccountsView },
  { path: '/waiting', component: WaitingView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
