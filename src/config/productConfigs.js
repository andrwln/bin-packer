export const productList = [
  {
    name: "24' x 18' inches",
    dimensions: {
      width: 24,
      height: 18
    }
  },
  {
    name: "18' x 24' inches",
    dimensions: {
      width: 18,
      height: 24
    }
  },
  {
    name: "24' x 36' inches",
    dimensions: {
      width: 24,
      height: 36
    }
  },
  {
    name: "36' x 24' inches",
    dimensions: {
      width: 36,
      height: 24
    }
  },
  {
    name: "18' x 12' inches",
    dimensions: {
      width: 18,
      height: 12
    }
  },
  {
    name: "12' x 18' inches",
    dimensions: {
      width: 12,
      height: 18
    }
  },
  {
    name: "24' x 24' inches",
    dimensions: {
      width: 24,
      height: 24
    }
  },
  {
    name: "24' x 6' inches",
    dimensions: {
      width: 24,
      height: 6
    }
  }
];

export const sheetDimensions = [
  {
    name: "48' x 96' inches",
    dimensions: {
      width: 48,
      height: 96
    },
    // printable area is smaller because Yervand's PDF maker needs space to put in
    // codes for the printers to read
    printable_area: {
      width: 48,
      height: 94.5
    }
  }
];

export function getShippingCost({ sheet_count }) {
  // $10 Next Day Anywhere for every 3 sheets for the first 9 sheets. $20 more for every 2 sheets after the 9 sheets.
  // For example:
  // 1-3 Sheets: $10 Next Day Anywhere
  // 4-6 Sheets: $20 Next Day Anywhere
  // 7-9 Sheets: $30 Next Day Anywhere
  // $20 more for every 2 sheets after 9 sheets
  // For example:
  // 10-11 Sheets: $50
  // 12-13 Sheets: $70
  // 14-15 Sheets: $90
  let total;
  if (sheet_count <= 9) {
    total = 10 * Math.ceil(sheet_count / 3);
  } else {
    total = 30 + 20 * Math.ceil((sheet_count - 9) / 2);
  }
  return total;
}

export function getTurnaroundTime({ sheet_count }) {
  // Next Day - up to 20 sheets
  // 2-4 Days - 21 to 50 sheets
  // 5-7 Days - 51 to 100 sheets
  let turnaround;
  if (sheet_count <= 20) {
    turnaround = "Next Day";
  } else if (sheet_count <= 50) {
    turnaround = "2-4 Days";
  } else {
    turnaround = "5-7 Days";
  }
  return turnaround;
}

export function getSheetPricing({ double_sided }) {
  const sheet_price = double_sided ? 60 : 40;

  return sheet_price;
}
