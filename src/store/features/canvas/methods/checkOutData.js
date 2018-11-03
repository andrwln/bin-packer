import {
  getSheetPricing,
  sheetDimensions,
  getShippingCost,
  getTurnaroundTime
} from "../../../../config/productConfigs";

export function getTopBarData({ canvas_list, double_sided }) {
  const canvas_list_item = canvas_list[0];
  const sheet_price = getSheetPricing({ double_sided });
  const shipping_cost = getShippingCost({ sheet_count: canvas_list.length });
  const turnaround_time = getTurnaroundTime({
    sheet_count: canvas_list.length
  });
  const sheet_quantity = canvas_list.length;
  const sheet_size = sheetDimensions[0].name;
  const product_size = `${canvas_list_item.images[0].width}' x ${
    canvas_list_item.images[0].height
  }' inches`;
  const subtotal_price = sheet_price * sheet_quantity;

  return {
    sheet_quantity,
    sign_quantity: canvas_list.reduce((quantity, sheet) => {
      return quantity + sheet.blocks.length;
    }, 0),
    quantity_subtext1: ` ${
      double_sided ? "Double-sided" : "Single-sided"
    } Sheet(s) `,
    sheet_price,
    quantity_subtext2: ` Sign(s) ($${sheet_price.toFixed(2)} Per Sheet)`,
    subtotal_price: subtotal_price.toFixed(2),
    product_size,
    sheet_size,
    shipping_cost: shipping_cost.toFixed(2),
    total_price: (subtotal_price + shipping_cost).toFixed(2),
    turnaround_time
  };
}
