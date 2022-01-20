"use strict";

const {
  db,
  models: { User, Product, Cart, CartItem },
} = require("../server/db");

const randomNumGenerator = () => {
  return Math.ceil(Math.random() * 100);
};

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users and Products
  const users = await Promise.all([
    User.create({
      username: "cody",
      password: "123",
      email: "cody@yahoo.com",
      firstName: "cody",
      lastName: "bennett",
      date_of_birth: new Date(1999, 0, 1),
      isAdmin: true,
    }),
    User.create({
      username: "murphy",
      password: "123",
      email: "murphy@yahoo.com",
      firstName: "eddy",
      lastName: "murphy",
      date_of_birth: new Date(1970, 2, 31),
    }),
  ]);

  const products = await Promise.all([
    Product.create({
      name: "Victor Super Premium Dog Food (40 lbs)",
      description:
        "One of our top selling formulas, VICTOR Hi-Pro Plus is a nutrient-dense, multi-meat formula packed with high levels of quality protein to support the nutritional needs of growing puppies, pregnant and lactating females, and high-performing dogs. With scientifically advanced and nutritionally complete ingredients, this formula promotes sustained energy and healthy immune and digestive systems.",
      price: 5399,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81QKEvc49KL._AC_SS450_.jpg",
    }),
    Product.create({
      name: "Purina Pro Plan Large/Giant breed (34 lbs)",
      description:
        "We know dogs 50 lbs and over can benefit from specialized nutrition to support their unique needs--from puppy to adult to senior. So we have an entire line of Pro Plan Large Breed and Giant Breed formulas. Each formula has specific nutrients for joint health, and a protein to fat ratio that supports an ideal body condition. Plus all of our great-tasting dry formulas are fortified with live probiotics for digestive and immune health.",
      price: 5248,
      stock: 100,
      imageUrl:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2986205-center-1",
    }),
    Product.create({
      name: "Milk-Bone Dog Treats",
      description:
        "Contains (1) 10 Pound box of Dog Treats for dogs over 50 Pounds. Wholesome and tasty dog treats — now with even MORE meaty taste compared to the Milk-Bone Original biscuits you know and love",
      price: 1248,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81mh79Yip6S._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Purina Fancy Feast Natural Wet Cat Food Variety Pack",
      description:
        "Thirty (30) 3 ounces Cans - Purina Fancy Feast Gourmet Naturals Poultry & Beef Adult Wet Cat Food Variety Pack. Natural ingredients with added vitamins, minerals and nutrients",
      price: 3699,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91rQQnUhzLL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Cat Toy Laser Pointer",
      description:
        "Rich Patterns: Adjust the pointer of the funny cat toy to the red light state, you can easily switch gears to get five different patterns. Funny indoor cat toys can print the red dots、butterfly、smiley、star. Multiple pattern changes inspire pets' interest, so your cat will never be bored. Easy to Carry: Kitten toy, similar to the size of a pen, with a solid stainless steel shell with a pen clip. It can be easily put into a pocket and used anytime, anywhere.",
      price: 1199,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61GB-PScR6L._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Cat Toy Rotating Butterfly",
      description:
        "Cat toys box comes with 1 track toy, 1 automatic cat toys, 1 rolling balls, 2 butterfly toys, designed with an unique UFO shape for all indoor cats, a flying butterfly wand on surface, featuring chase balls inside.",
      price: 2199,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71MzGP3vfVL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Tough Dog Chew Toy",
      description:
        "Chewing is Instinctive needs for dogs, dogs love to chew, durable chew toys designed for extreme chewers, and all chewing habits. Dog Chew Toy like a wood stick for a paw-friendly grip so your love can quickly grab it and get a good chew going. Think about it: dogs don't have thumbs. Durable dog toys for aggressive chewers weigh between 15lbs to 90lbs to satisfy their chewing needs.",
      price: 1485,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71Mt--QzT0S._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Wild Harvest Bird Seed",
      description:
        "FOR SMALL BIRDS: This nutrient-rich universal blend food is ideal for canaries, parakeets, finches and other small birds.",
      price: 322,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/817CK5y6pyL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "8 Pack Bird Toy Set",
      description:
        "What you get :Package include 8 pieces difference type bird entertaining toys to meet your various needs for bird parrots,perfect size for parrotlets, parakeets, cockatiels, lovebirds and etc.",
      price: 1399,
      stock: 100,
      imageUrl: "https://m.media-amazon.com/images/I/51yHVxAZCoL._AC_.jpg",
    }),
    Product.create({
      name: "Puppy Pee Pads",
      description:
        "Thickened wee wee pads for dogs and 6-layer protection design makes our dog pee pee pads more absorbent than the most puppy potty pads on the market.",
      price: 2499,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/718JS-vaRHS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Aqueon Tropical Flakes",
      description:
        "Natural ingredients and colors with added vitamins, minerals and trace nutrients",
      price: 599,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/8188zyUuHiL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "3 Aquarium Kit",
      description:
        "AQUARIUM KIT: Half-moon shape allows 180-degree panoramic viewing starter kit has everything you need.  Bubbling disc automatically cycles through a rainbow of LED light colors. Includes air pump-driven Tetra Whisper Internal Power Filter to keep your tank clean and provide a healthy environment for a pet fish.",
      price: 3999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/910PTntnXRL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Baby Turtle Nutri Stick",
      description:
        "A blend of wild sword prawns & akiami paste shrimp, and vegetables + seaweed. A perfect 6:4 meat/vegetable protein ratio.",
      price: 699,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91z9dwL8VeL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Wild Harvest Hamster Food",
      description:
        "Advanced Nutrition Diets In Flip Top Container. More Convenient Than Screw Top Containers. Unique mix of ingredients create an irresistible blend to replicate diets found in a natural habitat and encourage foraging behaviors.",
      price: 1049,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81XfrWjPtmL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Dog Toy Soccer Ball",
      description:
        "Complying with the exact same standard as children's toys, the dog ball is made of premium PU that is the matiral of standard soccer ball so that it can be kicked and bounces as well. Note, our dog soccer medium balls is suitable for 20-40lbs dogs, HEAVY DOG PET needs to choose our Large one(Large size, fits 30-90lbs).",
      price: 1599,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61fXR7NzobL._AC_SL1080_.jpg",
    }),
    Product.create({
      name: "Doggoz Dog Bandanas",
      description:
        "4 set dog bandana made with 100% fresh cotton to style your dog and have him feeling great with a fancy new look.",
      price: 1499,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81Y21TxpeoL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Quiet Spinner Hamster Wheel",
      description:
        "Super Silent 10-Inch Hamster Wheel - Niteangel Silent Spinner Hamster wheel designed with Dual Ball bearings, it brings your little hamster endless running happiness, also brings you a quiet night even if your hamster on the race track to run & hamster wheel is spinning.",
      price: 3199,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61xCfgl2ZDL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Kaytee Supreme Rabbit Food 5lb",
      description:
        "Natural seeds and grains. Kaytee is a Veterinarian Recommended Brand. No artificial colors or flavors. High quality ingredients. Naturally preserved for ideal freshness. Specially formulated for rabbits",
      price: 682,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81uPSErFkJL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Canple Pet Bowl Set",
      description:
        " Set of 2 dog Bowls, 12 oz (350ml) each, provides a full dinner set one for food one for water, designed for puppy small dogs and cats.",
      price: 2098,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61acVvqJbZS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Cat Tunnel",
      description:
        "Made of cloth material, which is friendly to your pets. soft durable. A vent design so that cats can freely get in and out of the tunnel. Sound paper design, which makes sounds interesting and attracts cats' attention. Fun toy for cats to play, gives your kitty more ways to have fun, provides hours of exercise ,self-amusement and hiding away.",
      price: 2598,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/514IUlr-qaL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Dog Chewy Toy",
      description:
        "This kind of dog squeaky dog toys is more attractive to dogs, can be made funny sounds and more exciting when they chewing. It stimulates the dog's hunting instinct and allows the dog to release energy. Increased interaction between dog and owner.",
      price: 1899,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71c-Btl1whS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Large Dog Bed",
      description:
        "Large dog bed with quality pp fiber, non-toxic and eco-friendly. Soft coral fleece soft and comfortable, soft filling offers joint and muscle pain relief, different from others.",
      price: 3599,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71mEw80g8xL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Cat Tree Tower Condo",
      description:
        "The multi-level cat tree is composed of good quality 0.5in particle board with 400g skin-friendly plush covering, reinforced posts are wrapped with natural sisal rope for cats to scratch and sharpen their claws without damaging your own furniture.",
      price: 5999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81vnkRKZOzL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Reptile Heat Lamp",
      description:
        "UV lamps can effectively provide high penetration and easier absorption to promote the healthy development of reptile bones. and make your pet reptile’s enclosure more homely and comfortable with the use of heat lamps with clamp for reptiles.",
      price: 2199,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71sC4uwWqoL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Floating Turtle Platform",
      description:
        "Suit for the turtle which length below 20 cm.Strong suction cups, four support frame at the bottom with four suction cups. Fixed to the bottom of the tank durable. Floating island design, a large triangular terrace automatically float plane",
      price: 1388,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61zIjbq9sUL._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Blueberry Dog Collar",
      description:
        "Size Medium. The collar does not stretch itself, please make sure leave ONLY 2 fingers between collar and dog neck. A properly fitting collar and harness won't leave any room for your dog to chew. The collar is not for tie out. NEVER leave your dog unattended with a collar on.",
      price: 899,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71L7vO+Y5dS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Dog Knitted Soft Sweater",
      description:
        "Material: Woolen. Keeps your pet dog warmer and more cute. Easy to wash and dry",
      price: 799,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/611nW4d0z2L._AC_SL1015_.jpg",
    }),
    Product.create({
      name: "Dog Seat Cover",
      description:
        "Forget about those cheap dog car seat covers that get ruined after a single use! Active Pets introduces a back seat cover with the latest in materials technology and a unique mesh window for easy communication with your dog. The mesh opening provides better air circulation and reduces anxiety and stress for your dog! Enjoy a 100% waterproof barrier between your seats and mud, water or fur. Experience this back seat dog cover for cars and SUVs with a peaceful mind!",
      price: 3056,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91KBfIO+bEL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "5FT Strong Dog Leash",
      description:
        "Made of high-quality nylon climbing rope and metal buckle, strong and durable.",
      price: 999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71UzP01VFtS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Dog Harness",
      description:
        "Recommended Breeds: Medium to Large Dogs, such as Golden Retriever, Huskie, Labrador, Alaska, German Shepherd, Akita, etc. Please measure the size carefully before purchasing this present for your puppy. Make your puppy stand out with this Classic Black Harness!",
      price: 1998,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61AztER-+-L._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Automatic Pet Feeder",
      description:
        "Flexible Timed Feeding: No more pre-dawn wake up calls, or worry when you are overtime at night! Easy to program PETLIBRO automatic cat feeder with timer to dispense food in right time, 1-4 meals per day and up to 9 portions per meal customized healthy diet for your cats and dogs.",
      price: 6999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61zfcdEJE5L._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Pet Carrier TSA Approved",
      description:
        "With airline-approved design, you can take your pet to go to everywhere. This pet carrier provides two connecting loop handles for balanced carrying as a dual seat belt or luggage strap to secure transport.",
      price: 2199,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/813v3252ylL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Pet Grooming Gloves",
      description:
        "With enhanced 255 silicone grooming tips, mimics the touch of your hand for a soft and relaxing massage; This flexible, slip-on grooming gloves allow you to brush away dirt and loose hair from cats and dogs.",
      price: 1321,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/713JHXyZS9L._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Folding Pet Steps",
      description:
        "Help your best friend climb up on the sofa or bed all by themselves. Small size supports pets up to 150 lbs; large size supports pets up to 200 lbs. Nonskid feet, fabric tread covers and siderails keep the steps from moving and your pet from sliding",
      price: 4295,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91JaqHRowfL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Sliding Glass Dog Door",
      description:
        "Insulates your home in cold and hot temperatures using the award-winning Endura Flap pet door and dual-pane LoE glass that keeps your home temperature consistent without sacrificing your natural light",
      price: 29999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71GymvA-LJL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Foldable Metal Dog Playpen",
      description:
        "Secure double latch step-through door access, Exercise Pen / Pet Playpen folds flat for convenient storage",
      price: 6299,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81sXycH+evL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Pet Water Fountain",
      description:
        "The Veken pump is ultra-quiet (measured below 40dB) and low consumption which means that it normally lasts between 2.5 - 4 years!",
      price: 2799,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61KQhzEnZBL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Waterproof Pet Bed Cover",
      description:
        "Guaranteed!This premium protector prevents almost all types of moisture and liquids from leaking through. Perfect for those with dogs and cats!",
      price: 2699,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/516YXwMK4gL._AC_.jpg",
    }),
    Product.create({
      name: "Dog Bed Cot",
      description:
        " Raised dog bed helps pets stay cool in warm spring and summer months by allowing air to circulate and keeps pets off wet/cold ground with ground clearance",
      price: 3499,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71KV03f5gvS._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Orthopedic Cooling Gel Dog Bed",
      description:
        "The classic bolstered sofa design promotes ultimate comfort and security, providing high-loft orthopedic cushion support as well as a super cozy nestling and burrowing space for dogs and cats",
      price: 6299,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71Kadw7BZrL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Fish Air Bubble Increaser",
      description:
        "This Air Bubbler will increase the amount of bubbles inside any fishtank by a lot!",
      price: 599,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71JLLRNSsoL._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Aquarium Castle Decoration",
      description:
        "1 pc resin castle aquarium decoration with doors for fish swimming through and hiding. Tips: please sink the product in the clean water for 10 minutes before using.",
      price: 1299,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81A83sFlzlL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Cat Window Perch",
      description:
        "Package include 1 x Window-Mounted Cat Bed, 1 x Free Fleece Blanket, 1 x English Manual, 1 x Exquisite Gift Box, easy to install and no need any tool. Prefect match gives your cats comfortable and fun seat in the house.",
      price: 2799,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/81Vg5sSzKZL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Silvervine Catnip Balls",
      description:
        "100% Natural and Non-toxic: the catnip balls are made of pure natural plant extracts, no chemical additives contained. Rest assured this toy is no harm to your favorite kitty. Includes 3 different flavors.",
      price: 1094,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/61MFSSVIb2L._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Cat Litter Mat",
      description:
        "Special & Large Cat Litter Box Rug: The honeycomb design holes are big and deep enough to catch and trap litter granules effectively. The double Layer kitty trapper mats with medium size could collect large amounts of cat litter so that you could dump it easily back into the litter box.",
      price: 1549,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/71qEt-3aHcL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Stackable Cat Condo",
      description:
        "It's a cat cove and cozy nap pad in one something every cat is sure to love!",
      price: 8574,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91Hm11As2IL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Sofa Pet Cover",
      description:
        "Guaranteed! This premium protector prevents almost all types of moisture and liquids from leaking through. Perfect for those with dogs and cats!",
      price: 1999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/51GmeHju5eL._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Light Up Dog Collar",
      description:
        "Our lighted dog collar is made of high quality nylon webbing fabric, and this collar has double rows of lights, it’s very bright and high visible. Glow in the dark, keep your dogs and cats be seen & safe at night.",
      price: 1266,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/51GVd0A+geL._AC_SL1000_.jpg",
    }),
    Product.create({
      name: "Dog Nail Set",
      description:
        "The dog nail trimmer has 3 size ports with 2 speed,which is suitable for all kinds of pets. You can adjust an appropriate model to trim your pets' nail according to their size. Get our pet nail grinder,will help you to save more money to trim pet's nail at home.",
      price: 1598,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/619-4EQiAhL._AC_SL1500_.jpg",
    }),
    Product.create({
      name: "Dog Barn House",
      description:
        "This Dog house's all plastic construction and rear air ventilations system fleas and provides long lasting protection; Also useful for outdoor cats and strays; For pets between 25 to 50 pounds.",
      price: 7999,
      stock: 100,
      imageUrl:
        "https://m.media-amazon.com/images/I/91GBnbdRQdL._AC_SL1500_.jpg",
    })
  ]);

  console.log(
    `seeded ${users.length} users and ${products.length} products into db`
  );
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
