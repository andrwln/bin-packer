export const actionTypes = {
  FAILURE: "FAILURE",
  ADD_NEW_CANVAS: "ADD_NEW_CANVAS",
  ADD_NEW_CANVAS_GROUP: "ADD_NEW_CANVAS_GROUP",
  SET_CANVAS: "SET_CANVAS",
  SET_CANVAS_ALL: "SET_CANVAS_ALL",
  ADD_NEW_IMG_GROUP: "ADD_NEW_IMG_GROUP",
  DELETE_IMG_GROUP: "DELETE_IMG_GROUP",
  UPLOAD_FILE: "UPLOAD_FILE",
  FILL_CANVAS: "FILL_CANVAS",
  SWITCH_CANVAS: "SWITCH_CANVAS",
  LOG_IN: "LOG_IN",
  LOG_OUT: "LOG_OUT",
  USER_AUTHENTICATED: "USER_AUTHENTICATED",
  CREATE_PDF: "CREATE_PDF"
};

export function failure(error) {
  return {
    type: actionTypes.FAILURE,
    error
  };
}

export function fileUpload(payload) {
  return { type: actionTypes.UPLOAD_FILE, payload };
}

export function createPDF(payload) {
  return { type: actionTypes.CREATE_PDF, payload };
}

export function logInUser(payload) {
  return { type: actionTypes.LOG_IN, payload };
}

export function logoutUser(payload) {
  return { type: actionTypes.LOG_OUT, payload };
}

export function setUserData(payload) {
  return { type: actionTypes.USER_AUTHENTICATED, payload };
}

export function setDimensions(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `selected_dimensions.${data.type}`,
      data: data.payload
    }
  };
}

export function addNewCanvas({ canvas_group_id }) {
  return {
    type: actionTypes.ADD_NEW_CANVAS,
    payload: { canvas_group_id }
  };
}

export function addNewCanvasGroup() {
  return {
    type: actionTypes.ADD_NEW_CANVAS_GROUP
  };
}

export function setCanvasSize(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `canvas_group.${data.canvas_group_id}.canvas.${data.canvas_id}`,
      data: data.payload
    }
  };
}

export function setCanvasGroup(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `canvas_group.${data.canvas_group_id}`,
      data: data.payload
    }
  };
}

export function setCanvasImgData(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `canvas_group.${data.canvas_group_id}.img_groups.${data.img_id}`,
      data: data.payload
    }
  };
}

export function setCanvasImgQuantity(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `canvas_group.${data.canvas_group_id}.img_groups.${
        data.img_id
      }.quantity`,
      data: data.payload
    }
  };
}

export function fillRemainingCanvas(data) {
  return {
    type: actionTypes.FILL_CANVAS,
    payload: {
      data: data
    }
  };
}

export function switchCanvasInView(data) {
  return {
    type: actionTypes.SWITCH_CANVAS,
    payload: {
      path: `canvas_group.${data.id}`,
      data: data.payload
    }
  };
}

export function addNewImageGroup({
  canvas_group_id,
  canvas_id,
  height,
  width,
  quantity
}) {
  return {
    type: actionTypes.ADD_NEW_IMG_GROUP,
    payload: { canvas_group_id, canvas_id, height, width, quantity }
  };
}

export function deleteImageGroup({ canvas_group_id, canvas_id, img_id }) {
  return {
    type: actionTypes.DELETE_IMG_GROUP,
    payload: {
      canvas_group_id,
      canvas_id,
      img_id
    }
  };
}

export function setCanvas(data) {
  return {
    type: actionTypes.SET_CANVAS,
    payload: {
      path: `canvas_group.${data.id}`,
      data: data.payload
    }
  };
}
