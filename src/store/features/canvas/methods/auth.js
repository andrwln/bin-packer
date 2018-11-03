import { put, call } from "redux-saga/effects";
import axios from "axios";
import { failure, setUserData } from "../actions";

function postLogIn(payload) {
  const { email, password } = payload;
  const Axios = axios.create({ withCredentials: true });
  return Axios.post(process.env.API_URL + "/login", {
    email: email,
    password: password,
    organization_uuid: "a4377724-8819-4a96-bc2b-3877b269f989"
  });
}

function logUserOut() {
  const Axios = axios.create({ withCredentials: true });
  return Axios.post(process.env.API_URL + "/logout");
}

export function getUser() {
  try {
      // https://github.com/axios/axios/issues/587
      axios.defaults.withCredentials = true;
      return axios.get(process.env.API_URL + "/whoami", {}).then(
          user => user.data
      ).catch(response => {
        console.log(response);
        window.location.href = process.env.TRADE_URL +"/login.php?callback=/orders/grandbatcher.php";
      });
  } catch (err) {
    put(failure(err));
  }
}

export function authorizeUser({ state, action }) {
  const userData = action.payload.data;
  if (userData) {
    return {
      ...state,
      ...{ isAuthenticated: true }
    };
  }
}

export function* logIn({ payload }) {
  try {
    yield call(postLogIn, payload);
    const user = yield call(getUser);
    yield put(setUserData({ data: user }));
  } catch (err) {
    yield put(failure(err));
  }
}

export function* logOut() {
  try {
    yield call(logUserOut);
  } catch (err) {
    yield put(failure(err));
  }
}
