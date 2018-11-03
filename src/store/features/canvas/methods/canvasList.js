import {
  getBlocks,
  getReport,
  inchesToPx,
  calculateMaxSpaces
} from "../selectors/canvas";

import Packer from "../../../../packer";

export function canvasListItem({ group, canvas_id }) {
  const curr_canvas = group.canvas[canvas_id];
  const { width, height, wunit, hunit, widthInches, heightInches } = inchesToPx(
    curr_canvas.width,
    curr_canvas.height,
    curr_canvas.ratio
  );
  // Loop over each image group's canvas ids and make a new object to pass in the correct image group
  const hasCanvas = (id, group) => {
    return group.canvas_ids.indexOf(id) > -1;
  };
  const img_group = Object.keys(group.img_groups).reduce(
    (img_groups, curr_img_group_id) => {
      const curr_img_group = group.img_groups[curr_img_group_id];
      const _img_group = hasCanvas(canvas_id, curr_img_group)
        ? {
            [curr_img_group.id]: {
              canvas_id: canvas_id,
              height: curr_img_group.height,
              width: curr_img_group.width,
              id: curr_img_group.id,
              img_front: curr_img_group.img_front,
              img_back: curr_img_group.img_back,
              pdf_front: curr_img_group.img_front_pdf,
              pdf_back: curr_img_group.img_back_pdf,
              job_name: curr_img_group.job_name,
              total_quantity: curr_img_group.total_quantity,
              quantity: curr_img_group.quantity[canvas_id],
              wunit: wunit,
              hunit: hunit
            }
          }
        : undefined;
      return {
        ...img_groups,
        ..._img_group
      };
    },
    {}
  );
  let blocks = getBlocks(img_group, {
    curr_canvas,
    width,
    height
  });
  const max_spaces = calculateMaxSpaces(img_group, curr_canvas);

  // Get fit data for blocks
  const packer = new Packer(parseInt(width), parseInt(height));

  packer.fit(blocks);

  return {
    canvas_id,
    images: Object.keys(img_group).map(group_id => img_group[group_id]),
    report: getReport(blocks, width, height, widthInches, heightInches),
    wunit,
    hunit,
    width,
    height,
    widthInches,
    heightInches,
    blocks,
    double_sided: group.double_sided,
    max_spaces: max_spaces
  };
}

export function canvasList({ canvas_ids, group }) {
  const canvas_list = canvas_ids.reduce((canvas_list, canvas_id) => {
    return canvas_list.concat([canvasListItem({ canvas_id, group })]);
  }, []);

  return canvas_list;
}
