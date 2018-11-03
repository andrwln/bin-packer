import { put, call } from "redux-saga/effects";
import axios from "axios";
import { setCanvasImgData, failure } from "../actions";

export default function* uploadFile({
  payload: { canvas_group_id, canvas_id, img_id, back_side, files }
}) {
  const readFile = files => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.readAsDataURL(files[0]);
    });
  };
  const postFile = data => {
    const Axios = axios.create({ withCredentials: true });
    return Axios.post(process.env.API_URL + "/files", data);
  };
  try {
    const key = back_side ? "img_back" : "img_front";
    const fileDataURI = yield readFile(files);
    const postObj = { path: [fileDataURI], preflight: true };
    const fileResponse = yield call(postFile, postObj);
    yield put(
      setCanvasImgData({
        canvas_group_id,
        canvas_id,
        img_id,
        payload: {
          [key]: fileResponse.data.files[0].preview_uri,
          [key + "_pdf"]: fileResponse.data.files[0].pdf_uri
        }
      })
    );
  } catch (err) {
    yield put(failure(err));
  }
}
