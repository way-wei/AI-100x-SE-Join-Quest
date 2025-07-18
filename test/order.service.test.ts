import { OrderService } from './order.service';

describe('OrderService', () => {
  it('should return totalAmount 500 and correct items for single T-shirt without promotions', () => {
    const orderService = new OrderService();
    const items = [
      { productName: 'T-shirt', quantity: '1', unitPrice: '500' }
    ];
    const result = orderService.createOrder(items);
    expect(result.totalAmount).toBe(500);
    expect(result.items).toEqual([
      { productName: 'T-shirt', quantity: '1' }
    ]);
  });

  it('should apply threshold discount when subtotal reaches 1000', () => {
    const orderService = new OrderService();
    const items = [
      { productName: 'T-shirt', quantity: '2', unitPrice: '500' },
      { productName: '褲子', quantity: '1', unitPrice: '600' }
    ];
    const thresholdPromotion = { threshold: 1000, discount: 100 };
    const result = orderService.createOrder(items, thresholdPromotion);
    expect(result.originalAmount).toBe(1600);
    expect(result.discount).toBe(100);
    expect(result.totalAmount).toBe(1500);
    expect(result.items).toEqual([
      { productName: 'T-shirt', quantity: '2' },
      { productName: '褲子', quantity: '1' }
    ]);
  });

  it('should apply buy-one-get-one for cosmetics (multiple products)', () => {
    const orderService = new OrderService();
    const items = [
      { productName: '口紅', category: 'cosmetics', quantity: '1', unitPrice: '300' },
      { productName: '粉底液', category: 'cosmetics', quantity: '1', unitPrice: '400' }
    ];
    const result = orderService.createOrder(items, undefined, true);
    expect(result.totalAmount).toBe(700);
    expect(result.items).toEqual([
      { productName: '口紅', quantity: '2' },
      { productName: '粉底液', quantity: '2' }
    ]);
  });

  it('should apply buy-one-get-one for cosmetics (same product twice)', () => {
    const orderService = new OrderService();
    const items = [
      { productName: '口紅', category: 'cosmetics', quantity: '2', unitPrice: '300' }
    ];
    const result = orderService.createOrder(items, undefined, true);
    expect(result.totalAmount).toBe(600);
    expect(result.items).toEqual([
      { productName: '口紅', quantity: '3' }
    ]);
  });

  it('should apply buy-one-get-one for cosmetics (mixed categories)', () => {
    const orderService = new OrderService();
    const items = [
      { productName: '襪子', category: 'apparel', quantity: '1', unitPrice: '100' },
      { productName: '口紅', category: 'cosmetics', quantity: '1', unitPrice: '300' }
    ];
    const result = orderService.createOrder(items, undefined, true);
    expect(result.totalAmount).toBe(400);
    expect(result.items).toEqual([
      { productName: '襪子', quantity: '1' },
      { productName: '口紅', quantity: '2' }
    ]);
  });

  it('should stack threshold discount and buy-one-get-one promotions', () => {
    const orderService = new OrderService();
    const items = [
      { productName: 'T-shirt', category: 'apparel', quantity: '3', unitPrice: '500' },
      { productName: '口紅', category: 'cosmetics', quantity: '1', unitPrice: '300' }
    ];
    const thresholdPromotion = { threshold: 1000, discount: 100 };
    const result = orderService.createOrder(items, thresholdPromotion, true);
    expect(result.originalAmount).toBe(1800);
    expect(result.discount).toBe(100);
    expect(result.totalAmount).toBe(1700);
    expect(result.items).toEqual([
      { productName: 'T-shirt', quantity: '3' },
      { productName: '口紅', quantity: '2' }
    ]);
  });
}); 