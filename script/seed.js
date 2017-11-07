/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const chalk = require('chalk')

const db = require('../server/db')



const { User, Product, Order, orderProduct, Review } = require('../server/db/models')





async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([

    // User.create({password: '123', status:'guest'})
    // User.create({email: 'murphy@email.com', password: '123', status:'guest'})
    // User.create({email: 'null@gmail.com', password: 'null',status:'admin'}),
    // User.create({firstName:"Amadou", lastName:"Jallow", address:"5 Hanover Square", email: "hi@gmail.com", password: "fsgsgerg",status:'admin'})

    User.create({firstName: 'Amadou', lastName: 'Jallow', email: 'cody@email.com', password: '123' }),
    User.create({firstName: 'Amadou', lastName: 'Jallow', email: 'murphy@email.com', password: '123' })

  ])

  const reviews = await Promise.all([
    Review.create({starRating: 5, content:''}),
    Review.create({starRating: 4, content:'That was amazing!'})
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)

  const products = await Promise.all([
    Product.create({ name: 'tuner and hooch', category: 'comedy', description: 'animals tom hanks + dog', photos: 'https://i.ytimg.com/vi/kEJ0VY9jW9E/maxresdefault.jpg', stock: 18, price: 10 }),
    Product.create({ name: 'die hard', category: 'action', description: 'bruce willis is a badass', photos: 'https://i.ytimg.com/vi/aBobdJLdADM/hqdefault.jpg', stock: 10, price: 10 }),
    Product.create({ name: 'robocop', category: 'action', description: 'cop dies, comes back a robot', photos: 'http://sm.askmen.com/askmen_in/photo/default/actionmovies-th_3x5j.jpg', stock: 20, price: 10 }),
    Product.create({ name: 'the money pit', category: 'comedy', description: 'more tome hanks shenanigans', photos: 'http://img.wennermedia.com/social/rs-180704-AM.jpg', stock: 30, price: 10 }),
    Product.create({ name: 'beverly hills cop', category: 'action', description: 'eddie murphy in his prime', photos: 'http://www.sbs.com.au/movies/sites/sbs.com.au.film/files/styles/double/public/guardians-galaxy-vol-2-backdrop.jpg?itok=uFYJwjpa&mtime=1493017486', stock: 10, price: 10 }),
  ])

const order = await Order.create({ status: 'pending' })
const assosOrder = await order.addProduct(1)

await order.update({status: 'ordered'})

//  testOrder.update({status:'ordered'})



}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()




/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
// console.log('seeding...')


