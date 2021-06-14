const getters = {
  token: state => state.user.token,
  isCallBack: state => state.exercise.isCallBack,
  isAll: state => state.filter.isAll
};

export default getters;