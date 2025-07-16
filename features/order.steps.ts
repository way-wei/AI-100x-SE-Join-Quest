import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { OrderService } from '../src/order/order.service';

let orderService: OrderService;
let orderResult: any;
let thresholdPromotion: { threshold: number; discount: number } | null = null;
let bogoCosmeticsActive = false;

Given('no promotions are applied', function () {
  orderService = new OrderService();
  thresholdPromotion = null;
  bogoCosmeticsActive = false;
});

Given('the threshold discount promotion is configured:', function (dataTable) {
  const promo = dataTable.hashes()[0];
  thresholdPromotion = {
    threshold: Number(promo.threshold),
    discount: Number(promo.discount)
  };
});

Given('the buy one get one promotion for cosmetics is active', function () {
  bogoCosmeticsActive = true;
});

When('a customer places an order with:', function (dataTable) {
  const items = dataTable.hashes();
  orderResult = orderService.createOrder(items, thresholdPromotion, bogoCosmeticsActive);
});

Then('the order summary should be:', function (dataTable) {
  const expected = dataTable.hashes()[0];
  for (const key of Object.keys(expected)) {
    assert.strictEqual(String(orderResult[key]), String(expected[key]));
  }
});

Then('the customer should receive:', function (dataTable) {
  const expectedItems = dataTable.hashes();
  assert.deepStrictEqual(orderResult.items, expectedItems);
}); 