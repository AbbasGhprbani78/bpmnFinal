import { createRouter, createWebHistory } from 'vue-router';
import SignIn from './components/SignIn.vue';
import HomePage from './components/HomePage.vue';
import SignUp from './components/SignUp.vue';
import ChatPage from './components/ChatPage.vue';
import ChatPage2 from './components/ChatPage2.vue';
import ChatPage3 from './components/ChatPage3.vue';
import DeskHomePage from './components/DeskHomePage.vue';
import StartPage from './components/StartPage.vue';
import TestsPage from './components/TestsPage.vue';
import ScorePage from './components/ScorePage.vue';
import FlowChart from './components/FlowChart.vue';
import FlowChart2 from './components/FlowChart2.vue';
import FlowChart3 from './components/FlowChart3.vue';
import MenuFlowChart from './components/MenuFlowChart.vue';

const routes = [
  { path: '/', component: StartPage },
  { path: '/signin', component: SignIn },
  { path: '/homePage', component: HomePage },
  { path: '/signUp', component: SignUp },
  { path: '/chatpage/:id', component: ChatPage },
  { path: '/chatpage2/:id', component: ChatPage2 },
  { path: '/historychat/:uuid', component: ChatPage3 },
  { path: '/deskhomepage', component: DeskHomePage },
  { path: '/chatpage/:session_id', component: ChatPage },
  { path: '/testspage', component: TestsPage },
  { path: '/scorepage', component: ScorePage, name: 'scorepage' },
  { path: '/flowchart', component: FlowChart },
  { path: '/menuflowchart', component: MenuFlowChart },
  { path: '/flowchart2', component: FlowChart2 },
  { path: '/flowchart3', component: FlowChart3 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const hasAccessToken = localStorage.getItem('access');

//   if (to.path !== '/signin' && !hasAccessToken && to.path !== '/signUp') {
//     next('/signin');

//   } else if (to.path === '/logout') {
//     localStorage.removeItem('access');
//     next('/signin');
//   } else if (hasAccessToken && to.path === '/homepage') {
//     next('/');
//   } else {
//     next();
//   }
// });

export default router;
