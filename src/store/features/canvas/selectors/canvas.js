export function inchesToPx(
  widthInches,
  heightInches,
  percentage = 100,
  base = 72
) {
  const widthInPx = Math.floor(widthInches * ((base / 100) * percentage));
  const heightInPx = Math.floor(heightInches * ((base / 100) * percentage));

  return {
    width: widthInPx,
    height: heightInPx,
    widthInches,
    heightInches,
    wunit: widthInPx / widthInches,
    hunit: heightInPx / heightInches
  };
}

function calculateScaledCanvasDimensions(block_group, canvas_data) {
  const {
    curr_canvas,
    height: canvas_height_px,
    width: canvas_width_px
  } = canvas_data;
  return {
    w: (block_group.width / curr_canvas.width) * canvas_width_px,
    h: (block_group.height / curr_canvas.height) * canvas_height_px
  };
}

export function getBlocks(img_groups, canvas_data) {
  const block_ids = Object.keys(img_groups);

  return block_ids.reduce((new_blocks, block_id) => {
    return new_blocks.concat(getBlockGroup(img_groups[block_id], canvas_data));
  }, []);
}

export function getBlockGroup(block_group, canvas_data) {
  let new_block_group = [];

  for (let i = 0; i < block_group.quantity; i++) {
    const { w, h } = calculateScaledCanvasDimensions(block_group, canvas_data);
    const canvas_width_with_bleed = w; // + block_group.wunit;
    const canvas_height_with_bleed = h; // + block_group.hunit;
    new_block_group.push({
      canvas_id: block_group.canvas_id,
      img_group_id: block_group.id,
      label: Number(block_group.id) + 1,
      img_front: block_group.img_front,
      img_back: block_group.img_back,
      pdf_front: block_group.pdf_front,
      pdf_back: block_group.pdf_back,
      // Add one inch worth of pixels to account for 0.5 in bleed margins on each side
      w: canvas_width_with_bleed,
      h: canvas_height_with_bleed,
      wunit: block_group.wunit,
      hunit: block_group.hunit,
      area: canvas_width_with_bleed * canvas_height_with_bleed
    });
  }

  return new_block_group;
}

export function getReport(blocks, w, h, widthInches, heightInches) {
  var fit = 0,
    nofit = 0,
    nofit_group_ids = [],
    nofit_group = {},
    block,
    n,
    remaining_area,
    len = blocks.length,
    ratio;

  for (n = 0; n < len; n++) {
    block = blocks[n];

    if (block.fit) {
      fit = fit + block.area;
    } else {
      let group = nofit_group[block.img_group_id];

      if (nofit_group_ids.indexOf(block.img_group_id) === -1) {
        nofit_group_ids.push(block.img_group_id);
      }

      nofit_group[block.img_group_id] = {
        id: block.img_group_id,
        canvas_id: block.canvas_id,
        img_group_id: block.img_group_id,
        nofit: group ? group.nofit + 1 : 1
      };
      nofit = nofit + 1;
    }
  }

  ratio = Math.round((100 * fit) / (w * h));
  // Account for the 1 inch buffer on the canvas that isn't used for printing -> equates to 2 inches of each side
  remaining_area = (widthInches - 2) * (heightInches - 2); // * ((100 - ratio) / 100);

  return {
    ratio,
    nofit,
    nofit_group,
    nofit_group_ids,
    remaining_area
  };
}

export function calculateMaxSpaces(img_group, canvas) {
  const first_img_group_key = Object.keys(img_group)[0];
  const canvas_area = canvas.height * canvas.width;
  const image_area =
    (img_group[first_img_group_key].height + 1) *
    (img_group[first_img_group_key].width + 1);
  return Math.floor(canvas_area / image_area);
}
