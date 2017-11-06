
const chalk = require('chalk')

const db = require('../server/db')
const { User, Product, Order, orderProduct, Review } = require('../server/db/models')


async function seed() {
  await db.sync({ force: true })
  magenta('begin sync')

  const users = await Promise.all([
    User.create({ firstName: 'Amadou', lastName: 'Jallow', address: '5 Hanover Square', email: 'hi@gmail.com', password: 'fsgsgerg', status: 'admin' }),
    User.create({ firstName: 'Nadim', lastName: 'Udin', address: '5 Hanover Square', email: 'ramen@gmail.com', password: 'fsgsgerg', status: 'admin' }),
    User.create({ firstName: 'Brian', lastName: 'McCann', address: '5 Hanover Square', email: 'soba@gmail.com', password: 'fsgsgerg', status: 'admin' }),
    User.create({ firstName: 'Nick', lastName: 'Plucker', address: '5 Hanover Square', email: 'udon@gmail.com', password: 'fsgsgerg', status: 'admin' })

  ])

  const reviews = await Promise.all([
    Review.create({ starRating: 5, content: 'test' }),
    Review.create({ starRating: 4, content: 'That was amazing!' }),
    Review.create({ starRating: 5, content: 'all time fav' }),
    Review.create({ starRating: 3, content: 'ok i guess' }),
    Review.create({ starRating: 1, content: 'the worst' }),
    Review.create({ starRating: 5, content: 'you have to see it' }),
    Review.create({ starRating: 5, content: 'my childs name' }),
    Review.create({ starRating: 4, content: 'derp.' })
  ])

  const products = await Promise.all([
    Product.create({ name: 'tuner and hooch', category: 'comedy', description: 'animals tom hanks + dog', photos: 'https://i.ytimg.com/vi/kEJ0VY9jW9E/maxresdefault.jpg', stock: 18, price: 10 }),
    Product.create({ name: 'die hard', category: 'action', description: 'bruce willis is a badass', photos: 'https://i.ytimg.com/vi/aBobdJLdADM/hqdefault.jpg', stock: 10, price: 10 }),
    Product.create({ name: 'robocop', category: 'action', description: 'cop dies, comes back a robot', photos: 'http://sm.askmen.com/askmen_in/photo/default/actionmovies-th_3x5j.jpg', stock: 20, price: 10 }),
    Product.create({ name: 'the money pit', category: 'comedy', description: 'more tome hanks shenanigans', photos: 'http://img.wennermedia.com/social/rs-180704-AM.jpg', stock: 30, price: 10 }),
    Product.create({ name: 'beverly hills cop', category: 'action', description: 'eddie murphy in his prime', photos: 'http://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/double/public/guardians-galaxy-vol-2-backdrop.jpg?itok=uFYJwjpa&mtime=1493017486', stock: 10, price: 10 })
  ])
  const ordersPromise = []
  for (let i = 0; i < 5; i++) {
    ordersPromise.push(Order.create({ status: 'pending' }))
  }
  const orders = await Promise.all(ordersPromise)

  // creates promises that associate order with product
  // for now orerId will correspond to productID in tests may want to associate one order with multiple unique products or many of the same product
  const asosPromise = []
 for(let i= 0; i < orders.length ; i++){
   asosPromise.push(orders[i].addProduct(i))
 }
const oPassociation = await Promise.all(asosPromise)


}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    magenta('closing db connection')
    db.close()
    magenta('db connection closed')
  })


function magenta(str) {
  console.log(chalk.magenta(str))
}
