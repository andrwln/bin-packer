import { actionTypes } from "./actions";
import { setDeep } from "../../../../utils/setDeep";
import {
  postProcess,
  addNewCanvasGroup,
  addNewCanvas,
  addNewImageGroup,
  deleteImageGroups,
  fillRemainingSpace,
  switchCanvasInView
} from "./methods";
import { authorizeUser } from "./methods/auth";

export const initial_state = {
  canvas_group_ids: [],
  error: false,
  selected_dimensions: {
    images: {
      width: 24,
      height: 18
    },
    canvas: {
      width: 48,
      height: 94.5
    }
  }
};

function reducer(state = initial_state, action) {
  switch (action.type) {
    case actionTypes.ADD_NEW_CANVAS_GROUP:
      return postProcess(addNewCanvasGroup({ state, action }));
    case actionTypes.ADD_NEW_CANVAS:
      return postProcess(addNewCanvas({ state, action }));
    case actionTypes.DELETE_IMG_GROUP:
      return postProcess(deleteImageGroups({ state, action }));
    case actionTypes.ADD_NEW_IMG_GROUP:
      return postProcess(addNewImageGroup({ state, action }));
    case actionTypes.FILL_CANVAS:
      return fillRemainingSpace({ state, action });
    case actionTypes.SET_CANVAS:
      return postProcess(
        setDeep(state, {
          path: action.payload.path,
          command: action.payload.command, // Commands: https://github.com/kolodny/immutability-helper
          data: action.payload.data
        })
      );
    case actionTypes.SWITCH_CANVAS:
      return switchCanvasInView({ state, action });
    case actionTypes.USER_AUTHENTICATED:
      return authorizeUser({ state, action });
    case actionTypes.FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      };
    default:
      return state;
  }
}

export default reducer;
