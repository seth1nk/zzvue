import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import AboutPage from './components/AboutPage.vue';
import ContactPage from './components/ContactPage.vue';
import ClientList from './components/ClientList.vue';
import SmartwatchList from './components/SmartwatchList.vue';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import ViewClient from './components/ViewClient.vue';
import ViewSmartwatch from './components/ViewSmartwatch.vue';

const routes = [
  { path: '/', component: HomePage },          
  { path: '/about', component: AboutPage },    
  { path: '/contact', component: ContactPage },
  { path: '/clients', component: ClientList },
  { path: '/smartwatches', component: SmartwatchList },
  { path: '/login', component: LoginPage },    
  { path: '/register', component: RegisterPage }, 
  { path: '/view-client/:id', component: ViewClient },
  { path: '/view-smartwatch/:id', component: ViewSmartwatch },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;