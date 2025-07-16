type DiscountOrderItem = {
  productName: string;
  quantity: string;
  unitPrice: string;
};

interface DiscountOrderResult {
  totalAmount: number;
}

export class DiscountService {
  /**
   * 計算訂單總價，針對每10件同商品給予8折優惠
   */
  createOrder(items: DiscountOrderItem[]): DiscountOrderResult {
    let totalAmount = 0;
    for (const item of items) {
      const qty = Number(item.quantity);
      const price = Number(item.unitPrice);
      const discountedSets = Math.floor(qty / 10);
      const discountedTotal = discountedSets * 10 * price * 0.8;
      const remaining = qty % 10;
      const remainingTotal = remaining * price;
      totalAmount += discountedTotal + remainingTotal;
    }
    return { totalAmount };
  }
} 