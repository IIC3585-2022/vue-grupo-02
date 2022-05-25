import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AccountsView from '@/views/AccountsView.vue';
import WaitingView from '@/views/WaitingView.vue';
import DashboardView from '@/views/DashboardView.vue';

const routes: RouteRecordRaw[] = [
  { path: '/', component: HomeView },
  { path: '/accounts', component: AccountsView },
  { path: '/waiting', component: WaitingView },
  { path: '/dashboard', component: DashboardView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
