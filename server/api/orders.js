const router = require('express').Router()
const chalk = require('chalk')

const { Order } = require('../db/models')


router.get('/:userId', (req, res, next) => {
	Order.findAll({
		where: {
			userId: req.params.userId
		},
		include: [{ all: true }]
	})
		.then(res.send.bind(res))
	// fancy way of sending instance same as .then(instance) etc....
})

module.exports = router;

// for highlighting in terminal
function magenta(str) {
	console.log(chalk.magenta(str))
}
