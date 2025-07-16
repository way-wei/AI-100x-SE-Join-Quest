import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { DiscountService } from '../src/discount/discount.service';

let discountService: DiscountService;
let orderResult: any;

Given('every 10 units of the same product purchased, a 20% discount will be applied to the total price of those 10 units.', function () {
  discountService = new DiscountService();
});

When('a customer places an order with:', function (dataTable) {
  const items = dataTable.hashes();
  orderResult = discountService.createOrder(items);
});

Then('the order summary should be:', function (dataTable) {
  const expected = dataTable.hashes()[0];
  assert.strictEqual(orderResult.totalAmount, Number(expected.totalAmount));
}); 