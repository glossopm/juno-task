const filterOmsOrders = require("./utils/filterOmsOrders");
const mapToFulfillmentsAndCancellations = require("./utils/mapToFulfillmentsAndCancellations");

const handler = (event, context) => {
  const shipment = JSON.parse(event.body);
  const omsOrders = filterOmsOrders(shipment.ORDERS);

  return mapToFulfillmentsAndCancellations(omsOrders);
};

module.exports = handler;
