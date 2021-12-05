import { createRouter, createWebHistory } from 'vue-router';
import Kanto from './pages/Kanto.vue';
import Johto from './pages/Johto.vue';
import Hoenn from './pages/Hoenn.vue';
import Sinnoh from './pages/Sinnoh.vue';
import Unova from './pages/Unova.vue';
import Kalos from './pages/Kalos.vue';
import Alola from './pages/Alola.vue';
import Galar from './pages/Galar.vue';

const routes = [
  { path: '/', component: Kanto },
  { path: '/kanto', component: Kanto },
  { path: '/johto', component: Johto },
  { path: '/hoenn', component: Hoenn },
  { path: '/sinnoh', component: Sinnoh },
  { path: '/unova', component: Unova },
  { path: '/kalos', component: Kalos },
  { path: '/alola', component: Alola },
  { path: '/galar', component: Galar },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { router };