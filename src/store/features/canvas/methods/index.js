import { setDeep } from "../../../../../utils/setDeep";
import { omit, without, last } from "lodash";
import { canvasList, canvasListItem } from "./canvasList";

const default_canvas = {
  width: 48,
  height: 96,
  ratio: 8,
  double_sided: false
};

const default_img_group = {
  quantity: { "0": 1 },
  total_quantity: 1,
  img: undefined,
  width: 24,
  height: 18,
  job_name: ""
};

function getDefaultImgGroup(state) {
  return { ...default_img_group, ...state.selected_dimensions.images };
}

function getDefaultCanvas(state) {
  return { ...default_canvas, ...state.selected_dimensions.canvas };
}

function getDefaultCanvasGroup(state) {
  return {
    user: null,
    curr_canvas_id: "0",
    double_sided: false,
    include_stakes: false,
    canvas_ids: ["0"],
    canvas: {
      "0": {
        ...getDefaultCanvas(state),
        id: "0"
      }
    },
    img_groups_ids: ["0"],
    img_groups: {
      "0": {
        canvas_ids: ["0"],
        id: "0",
        ...getDefaultImgGroup(state)
      }
    }
  };
}

// Id's are index based, so we need to find the largest id and increment by 1
function getNewId(ids = []) {
  // Sort largest to smallest and take 0 index to get largest id
  const sorted_ids = ids.map(Number).sort((a, b) => b - a);

  const largest_id = sorted_ids.length > 0 ? sorted_ids[0] : -1;

  return String(largest_id + 1);
}

function makeCanvas({ canvas, canvas_ids, state }) {
  const new_canvas_id = getNewId(canvas_ids);
  const new_canvas_ids = canvas_ids.concat([new_canvas_id]);
  const double_sided = canvas[0].double_sided;

  return {
    new_canvas_id,
    data: {
      canvas_ids: new_canvas_ids,
      canvas: {
        ...canvas,
        [new_canvas_id]: {
          id: new_canvas_id,
          ...getDefaultCanvas(state),
          double_sided: double_sided
        }
      }
    }
  };
}

export function addNewCanvas({ state, action }) {
  const { canvas_group_id } = action.payload;
  const canvas_ids = state.canvas_group[canvas_group_id].canvas_ids;
  const canvas = state.canvas_group[canvas_group_id].canvas;
  const new_canvas_id = getNewId(canvas_ids);

  const state_with_new_canvas_group = setDeep(state, {
    path: `canvas_group.${canvas_group_id}`,
    data: { ...makeCanvas({ canvas, canvas_ids, state }).data }
  });
  // Add placeholder holder image group to give the canvas something to render
  const state_with_new_image_group = addNewImageGroup({
    state: state_with_new_canvas_group,
    action: { payload: { canvas_group_id, canvas_id: new_canvas_id } }
  });

  return state_with_new_image_group;
}

export function addNewCanvasGroup({ state }) {
  const canvas_group_ids = state.canvas_group_ids;
  const canvas_group = state.canvas_group;
  const new_canvas_group_id = getNewId(canvas_group_ids);
  const new_canvas_group_ids = canvas_group_ids.concat([new_canvas_group_id]);

  return setDeep(state, {
    data: {
      canvas_group_ids: new_canvas_group_ids,
      canvas_group: {
        ...canvas_group,
        [new_canvas_group_id]: {
          id: new_canvas_group_id,
          ...getDefaultCanvasGroup(state)
        }
      }
    }
  });
}

function makeImageGroup({
  image_groups,
  canvas_image_groups_ids,
  canvas_id,
  override,
  state
}) {
  const new_image_group_id = getNewId(canvas_image_groups_ids);

  return {
    img_groups_ids: canvas_image_groups_ids
      ? canvas_image_groups_ids.concat([new_image_group_id])
      : [new_image_group_id],
    img_groups: {
      ...image_groups,
      [new_image_group_id]: {
        id: new_image_group_id,
        canvas_ids: [canvas_id],
        job_name: new_image_group_id,
        ...getDefaultImgGroup(state),
        ...override
      }
    }
  };
}

