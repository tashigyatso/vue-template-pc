const getters = {
  userToken: state => state.user.userToken,
  userName: state => state.user.userName,
  userId: state => state.user.userId,
  addRouters: state => state.permission.addRouters,
};
export default getters;
