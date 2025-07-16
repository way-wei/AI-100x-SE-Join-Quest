type OrderItemInput = {
  productName: string;
  quantity: string;
  unitPrice: string;
  category?: string;
};

interface OrderItem {
  productName: string;
  quantity: string;
}

interface OrderResult {
  totalAmount: number;
  originalAmount?: number;
  discount?: number;
  items: OrderItem[];
}

export class OrderService {
  /**
   * 建立訂單，計算總價與回傳商品明細
   */
  createOrder(
    items: OrderItemInput[],
    thresholdPromotion?: { threshold: number; discount: number } | null,
    bogoCosmeticsActive?: boolean
  ): OrderResult {
    let orderItems = this.toOrderItems(items);
    let totalAmount = this.calculateTotal(items);
    let originalAmount = totalAmount;
    let discount = 0;

    // Buy-one-get-one for cosmetics
    if (bogoCosmeticsActive) {
      const newItems: OrderItem[] = [];
      for (const item of items) {
        if (item.category === 'cosmetics') {
          // 買一送一，數量加倍（但同商品第二件免費）
          newItems.push({ productName: item.productName, quantity: String(Number(item.quantity) + 1) });
        } else {
          newItems.push({ productName: item.productName, quantity: item.quantity });
        }
      }
      orderItems = newItems;
    }

    // Threshold discount
    if (thresholdPromotion) {
      if (originalAmount >= thresholdPromotion.threshold) {
        discount = thresholdPromotion.discount;
        totalAmount = originalAmount - discount;
      }
    }

    // 報表欄位依需求回傳
    const result: OrderResult = {
      totalAmount,
      items: orderItems
    };
    if (thresholdPromotion) {
      result.originalAmount = originalAmount;
      result.discount = discount;
    }
    return result;
  }

  private toOrderItems(items: OrderItemInput[]): OrderItem[] {
    return items.map(item => ({
      productName: item.productName,
      quantity: item.quantity
    }));
  }

  private calculateTotal(items: OrderItemInput[]): number {
    return items.reduce((sum, item) => sum + Number(item.unitPrice) * Number(item.quantity), 0);
  }
} 