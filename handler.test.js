const fs = require('fs')
const handler = require('./handler')

const event = {
  body: fs.readFileSync('./fixtures/shipments.json', 'utf8')
}

const context = {
  accountReference: 'acme'
}

describe('Handler', () => {
  it('Parses the event data into JSON and filters out non-OMS orders', () => {
    const data = handler(event, context)

    const { ORDERS: orders } = data
    expect(orders.length).toEqual(2)

    const [order1, order2] = orders
    expect(order1.O_ID).toEqual('12345')
    expect(order2.O_ID).toEqual('500324412')
  })
})