import Vue from 'vue';
import Router from 'vue-router';
/* Layout */
import Layout from '../layout/index.vue';

Vue.use(Router);

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('../views/error-page/404'),
    hidden: true,
  },

  {
    path: '/401',
    component: () => import('../views/error-page/401'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('../views/dashboard/index'),
      meta: { title: 'Dashboard' },
    }],
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/menu1',
    name: 'Example',
    meta: { title: 'Example' },
    children: [
      {
        path: 'menu1',
        component: () => import('../views/example/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('../views/example/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
          },
          {
            path: 'menu1-2',
            component: () => import('../views/example/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('../views/example/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
              },
              {
                path: 'menu1-2-2',
                component: () => import('../views/example/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
              },
            ],
          },
          {
            path: 'menu1-3',
            component: () => import('../views/example/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
          },
        ],
      },
      {
        path: 'menu2',
        component: () => import('../views/example/menu2/index'),
        meta: { title: 'menu2' },
      },
    ],
  },
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

// 异步挂载的路由 => 根据权限加载的路由
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/show',
    name: 'Permission',
    meta: { title: 'permission', role: ['admin'] },
    children: [
      {
        path: 'edit',
        name: 'Edit',
        component: () => import('../views/edit/index'),
        meta: { title: 'table', role: ['admin', 'editor'] },
      },
      {
        path: 'show',
        name: 'Show',
        component: () => import('../views/show/index'),
        meta: { title: 'tree', role: ['admin'] },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];
