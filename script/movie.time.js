
const chalk = require('chalk')

const db = require('../server/db')
const { User, Product, Order, orderProduct, Review } = require('../server/db/models')


async function seed() {
  await db.sync({ force: true })
  magenta('begin sync')

  const users = await Promise.all([
    User.create({ firstName: 'Amadou', lastName: 'Jallow', address: '5 Hanover Square', email: 'hi@gmail.com', password: 'password', status: 'admin' }),
    User.create({ firstName: 'Nadim', lastName: 'Uddin', address: '5 Hanover Square', email: 'ramen@gmail.com', password: 'password', status: 'admin' }),
    User.create({ firstName: 'Brian', lastName: 'McCann', address: '5 Hanover Square', email: 'soba@gmail.com', password: 'password', status: 'admin' }),
    User.create({ firstName: 'Nick', lastName: 'Plucker', address: '5 Hanover Square', email: 'udon@gmail.com', password: 'password', status: 'admin' })

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
    Product.create({ name: 'Turner and Hooch', category: 'comedy', description: 'animals tom hanks + dog', photos: 'https://images-na.ssl-images-amazon.com/images/I/51SG0DPAXSL.jpg', stock: 18, price: 10 }),
    Product.create({ name: 'Die Hard', category: 'action', description: 'bruce willis is a badass', photos: 'https://images-na.ssl-images-amazon.com/images/I/51H5HRRQ87L.jpg', stock: 10, price: 10 }),
    Product.create({ name: 'Robocop', category: 'action', description: 'cop dies, comes back a robot', photos: 'https://images-na.ssl-images-amazon.com/images/I/51QV5147ZWL.jpg', stock: 20, price: 10 }),
    Product.create({ name: 'The Money Pit', category: 'comedy', description: 'more tome hanks shenanigans', photos: 'https://images-na.ssl-images-amazon.com/images/I/51CVNDR9CRL.jpg', stock: 30, price: 10 }),
    Product.create({ name: 'Beverly Hills Cop', category: 'action', description: 'eddie murphy in his prime', photos: 'https://images-na.ssl-images-amazon.com/images/I/51NZ46CHK1L.jpg', stock: 10, price: 10 }),
    Product.create({ name: 'Goonies', category: 'action', description: 'childhood best friends find pirate treasure', photos: 'https://images-na.ssl-images-amazon.com/images/I/512FAC93Y7L.jpg', stock: 10, price: 8 }),
    Product.create({ name: `Ferris Bueller's Day Off`, category: 'comedy', description: 'skipping school never seemed so cool', photos: 'https://images-na.ssl-images-amazon.com/images/I/415GP1CKNGL.jpg', stock: 18, price: 10 }),
    Product.create({ name: 'Indiana Jones', category: 'action', description: 'the cooelest archaeologist ever', photos: 'https://images-na.ssl-images-amazon.com/images/I/51C0B1GBQDL.jpg', stock: 18, price: 12 }),
    Product.create({ name: 'Top Gun', category: 'action', description: `Maverick and Goose still have that lovin' feeling`, photos: 'https://images-na.ssl-images-amazon.com/images/I/5116B0CZ7ML.jpg', stock: 35, price: 10 }),
    Product.create({ name: 'Ghostbusters', category: 'action', description: 'comedy and action blend together perfectly', photos: 'https://images-na.ssl-images-amazon.com/images/I/41HE5X5ES1L.jpg', stock: 32, price: 20 }),
    Product.create({ name: 'The Terminator', category: 'action', description: `"I'll be back" what more do you need to know`, photos: 'https://images-na.ssl-images-amazon.com/images/I/510R8ADFV0L.jpg', stock: 12, price: 10 }),
    Product.create({ name: 'The Shining', category: 'horror', description: `"Heeeeere's Johnny"`, photos: 'https://images-na.ssl-images-amazon.com/images/I/4168AZQK55L.jpg', stock: 43, price: 10 }),
    Product.create({ name: 'Back to the Future', category: 'action', description: '1.21 gigawatts!!!!!!!!!', photos: 'https://images-na.ssl-images-amazon.com/images/I/51KVHDV4E5L.jpg', stock: 6, price: 10 }),
    Product.create({ name: 'Caddyshack', category: 'comedy', description: 'one of the most quotable movies of all time', photos: 'https://images-na.ssl-images-amazon.com/images/I/51A84CWSH6L.jpg', stock: 14, price: 20 }),
    Product.create({ name: 'The Untouchables', category: 'action', description: 'Al Capone and the cops that took him down', photos: 'https://images-na.ssl-images-amazon.com/images/I/71K1SXR6EYL.gif', stock: 21, price: 6 }),
    Product.create({ name: 'A Christmas Story', category: 'comedy', description: 'if TBS plays it all day on Christmas it must be worth owning', photos: 'https://images-na.ssl-images-amazon.com/images/I/512TVV2E0DL.jpg', stock: 18, price: 18 }),
    Product.create({ name: 'Return of the Jedi', category: 'action', description: `wait, who is Luke's father?`, photos: 'https://images-na.ssl-images-amazon.com/images/I/51KTCF1H4QL.jpg', stock: 18, price: 14 }),
    Product.create({ name: 'Bloodsport', category: 'action', description: 'the title sums this movie up really well', photos: 'https://images-na.ssl-images-amazon.com/images/I/51NVYDDDJYL.jpg', stock: 22, price: 12 })
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
