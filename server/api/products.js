const router = require('express').Router()
const { Product } = require('../db/models')

//GET REQUESTES FOR GETTING ALL PRODUCTS AND BY INDIVIDUAL ID
router.get('/', (req, res, next) => {
	Product.findAll()
	.then(products => res.json(products))
	.catch(next);
})

router.get('/:id', (req, res, next)=>{
	Product.findById(req.params.id)
	.then(product => res.json(product))
	.catch(next);
})

//PUT FOR UPDATING A SINGLE PRODUCT
router.put('/:id', (req, res, next)=>{
	Product.findById(req.params.id)
	.then(product => {
		console.log(req.body);
		return product.update(req.body)
	})
	.then(product => res.json(product))
	.catch(next)
})

//POST FOR CREATING A NEW PRODUCT
router.post('/', (req,res,next)=>{
	Product.create(req.body)
	.then(product => res.json(product))
	.catch(next);
})

//DELETE FOR DELETING PRODUCT BY ID
router.delete('/:id', (req, res, next)=>{
	Product.findById(req.params.id)
	.then(product => product.destroy())
	.then(()=> res.send("DESTORYED THE CRAPPY MOVIE"))
	.catch(next);
})



module.exports = router;