export function addNewImageGroup({ state, action }) {
  const img_group = getDefaultImgGroup(state);
  const {
    canvas_group_id,
    canvas_id,
    height = img_group.height,
    width = img_group.width,
    quantity = img_group.quantity
  } = action.payload;
  const canvas_group = state.canvas_group[canvas_group_id];
  const all_existing_image_groups = canvas_group.img_groups;
  const all_existing_image_groups_ids = canvas_group.img_groups_ids;
  const existing_image_groups_ids = all_existing_image_groups_ids;

  return setDeep(state, {
    path: `canvas_group.${canvas_group_id}`,
    data: {
      ...makeImageGroup({
        image_groups_ids: all_existing_image_groups_ids,
        image_groups: all_existing_image_groups,
        canvas_image_groups_ids: existing_image_groups_ids,
        canvas_id,
        override: {
          height,
          width,
          quantity
        },
        state
      })
    }
  });
}

export function deleteImageGroups({ state, action }) {
  const { canvas_group_id, img_id } = action.payload;

  const canvas_group = state.canvas_group[canvas_group_id];
  const img_groups_ids = canvas_group.img_groups_ids;
  const img_groups = canvas_group.img_groups;

  const new_img_group = setDeep(img_groups, {
    command: "$set",
    data: omit(img_groups, [img_id])
  });

  return setDeep(state, {
    path: `canvas_group.${canvas_group_id}`,
    data: {
      img_groups_ids: without(img_groups_ids, img_id),
      img_groups: new_img_group
    }
  });
}

export function fillRemainingSpace({ state, action }) {
  // For when a user wants to fill remaining space with a particular image
  // 1) take in img ID and active canvas IDs
  // 2) for active canvases, get remaining surface area, and divide by
  //    surface area of one image to determine estimate number of images to add on
  // 3) Call find open canvas but don't create new canvases
  // 4) Update state
  const img_id = action.payload.data.img_id;
  const canvas_group_id = action.payload.data.canvas_group_id;
  const canvas_group = state.canvas_group[canvas_group_id];
  const image_group = canvas_group.img_groups[img_id];
  const canvas_list = canvas_group.canvas_list;
  const img_area = image_group.width * image_group.height;
  let remaining_area,
    estimated_fill_count,
    canvas_id,
    new_canvas_list,
    new_list_item;

  canvas_list.forEach(canvas_list_item => {
    remaining_area = canvas_list_item.report.remaining_area;
    estimated_fill_count = Math.floor(remaining_area / img_area);
    canvas_id = canvas_list_item.canvas_id;

    state = setDeep(state, {
      path: `canvas_group.${canvas_group_id}.img_groups.${img_id}`,
      data: {
        canvas_ids: [...new Set(image_group.canvas_ids.concat([canvas_id]))],
        quantity: {
          ...image_group.quantity,
          [canvas_id]: image_group.quantity[canvas_id]
            ? image_group.quantity[canvas_id] + estimated_fill_count
            : estimated_fill_count
        },
        total_quantity: image_group.total_quantity + estimated_fill_count
      }
    });
    // check if nofit
    new_list_item = canvasListItem({
      group: state.canvas_group[canvas_group_id],
      canvas_id
    });
    if (new_list_item.report.nofit) {
      new_list_item.report.nofit_group_ids.forEach(id => {
        const nofit_num = new_list_item.report.nofit_group[id].nofit;
        const nofit_img_id = new_list_item.report.nofit_group[id].img_group_id;
        const nofit_canvas_id = new_list_item.report.nofit_group[id].canvas_id;
        const new_image_group =
          state.canvas_group[canvas_group_id].img_groups[nofit_img_id];
        state = setDeep(state, {
          path: `canvas_group.${canvas_group_id}.img_groups.${nofit_img_id}`,
          data: {
            quantity: {
              ...new_image_group.quantity,
              [nofit_canvas_id]:
                new_image_group.quantity[nofit_canvas_id] - nofit_num
            },
            total_quantity: new_image_group.total_quantity - nofit_num
          }
        });
      });
    }
  });

  new_canvas_list = canvasList({
    canvas_ids: canvas_group.canvas_ids,
    group: state.canvas_group[canvas_group_id]
  });

  state.canvas_group[canvas_group_id].canvas_list = new_canvas_list;

  return state;
}

export function switchCanvasInView({ state, action }) {
  return setDeep(state, {
    path: "canvas_group.0",
    data: action.payload.data
  });
}

export function setUserData({ state, action }) {
  return setDeep(state, {
    path: "canvas_group.0",
    data: { user: action.payload.data }
  });
}

