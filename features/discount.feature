@discount
Feature: The mall is celebrating the festival, 
    and as a shopper
    I hope the system can accurately calculate the final price of my purchases 
    after applying discounts.

    Scenario: Buy 12 pairs of socks for $100
        Given every 10 units of the same product purchased, a 20% discount will be applied to the total price of those 10 units.
        When a customer places an order with:
            | productName | quantity | unitPrice |
            | socks       | 12       | 100       |
        Then the order summary should be:
            | totalAmount |
            | 1000        |

    Scenario: Buy 27 pairs of socks for $100
        Given every 10 units of the same product purchased, a 20% discount will be applied to the total price of those 10 units.
        When a customer places an order with:
            | productName | quantity | unitPrice |
            | socks       | 27       | 100       |
        Then the order summary should be:
            | totalAmount |
            | 2300        |

    Scenario: Buy 10 different products for $100
        Given every 10 units of the same product purchased, a 20% discount will be applied to the total price of those 10 units.
        When a customer places an order with:
            | productName | quantity | unitPrice |
            | product_A   | 1        | 100       |
            | product_B   | 1        | 100       |
            | product_C   | 1        | 100       |
            | product_D   | 1        | 100       |
            | product_E   | 1        | 100       |
            | product_F   | 1        | 100       |
            | product_G   | 1        | 100       |
            | product_H   | 1        | 100       |
            | product_I   | 1        | 100       |
            | product_J   | 1        | 100       |
        Then the order summary should be:
            | totalAmount |
            | 1000        |
