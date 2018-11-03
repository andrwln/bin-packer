import { sortBlocks } from "../canvas";

export function reset(canvas, ctx, width, height) {
  canvas.width = width;
  canvas.height = height;
  ctx.clearRect(0, 0, width, height);
}

function drawImage(ctx, block, image, width, height) {
  let img = new Image();

  img.onload = function() {
    draw.call(this, block);
  };
  img.src = image;

  function draw(b) {
    const imageHeight = this.naturalHeight;
    const imageWidth = this.naturalWidth;

    ctx.globalAlpha = 1;
    if (
      (imageWidth > imageHeight && b.w < b.h) ||
      (imageWidth < imageHeight && b.w > b.h)
    ) {
      // If the image orientation doesn't match block orientation on canvas,
      // rotate image
      ctx.save();
      ctx.translate(b.fit.x, b.fit.y + b.h);
      ctx.rotate(-Math.PI / 2);
      ctx.drawImage(this, 0, 0, b.h, b.w);
      ctx.restore();
    } else {
      ctx.drawImage(this, b.fit.x, b.fit.y, b.w, b.h);
    }

    drawBlockOutline(ctx, b);
  }
}

function drawText(ctx, { label, area, fit: { x, y }, w, h }) {
  const new_label = `Set ${label}`;
  const font_size = 1.5;

  ctx.font = `${font_size}em Roboto`;

  const getTextYCoordinate = (a, z) => a + z * 0.5;
  const getTextXCoordinate = (a, z) => a + z * 0.5;

  ctx.globalAlpha = 0.8;
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  ctx.strokeText(new_label, getTextXCoordinate(x, w), getTextYCoordinate(y, h));
}

function drawBlockOutline(ctx, block) {
  const {
    fit: { x, y },
    w,
    h
  } = block;
  ctx.strokeStyle = "#333333";

  // ctx.setLineDash([2.5, 5]);
  ctx.lineWidth = 3.5;
  ctx.globalAlpha = 0.3;
  ctx.strokeRect(x + 1, y + 1, w - 3, h - 3);
}

function drawPlaceholder(ctx, block) {
  // Changes transparency whats being drawn back to 1
  ctx.globalAlpha = 1;
  drawBlockOutline(ctx, block);
  // Reset line dash before drawing text
  ctx.setLineDash([]);

  drawText(ctx, block);
}

function drawGridLines(canvas_el, wunit, hunit, width, height) {
  const ctx = canvas_el.getContext("2d");
  for (var x = wunit; x < width; x += wunit) {
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, height);
  }
  for (var y = hunit; y < height; y += hunit) {
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(width, y + 0.5);
  }
  // Sets the transparacency of gridlines
  ctx.globalAlpha = 0.3;
  ctx.strokeStyle = "#007bef";
  ctx.stroke();
}

export function drawBlocks(ctx, blocks, width, height, from_back) {
  var n, block;
  for (n = 0; n < blocks.length; n++) {
    block = blocks[n];
    if (block.fit && block.img_front && !from_back)
      drawImage(ctx, block, block.img_front, width, height);
    else if (block.fit && block.img_back && from_back)
      drawImage(ctx, block, block.img_back, width, height);
    else if (block.fit) drawPlaceholder(ctx, block);
  }
}

export function drawPacker(canvas_el, { blocks, width, height, wunit, hunit }) {
  const ctx = canvas_el.getContext("2d");

  // sort blocks
  sortBlocks(blocks);

  // reset canvas
  reset(canvas_el, ctx, width, height);
  drawGridLines(canvas_el, wunit, hunit, width, height);
  // draw blocks
  drawBlocks(ctx, blocks, width, height);

  // draw boundary
}

function getReflectionBlocks(blocks, canvasWidth) {
  const reflected_blocks = blocks.map(block => {
    let new_block = { ...block, fit: { ...block.fit } };
    new_block.fit.x = canvasWidth - new_block.w - new_block.fit.x;
    return new_block;
  });
  return reflected_blocks;
}

export function drawPackerBackside(
  canvas_el,
  { blocks, width, height, wunit, hunit }
) {
  const ctx = canvas_el.getContext("2d");
  const reflected_blocks = getReflectionBlocks(blocks, width);
  reset(canvas_el, ctx, width, height);
  drawGridLines(canvas_el, wunit, hunit, width, height);

  drawBlocks(ctx, reflected_blocks, width, height, true);
}
