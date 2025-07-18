import { DiscountService } from './discount.service';

describe('DiscountService', () => {
  it('should apply 20% discount for every 10 units of the same product (buy 12 socks for $100)', () => {
    const discountService = new DiscountService();
    const items = [
      { productName: 'socks', quantity: '12', unitPrice: '100' }
    ];
    const result = discountService.createOrder(items);
    expect(result.totalAmount).toBe(1000);
  });

  it('should apply 20% discount for every 10 units of the same product (buy 27 socks for $100)', () => {
    const discountService = new DiscountService();
    const items = [
      { productName: 'socks', quantity: '27', unitPrice: '100' }
    ];
    const result = discountService.createOrder(items);
    expect(result.totalAmount).toBe(2300);
  });

  it('should not apply discount when buying 10 different products for $100 each', () => {
    const discountService = new DiscountService();
    const items = [
      { productName: 'product_A', quantity: '1', unitPrice: '100' },
      { productName: 'product_B', quantity: '1', unitPrice: '100' },
      { productName: 'product_C', quantity: '1', unitPrice: '100' },
      { productName: 'product_D', quantity: '1', unitPrice: '100' },
      { productName: 'product_E', quantity: '1', unitPrice: '100' },
      { productName: 'product_F', quantity: '1', unitPrice: '100' },
      { productName: 'product_G', quantity: '1', unitPrice: '100' },
      { productName: 'product_H', quantity: '1', unitPrice: '100' },
      { productName: 'product_I', quantity: '1', unitPrice: '100' },
      { productName: 'product_J', quantity: '1', unitPrice: '100' }
    ];
    const result = discountService.createOrder(items);
    expect(result.totalAmount).toBe(1000);
  });
}); 