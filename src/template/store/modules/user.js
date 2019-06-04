import { MessageBox, Message } from 'element-ui';
import { isLogin, logout } from '../../api/user';
import {
  setToken,
  setId,
  setRoles,
  removeToken,
  removeId,
  removeRoles,
} from '../../utils/auth';
import ssoLogin from '../../utils/ssoLogin';
import { resetRouter } from '../../router';

const state = {
  userToken: '',
  userName: '',
  userId: '',
};

const mutations = {
  SET_TOKEN: (_state, token) => {
    _state.userToken = token;
  },
  SET_NAME: (_state, name) => {
    _state.userName = name;
  },
  SET_ID: (_state, id) => {
    _state.userId = id;
  },
};

const actions = {
  // user login
  login({ commit }, portal) {
    return new Promise((resolve, reject) => {
      isLogin(portal).then((response) => {
        const { data } = response;
        commit('SET_TOKEN', data.ssoToken);
        commit('SET_NAME', data.name);
        commit('SET_ID', data.id);
        setToken(data.ssoToken);
        setId(data.id);
        setRoles(data.roles);
        resolve();
      }).catch((error) => {
        ssoLogin();
        reject(error);
      });
    });
  },

  // user logout
  logout() {
    return new Promise((resolve, reject) => {
      MessageBox.confirm('您确定要登出用户?', '注销提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        logout().then(() => {
          removeToken();
          removeId();
          removeRoles();
          resetRouter();
          resolve();
        }).catch((error) => {
          reject(error);
        });
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消登出',
        });
      });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
