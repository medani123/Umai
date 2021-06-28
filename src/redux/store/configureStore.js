import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import thunkMiddleware from "redux-thunk";

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reservation", serializedState); //key, value
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("reservation");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

/* Create a Redux store*/
const store = createStore(
  rootReducer,
  loadFromLocalStorage(),
  compose(
    applyMiddleware(thunkMiddleware),

    //redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : function (f) {
          return f;
        }
  )
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
