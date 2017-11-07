const Sequelize = require('sequelize')
const db = require('../db')
const chalk = require('chalk')
// maybe import orderProducts
const OrderProduct = require('./orderProduct')
const Product = require('./product')

// userId should be inserted as a foreign key
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'ordered', 'shipped', 'delivered'] //maybe we could make a defualt pending value for
  }

})

//HOOK -- ON CHANGE FROM PENDING TO ORDERED THIS LOCKS IN PRICE
Order.hook('afterUpdate', order => {
  if (order.status == 'ordered') {
  // FIND ALL ORDER ITEMS OF THIS ORDER ID
    OrderProduct.findAll({
      where: { orderId: order.id },
    })
  // LOOP OVER ALL ORDER ITEMS AND GET PRICE FROM PRODUCT TABLE
      .then(orderedProducts => {
         orderedProducts.forEach(orderItem => {
          Product.findOne({ where: { id: orderItem.productId } })
            .then(product => {
  // SET THE PRICE OF THAT INSTANCE
              return orderItem.update({price: product.price})
            })
        })
      })
  }
})

function magenta(str) {
  console.log(chalk.magenta(str))
}

module.exports = Order

