import Vue from 'vue'
import VueRouter from 'vue-router'
import ScoresView from '../views/tlias/ScoresView.vue'; // 确保路径正确
import StudentsView from '../views/tlias/StudentsView.vue';

Vue.use(VueRouter)

const routes = [
  
  {
 
    path: '/Ranking',
    name: 'Ranking',
    component: () => import('../views/tlias/RankingView.vue')
  },
  {
  path: '/Scores',
  name: 'Scores',
  component: () => import('../views/tlias/ScoresView.vue'),
  },
  {
  path: '/Scores/saveStudent',
  name: 'saveStudent',
  component: () => import('../views/tlias/SaveStudentView.vue')
  },
  {
  path: '/Scores/UpdateScores',
  name: 'UpdateScores',
  component: () => import('../views/tlias/UpdateScoresView.vue')
  },
  {
    path: '/Scores/Student',
    name: 'Student',
    component: () => import('../views/tlias/StudentView.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
