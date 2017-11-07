const router = require('express').Router()
const chalk = require('chalk')

const { Order, Product, OrderProduct } = require('../db/models')

// GET ORDER ITEMS -- thunk = fetchOrder
router.get('/user/:userId', (req, res, next) => {
	Order.findOne({
		where: { userId: req.params.userId, status: 'pending' }
	})
		.then(order => {
			return order.id || 0
		})
		.then(orderId => {
			OrderProduct.findAll({
				where: {
					orderId: orderId
				}
			})
				.then(res.send.bind(res))
		})
		.catch(next)
})

<<<<<<< HEAD

=======
>>>>>>> master
// ORDER DETAILS
router.get('/detail/:userId', (req, res, next) => {
	Order.findAll({
		where: {
			userId: req.params.userId,
			status: 'pending'
		},
		include: [{ model: Product }]
	})
		.then(order => res.json(order))
})



// INCREMENT -- thunk = incrementInDb
router.put('/:orderId/update/:productId', (req, res, next) => {
	magenta('req here')
		console.log(req.body)
	OrderProduct.findOne({
		where: {
			productId: req.params.productId,
			orderId: req.params.orderId
		}
	})
		//UPDATES QUANTITY
		.then((orderItem) => {
			return orderItem.update({
				quantity: +req.body.quantity
			})
		})
		//IF YOU REACHED THIS EVERYTHING WENT RIGHT
		.then((OrderItem) => res.send(OrderItem))
		.catch(next)
})


// UPDATE STATUS - - Thunk = changeOrderStatus
router.put('/status/:userId', (req, res, next) => {
	// console.log(req.body)
	Order.findOne({
		where: { userId: req.params.userId, status: 'pending' }
	})
		.then(order => {
			return order.update({
				status: req.body.status
			})
		})
		.then(res.send.bind(res))
})

// DID NOT EDIT BELOW HERE -Brian
router.get('/:userId', (req, res, next) => {
	Order.findAll({
		where: {
			userId: req.params.userId
		},
		include: [{ model: Product }]
	})
		.then(order => res.json(order))
})


// what does this do? will never fire  -Brian
// router.get('/:userId/order/:orderId', (req, res, next) => {
// 	Order.findById(req.params.orderId, { include: [{ all: true }] })
// 		.then(order => res.json(order));
// })

// when a user adds one item to the cart
// we create a new order

// ADD ORDER ITEM - - thunk = addProductToDb
router.put('/:userId/add/:productId', (req, res, next) => {
	let updatedOrder;
	let savedOrder;
	//FINDS OR CREATES ORDER INSTANCE FOR A USER
	Order.findOrCreate({
		where: {
			userId: req.params.userId,
			status: "pending"
		}
	}
	)
		//GETS ORDER ID OF FOUND OR CREATED
		.then(order => {
			updatedOrder = (order[0]).id;
			return order;
		})
		//FINDS ALL PRODUCTS ASSOCIATED TO ORDER
		.then((order) => {
			savedOrder = order;
			return OrderProduct.findAll({
				where: {
					productId: req.params.productId,
					orderId: updatedOrder
				}
			})
		})
		//IF PRODUCT IS NOT IN ORDER IT ADDS ASSOCIATION
		.then(op => {
			if (!(op.length)) {
				return (savedOrder[0]).addProduct(req.params.productId)
			}
		})
		//SEARCHES FOR PRODUCT IN ORDER PRODUCTS ASSOCIATED WITH CORRECT ORDER
		.then(() => {
			return OrderProduct.findOne({
				where: {
					productId: Number(req.params.productId),
					orderId: updatedOrder
				}
			})
		})
		//UPDATES QUANTITY BY 1 OR SETS IT TO 1
		.then((currOrder) => {
			return currOrder.update({
				quantity: currOrder.quantity + 1 || 1
			})
		})
		//IF YOU REACHED THIS EVERYTHING WENT RIGHT
		.then((updatedOrder) => res.send(updatedOrder))
		.catch(next)
})


router.delete('/:orderId', (req, res, next) => {
	Order.findById(req.params.orderId)
		.then(order => {
			order.destroy()
		})
		.then(() => res.send(`Order # ${req.params.orderId} Destroyed!`))
		.catch(next)

})


// router.delete('/:orderListId', (req, res, next) => {
// 	//FINDING ORDERS ITEMS
// 	OrderProduct.findAll({
// 		where: {
// 			orderId: req.params.orderListId
// 		}
// 	})
// 		//DELETE ALL ORDER ITEMS
// 		.then(listOfProducts => Promise.all(listOfProducts.map(product => product.destroy())))
// 		//FIND ACTUAL ORDER
// 		.then(() => Order.findById(req.params.orderListId))
// 		//DESTROYS ORDER
// 		.then(order => order.destroy())
// 		//CONFIRMATION MESSAGE
// 		.then(() => res.send("Cart Destroyed!"))
// 		.catch(next)
// })


module.exports = router;

function magenta(str) {
  console.log(chalk.magenta(str))
}
