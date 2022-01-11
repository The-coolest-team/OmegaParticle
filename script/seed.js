'use strict'

const {db, models: {User, Product, Animal, CartTable, AnimalTable, HistoryTable} } = require('../server/db')

const randomNumGenerator = () => {
  return Math.ceil(Math.random()*100)
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users and Products
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', email: "cody@yahoo.com", first_name: "cody", last_name: "bennett", date_of_birth: new Date(1999, 0, 1)}),
    User.create({ username: 'murphy', password: '123', email: "murphy@yahoo.com", first_name: "eddy", last_name: "murphy", date_of_birth: new Date(1970, 2, 31)})
  ])

  const products = await Promise.all([
    Product.create({name: "Blue dog collar", description: 'A brand new blue dog collar', price: 10.99, stock: randomNumGenerator()}),
    Product.create({name: "Green dog collar", description: 'A brand new green cat collar', price: 15.99, stock: randomNumGenerator()}),
    Product.create({name: "Victor Super Premium Dog Food (40 lbs)", description: "One of our top selling formulas, VICTOR Hi-Pro Plus is a nutrient-dense, multi-meat formula packed with high levels of quality protein to support the nutritional needs of growing puppies, pregnant and lactating females, and high-performing dogs. With scientifically advanced and nutritionally complete ingredients, this formula promotes sustained energy and healthy immune and digestive systems.", price: 53.99, stock: randomNumGenerator(), image_url: "https://m.media-amazon.com/images/I/81QKEvc49KL._AC_SS450_.jpg"} ),
    Product.create({name: "Purina Pro Plan Large/Giant breed (34 lbs)", description: "We know dogs 50 lbs and over can benefit from specialized nutrition to support their unique needs--from puppy to adult to senior. So we have an entire line of Pro Plan Large Breed and Giant Breed formulas. Each formula has specific nutrients for joint health, and a protein to fat ratio that supports an ideal body condition. Plus all of our great-tasting dry formulas are fortified with live probiotics for digestive and immune health.", price: 52.48, stock: randomNumGenerator(), image_url: "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2986205-center-1"})
  ])


  const animals = await Promise.all([
    Animal.create({ category: 'dog', description: "Man's best friend"}),
    Animal.create({ category: 'cat', description: "chaotic neutral"})
  ])

  console.log(`seeded ${users.length} users, ${products.length} products, ${animals.length} animals into db`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
