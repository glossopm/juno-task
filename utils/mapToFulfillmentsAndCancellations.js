const mapToFulfillmentsAndCancellations = (orders) => {
  return orders.reduce(
    (acc, currentOrder) => {
      const orderTotal = currentOrder.ORDER_LINES.reduce(
        (prev, current) => prev + Number(current.QUANTITY),
        0
      );

      const isCancellation = orderTotal === 0;
      return {
        fulfillments: isCancellation
          ? acc.fulfillments
          : [...acc.fulfillments, currentOrder],
        cancellations: isCancellation
          ? [...acc.cancellations, currentOrder]
          : acc.cancellations,
      };
    },
    { fulfillments: [], cancellations: [] }
  );
};

module.exports = mapToFulfillmentsAndCancellations;
