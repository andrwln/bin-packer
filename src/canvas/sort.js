const sort = {
  w: function(a, b) {
    return b.w - a.w;
  },
  h: function(a, b) {
    return b.h - a.h;
  },
  max: function(a, b) {
    return Math.max(b.w, b.h) - Math.max(a.w, a.h);
  },
  min: function(a, b) {
    return Math.min(b.w, b.h) - Math.min(a.w, a.h);
  }
};

function mSort(a, b, criteria) {
  /* sort by multiple criteria */
  var diff, n;
  for (n = 0; n < criteria.length; n++) {
    diff = sort[criteria[n]](a, b);
    if (diff != 0) return diff;
  }

  return 0;
}

function maxSideSort(a, b) {
  return mSort(a, b, [("max", "min", "h", "w")]);
}

export function sortBlocks(blocks) {
  return blocks.sort(maxSideSort);
}
