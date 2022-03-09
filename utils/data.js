import bcryptjs from "bcryptjs";

export const data = {
  users: [
    {
      name: "John Doe",
      email: "johndoe@email.com",
      password: bcryptjs.hashSync("doe123", 12),
    },
    {
      name: process.env.NAME,
      email: process.env.EMAIL,
      password: bcryptjs.hashSync(process.env.PASS, 12),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: "White Shirt",
      category: "Shirts",
      image: "/images/3-white.jpg",
      price: 125,
      brand: "Valentino",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "white-shirt",
    },
    {
      name: "Black Shirt",
      category: "Shirts",
      image: "/images/8.jpg",
      price: 160,
      brand: "Breguet",
      rating: 3.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "black-shirt",
    },
    {
      name: "Ash Shirt",
      category: "Shirts",
      image: "/images/3.jpg",
      price: 150,
      brand: "Nike",
      rating: 4,
      numReviews: 10,
      countInStock: 10,
      description: "A nice white shirt",
      slug: "ash-shirt",
    },
    {
      name: "Band",
      category: "bands",
      image: "/images/7.jpg",
      price: 75,
      brand: "Oliver",
      rating: 2.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice band",
      slug: "band",
    },
    {
      name: "red Shirt",
      category: "Shirts",
      image: "/images/4.jpg",
      price: 70,
      brand: "Burberry",
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "red-shirt",
    },
    {
      name: "wrist-band",
      category: "bands",
      image: "/images/2.jpg",
      price: 65,
      brand: "Tiffany & Co.",
      rating: 3,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "wrist-band",
    },
    {
      name: "Green Pants",
      category: "pants",
      image: "/images/11.jpg",
      price: 165,
      brand: "Varsace",
      rating: 1.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "green-pants",
    },
    {
      name: "Black H Pants",
      category: "pants",
      image: "/images/15.jpg",
      price: 180,
      brand: "Hermes",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "black-h-pants",
    },
    {
      name: "Jelly b Pants",
      category: "pants",
      image: "/images/13.jpg",
      price: 150,
      brand: "Adidas",
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "jelly-b-pants",
    },
    {
      name: "Red White Gown",
      category: "pants",
      image: "/images/20.jpg",
      price: 290,
      brand: "Lululemon",
      rating: 4,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "red-white-gown",
    },
    {
      name: "janes box",
      category: "pants",
      image: "/images/16.jpg",
      price: 200,
      brand: "Varsace",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "janes-box",
    },
    {
      name: "B shorts",
      category: "shorts",
      image: "/images/17.jpg",
      price: 150,
      brand: "Nike",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "b-shorts",
    },
    {
      name: "yellow dress",
      category: "pants",
      image: "/images/18.jpg",
      price: 190,
      brand: "Varsace",
      rating: 3,
      numReviews: 10,
      countInStock: 20,
      description: "A nice white shirt",
      slug: "yellow-dress",
    },
    {
      name: "customised top",
      category: "shirts",
      image: "/images/28.jpg",
      price: 170,
      brand: "Hermes",
      rating: 5,
      numReviews: 10,
      countInStock: 20,
      description: "nice custom top just for you",
      slug: "customised-top",
    },
    {
      name: "Red AOA Top",
      category: "shirts",
      image: "/images/26.jpg",
      price: 370,
      brand: "Gucci",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "nice top just for you",
      slug: "red-aoa-top",
    },
    {
      name: "Xtry Jokes",
      category: "shirts",
      image: "/images/27.jpg",
      price: 270,
      brand: "Louis Vuitton",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "T Shirts with chemistry jokes",
      slug: "black-xtry-joke",
    },
  ],
};
