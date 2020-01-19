import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
    
  },
  {
    path:'/login',
    component:()=>import ('../components/content/login.vue')
  },
  {
    path:'/home',
    component:()=>import ('../components/content/home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path=='/login') return next();
  let temp=window.sessionStorage.getItem('token');
  if(!temp)return  next('/login')
  next()
})

export default router
