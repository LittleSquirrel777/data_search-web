import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/audit',
  component: Layout,
  redirect: '/audit',
  name: 'audit',
  meta: {
    title: '审计',
    icon: 'ep:grid',
  },

  children: [
    {
      path: 'audit',
      name: 'audit',
      component: () => import('@/views/audit/audit.vue'),
      meta: {
        title: '审计',
        // icon: 'el-icon-s-check'
      },
    },
    // {
    //   path: 'txt',
    //   name: 'search_txt',
    //   component: () => import('@/views/audit/txt.vue'),
    //   meta: {
    //     title: '文本审计',
    //   },
    // },
    // {
    //   path: 'space',
    //   name: 'search_space',
    //   component: () => import('@/views/audit/space.vue'),
    //   meta: {
    //     title: '空间审计',
    //   },
    // },
    // {
    //   path: 'cross_media',
    //   name: 'search_cross',
    //   component: () => import('@/views/audit/cross_media/txt_img.vue'),
    //   meta: {
    //     title: '跨媒体审计',
    //   },
    // },
  ],
}

export default routes
