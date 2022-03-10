const fs = require("fs");
const filterOmsOrders = require("./filterOmsOrders");

describe("filterOmsOrders", () => {
  const omsOrder = {
    O_ID: "001",
    TRACKING_URL: "track",
    S_ID: "321",
    OMS_ORDER_ID: "001",
    ORDER_LINES: [],
  };

  const nonOmsOrder = {
    O_ID: "002",
    TRACKING_URL: "track",
    S_ID: "123",
    OMS_ORDER_ID: "001",
    ORDER_LINES: [],
  };

  it("filters out non-OMS orders for single order", () => {
    const orders = [nonOmsOrder];
    const result = filterOmsOrders(orders);

    expect(result.length).toEqual(0);
  });

  it("does not filter out non-OMS orders for single order", () => {
    const orders = [omsOrder];
    const result = filterOmsOrders(orders);

    expect(result.length).toEqual(1);
  });

  it("filters out non-OMS orders for multiple order", () => {
    const orders = [nonOmsOrder, omsOrder, omsOrder, nonOmsOrder];
    const result = filterOmsOrders(orders);

    expect(result.length).toEqual(2);
  });
});
