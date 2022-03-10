const fs = require("fs");
const mapToFulfillmentsAndCancellations = require("./mapToFulfillmentsAndCancellations");

describe("mapToFulfillmentsAndCancellations", () => {
  const omsOrder = {
    O_ID: "001",
    TRACKING_URL: "track",
    S_ID: "321",
    OMS_ORDER_ID: "001",
    ORDER_LINES: [],
  };

  const fulfilledLine = {
    OL_ID: "001",
    STATUS: "SHPD",
    DESCRIPTION: "Item shipped to customer",
    SKU: "123456789",
    QUANTITY: "1",
    O_QTY: "1",
  };

  const cancellationLine = {
    OL_ID: "001",
    STATUS: "SHPD",
    DESCRIPTION: "Item shipped to customer",
    SKU: "123456789",
    QUANTITY: "0",
    O_QTY: "1",
  };

  it("maps fulfilled orders correctly for single order", () => {
    const fulfilledOrder = {
      ...omsOrder,
      ORDER_LINES: [fulfilledLine, fulfilledLine, cancellationLine],
    };
    const orders = [fulfilledOrder];

    const result = mapToFulfillmentsAndCancellations(orders);
    const { fulfillments, cancellations } = result;

    expect(fulfillments.length).toEqual(1);
    expect(cancellations.length).toEqual(0);
  });

  it("maps cancellation orders correctly for single order", () => {
    const cancellationOrder = {
      ...omsOrder,
      ORDER_LINES: [cancellationLine, cancellationLine],
    };
    const orders = [cancellationOrder];

    const result = mapToFulfillmentsAndCancellations(orders);
    const { fulfillments, cancellations } = result;

    expect(fulfillments.length).toEqual(0);
    expect(cancellations.length).toEqual(1);
  });

  it("maps both fulfillments and cancellation orders for multiple orders", () => {
    const fulfilledOrder = {
      ...omsOrder,
      ORDER_LINES: [fulfilledLine, fulfilledLine, cancellationLine],
    };
    const cancellationOrder = {
      ...omsOrder,
      ORDER_LINES: [cancellationLine, cancellationLine],
    };
    const orders = [
      fulfilledOrder,
      fulfilledOrder,
      fulfilledOrder,
      cancellationOrder,
      cancellationOrder,
    ];

    const result = mapToFulfillmentsAndCancellations(orders);
    const { fulfillments, cancellations } = result;

    expect(fulfillments.length).toEqual(3);
    expect(cancellations.length).toEqual(2);
  });
});
