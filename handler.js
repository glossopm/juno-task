const filterOmsOrders = (orders) => {
  return orders.filter((order) => order.O_ID === order.OMS_ORDER_ID);
};

const handler = (event, context) => {
  const shipment = JSON.parse(event.body);

  return {
    ...shipment,
    ORDERS: filterOmsOrders(shipment.ORDERS),
  };
};

module.exports = handler
