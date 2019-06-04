import NProgress from 'nprogress'; // progress bar
import router from './router';
// import store from './store';
import 'nprogress/nprogress.css'; // progress bar style
// import { getRoles } from './utils/auth';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// let addFlag = true;

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // 检查是否登录
  /* await store.dispatch('user/login', 'example');

  const roles = getRoles();
  if (addFlag) {
    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
      const routes = store.getters.addRouters;
      router.addRoutes(routes); // 动态添加可访问路由表

      addFlag = false;
    })
  } */

  next();
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