function resetCanvases(state) {
  const canvas = state.canvas_group["0"];
  canvas.img_groups_ids.forEach(img_id => {
    state = setDeep(state, {
      path: `canvas_group.0.img_groups.${img_id}`,
      data: {
        canvas_ids: ["0"],
        quantity: { "0": canvas.img_groups[img_id].total_quantity },
        width: state.selected_dimensions.images.width,
        height: state.selected_dimensions.images.height
      }
    });
    canvas.img_groups[img_id];
  });
  return setDeep(state, {
    path: `canvas_group.0`,
    data: {
      canvas_ids: ["0"],
      canvas: { 0: getDefaultCanvas(state) }
    }
  });
  // return state;
}

function findOpenCanvas(new_state, canvas_list_item, curr_canvas, canvas_ids) {
  // 1) take in a list item with no fit data
  // 2) loop through the no fit images, and for each:
  //    a) set no fit data to next canvas
  //    b) run list item to get no fit data
  //    c) if all fit, return state, if there are nofits, recursively call again
  //    d) when there are no more canvases, create a new canvas and apply images
  //    e) call list item again and check for no fits
  const canvas_group = new_state.canvas_group[0];
  const no_fit_image_ids = canvas_list_item.report.nofit_group_ids;
  const image_groups = new_state.canvas_group[0].img_groups;
  let next_canvas = canvas_ids[Number(curr_canvas) + 1];
  let nofit_group;
  if (!next_canvas) {
    const { data, new_canvas_id } = makeCanvas({
      canvas_ids: canvas_group.canvas_ids,
      canvas: canvas_group.canvas,
      state: new_state
    });

    next_canvas = new_canvas_id;

    new_state = setDeep(new_state, {
      path: `canvas_group.0`,
      data: {
        ...data,
        canvas_ids: new_state.canvas_group[0].canvas_ids.concat([next_canvas])
      }
    });
  }
  no_fit_image_ids.forEach(img_id => {
    nofit_group = canvas_list_item.report.nofit_group[img_id];
    new_state = setDeep(new_state, {
      path: `canvas_group.0.img_groups.${img_id}`,
      data: {
        quantity: {
          ...canvas_group.img_groups[img_id].quantity,
          [curr_canvas]:
            image_groups[img_id].quantity[curr_canvas] - nofit_group.nofit,
          [next_canvas]: nofit_group.nofit
        },
        canvas_ids: new_state.canvas_group[0].img_groups[
          img_id
        ].canvas_ids.concat([next_canvas])
      }
    });
  });
  const new_canvas_list_item = canvasListItem({
    canvas_id: next_canvas,
    group: new_state.canvas_group[0]
  });
  if (new_canvas_list_item.report.nofit) {
    // recursively check for the next open canvas
    new_state = findOpenCanvas(
      new_state,
      new_canvas_list_item,
      next_canvas,
      new_state.canvas_group[0].canvas_ids
    );
  } else {
    return new_state;
  }
  return new_state;
}

function findCanvasForImages(state) {
  let new_state = { ...state };
  const canvas_group = new_state.canvas_group[0];
  const canvas_ids = canvas_group.canvas_ids;
  let canvas_list;
  let canvas_id = canvas_ids[0];
  canvas_list = canvasList({ group: canvas_group, canvas_ids });
  const canvas_nofit_group = canvas_list.filter(canvas_list_item => {
    return canvas_list_item.report.nofit;
  });
  if (canvas_nofit_group.length) {
    canvas_nofit_group.forEach(group => {
      new_state = findOpenCanvas(new_state, group, canvas_id, canvas_ids);
    });
  }
  new_state = setCurrentCanvasToLast(new_state);
  const new_canvas_list = canvasList({
    canvas_ids: new_state.canvas_group[0].canvas_ids,
    group: new_state.canvas_group[0]
  });
  new_state.canvas_group[0].canvas_list = new_canvas_list;
  return new_state;
}

function setCurrentCanvasToLast(state) {
  const canvas_group = state.canvas_group[0];
  const canvas_ids = canvas_group.canvas_ids;
  const curr_canvas_id = canvas_group.curr_canvas_id;
  const last_id = last(canvas_ids);
  if (curr_canvas_id !== last_id) {
    state = switchCanvasInView({
      state,
      action: {
        payload: { path: `canvas_group.0`, data: { curr_canvas_id: last_id } }
      }
    });
  }
  return state;
}

export function postProcess(state) {
  const reset_state = resetCanvases(state);
  return findCanvasForImages(reset_state);
}
