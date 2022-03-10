const fs = require("fs");
const handler = require("./handler");

const event = {
  body: fs.readFileSync("./fixtures/shipments.json", "utf8"),
};

const context = {
  accountReference: "acme",
};

describe("Handler", () => {
  it("Parses the event data into OMS fulfillments and cancellations", () => {
    const data = handler(event, context);

    const { fulfillments, cancellations } = data;
    expect(fulfillments.length).toEqual(1);
    expect(cancellations.length).toEqual(1);

    const [fulfillment] = fulfillments;
    const [cancellation] = cancellations;

    expect(fulfillment.O_ID).toEqual("12345");
    expect(cancellation.O_ID).toEqual("500324412");
  });
});
