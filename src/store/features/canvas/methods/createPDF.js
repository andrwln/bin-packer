import { put, call } from "redux-saga/effects";
import axios from "axios";
import { sheetDimensions } from "../../../../config/productConfigs";

function createPostObj({ canvas_list, double_sided }) {
  const Axios = axios.create({ withCredentials: true });
  const batchPDFObjects = [];

  canvas_list.forEach(canvas_list_item => {
    const blocks = canvas_list_item.blocks;
    let postObj = {
      coordinates: {
        front: [],
        back: []
      },
      batch_info: sheetDimensions[0].dimensions
    };

    blocks.forEach(block => {
      // fit.down contains coordinates for bottom left coordinates to be used for PDF creation
      const fitData = block.fit.down;
      const frontImg = {
        width: convertPixelsToInches(block.w, block.wunit),
        height: convertPixelsToInches(block.h, block.hunit),
        files: {},
        bleed: 0.625,
        options: {
          margin_right_length: 0,
          margin_left_length: 0,
          margin_top_length: 0,
          margin_bottom_length: 0
        }
      };
      frontImg.x = convertPixelsToInches(fitData.x, block.wunit);
      frontImg.y = convertPixelsToInches(fitData.y, block.hunit) + 0.75;
      // frontImg.files.bk = block.pdf_back;
      frontImg.files.fr = block.pdf_front;
      postObj.coordinates.front.push(frontImg);
      if (double_sided) {
        const backImg = getBacksideImgObj({
          block,
          fitData,
          canvas_width: canvas_list_item.width
        });
        postObj.coordinates.back.push(backImg);
      }
    });
    batchPDFObjects.push(postObj);
  });
  console.log("batch pdf objects : ", JSON.stringify(batchPDFObjects));
  // const headers = { "Access-Control-Allow-Origin": "*" };
  // Axios.post(
  //   process.env.BATCH_BUILDER_API,
  //   postObj
  //   // { headers: headers }
  // ).then(response => {
  //   console.log("response: ", response);
  // });
}

function getBacksideImgObj({ block, fitData, canvas_width }) {
  const backImg = {
    width: convertPixelsToInches(block.w, block.wunit),
    height: convertPixelsToInches(block.h, block.hunit),
    files: {},
    bleed: 0.625,
    options: {
      margin_right_length: 0,
      margin_left_length: 0,
      margin_top_length: 0,
      margin_bottom_length: 0
    }
  };
  const backSideX = canvas_width - block.w - fitData.x;
  backImg.x = convertPixelsToInches(backSideX, block.wunit);
  backImg.y = convertPixelsToInches(fitData.y, block.hunit) + 0.75;
  backImg.files.bk = block.pdf_back;
  return backImg;
}

function convertPixelsToInches(pixels, unit) {
  return Math.round(pixels / unit);
}

export default function* createPDF({ payload: { canvas_list, double_sided } }) {
  createPostObj({ canvas_list, double_sided });
  //   const readFile = files => {
  //     const reader = new FileReader();
  //     return new Promise((resolve, reject) => {
  //       reader.onload = function() {
  //         resolve(reader.result);
  //       };
  //       reader.readAsDataURL(files[0]);
  //     });
  //   };
  //   const postFile = data => {
  //     const Axios = axios.create({ withCredentials: true });
  //     return Axios.post("https://qa-api.4over.com/files", data);
  //   };
  try {
    // const key = back_side ? "img_back" : "img_front";
    // const fileDataURI = yield readFile(files);
    // const postObj = { path: [fileDataURI], preflight: true };
    // const fileResponse = yield call(postFile, postObj);
    // console.log("file url: ", fileResponse.data.files[0].preview_uri);
    // yield put(
    //   setCanvasImgData({
    //     canvas_group_id,
    //     canvas_id,
    //     img_id,
    //     payload: {
    //       [key]: fileResponse.data.files[0].preview_uri,
    //       pdf_uri: fileResponse.data.files[0].pdf_uri
    //     }
    //   })
    // );
  } catch (err) {
    yield put(failure(err));
  }
}
