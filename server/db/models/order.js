const Sequelize = require('sequelize')
const db = require('../db')
const chalk = require('chalk')
// maybe import orderProducts
const OrderProduct = require('./orderProduct')

// userId should be inserted as a foreign key
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'ordered', 'shipped', 'delivered'] //maybe we could make a defualt pending value for
  }

})

//after update of values change price in orderProduct
Order.hook('afterUpdate', order => {
  if (order.status == 'ordered') {

    OrderProduct.findAll({ where: { orderId: order.id } }) // hard coded needs fixing
      .then(orderedProducts => {
        const updatePromise = orderedProducts.map(orderItem => {
          orderItem.update({ price: 10 })
        })
        Promise.all(updatePromise)
      })
  }
})

// magenta('hello world')

function magenta(str) {
  console.log(chalk.magenta(str))
}



module.exports = Order


