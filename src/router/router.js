import Main from '@/pages/Main'
import { createRouter, createWebHashHistory } from 'vue-router'
import PostPage from '@/pages/PostPage'
import About from '@/pages/About'
import PostIdpage from '@/pages/PostIdpage'
import PostPageWithStore from '@/pages/PostPageWithStore'
import PostPageWithCompositionApi from '@/pages/PostPageWithCompositionApi'


const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostPage
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/posts/:id',
    component: PostIdpage
  },
  {
    path: '/store',
    component: PostPageWithStore
  },
  {
    path: '/composition',
    component: PostPageWithCompositionApi
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL)
})
export default router