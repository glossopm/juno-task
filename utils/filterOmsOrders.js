const filterOmsOrders = (orders) => {
  return orders.filter((order) => order.O_ID === order.OMS_ORDER_ID);
};

module.exports = filterOmsOrders;
