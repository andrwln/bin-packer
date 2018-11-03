import { takeEvery, call, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import "isomorphic-unfetch";

import { actionTypes } from "./actions";

import uploadFile from "./methods/uploadFile";
import { logIn, logOut } from "./methods/auth";
import createPDF from "./methods/createPDF";

es6promise.polyfill();

export function* watchCanvas() {
  yield takeEvery(actionTypes.UPLOAD_FILE, uploadFile);
}

export function* watchAuth() {
  yield takeEvery(actionTypes.LOG_IN, logIn);
  yield takeEvery(actionTypes.LOG_OUT, logOut);
}

export function* watchCreatePDF() {
  yield takeEvery(actionTypes.CREATE_PDF, createPDF);
}
