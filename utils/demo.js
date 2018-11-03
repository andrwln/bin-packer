import { once } from "lodash";

import {
  addNewCanvas,
  addNewImageGroup,
  addNewCanvasGroup
} from "../src/store/features/canvas/actions";

const randomNumber = () => Math.floor(Math.random() * 7) + 1;

function createImageGroups({
  props,
  canvas_group_id,
  canvas_id,
  count,
  quantity,
  size = {}
}) {
  const { w, h } = size;

  for (let i = 0; i < count; i++) {
    props.dispatch(
      addNewImageGroup({
        canvas_group_id,
        canvas_id,
        width: w ? w : randomNumber(),
        height: h ? h : randomNumber(),
        quantity: 1 //quantity ? randomNumber() : 5
      })
    );
  }
}

export default function demo(props) {
  return once(() => {
    if (window.location.search === "?demo") {
      props.dispatch(addNewCanvasGroup());
      // props.dispatch(addNewCanvas({ canvas_group_id: "0" }));
      // createImageGroups({
      //   props,
      //   canvas_group_id: "0",
      //   canvas_id: "0",
      //   count: 1,
      //   quantity: 1
      // });
    }
    // Create second canvas group
    // props.dispatch(addNewCanvasGroup());
    // for (let i = 0; i < 40; i++) {
    //   props.dispatch(
    //     addNewImageGroup({
    //       canvas_group_id: "1",
    //       canvas_id: "0",
    //       width: randomNumber(),
    //       height: randomNumber()
    //     })
    //   );
    // }
  })();
}
