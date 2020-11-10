export const createStore = function (reducer) {
  let state;
  let listeners = [];
  let dispatch = function (action) {
    state = reducer(state, action);
    listeners.forEach((update) => {
      update && update();
    });
  };

  let getState = function () {
    return JSON.parse(JSON.stringify(state));
  };

  let subscribe = function (f) {
    // 接收了一个回调函数
    // react-redux给的
    // 这个回调函数其实是触发视图更新的一个操作
    listeners.push(f);

    return function () {
      // 这个回调函数会把当前事件从事件池中移除
      listeners = listeners.filter((item) => item !== f);
    };
  };

  dispatch({});

  return {
    dispatch,
    getState,
    subscribe,
  };
};

export const combineReducers = function (obj) {
  return function (state = {}, action) {
    state = Object.keys(obj).reduce((state, current) => {
      state[current] = obj[current](state[current], action);
      return state;
    }, state);
    console.log(state);
    return state;
  };
};