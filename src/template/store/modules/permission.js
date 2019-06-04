import { asyncRoutes, constantRoutes } from '../../router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  }
  return true;
}

const state = {
  routers: constantRoutes,
  addRouters: [],
};

const mutations = {
  SET_ROUTERS: (_state, routers) => {
    _state.addRouters = routers;
    _state.routers = constantRoutes.concat(routers);
  },
};

const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise((resolve) => {
      const { roles } = data;
      const accessedRouters = asyncRoutes.filter((v) => {
        if (roles.indexOf('admin') >= 0) return true;
        if (hasPermission(roles, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter((child) => {
              if (hasPermission(roles, child)) {
                return child;
              }
              return false;
            });
          }
          return v;
        }
        return false;
      });
      commit('SET_ROUTERS', accessedRouters);
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
