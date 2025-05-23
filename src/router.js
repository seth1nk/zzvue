import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import ContactPage from './components/ContactPage.vue';
import ClientList from './components/ClientList.vue';
import RepairList from './components/RepairList.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ViewClient from './components/ViewClient.vue';
import ViewRepair from './components/ViewRepair.vue';

const routes = [
  { path: '/', component: HomePage },          
  { path: '/about', component: AboutPage },    
  { path: '/contact', component: ContactPage },
  { path: '/clients', component: ClientList },
  { path: '/repairs', component: RepairList },
  { path: '/login', component: LoginPage },    
  { path: '/register', component: RegisterPage }, 
  { path: '/view-client/:id', component: ViewClient },
  { path: '/view-repair/:id', component: ViewRepair },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;