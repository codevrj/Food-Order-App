import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('12345678'),
      isAdmin: true,
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: bcrypt.hashSync('abcdefgh'),
      isAdmin: false,
    },
  ],
  products: [
    {

      name: 'Chicken Burger',
      slug: 'Burger',
      category: 'Burger',
      image: '/images/bgr1.jpg',
      price: 1500,
      type: 'non-veg',
      rating: 4.5,
      numReviews: 5,
      countInStock: 3,
      description: 'Chunky chicken & chicken & chrispy',
      isFeatured: true,
      banner: '/images/banner1.jpg',
    },
    {

      name: 'Chicken Pizza',
      slug: 'Pizza',
      category: 'ggg',
      image: '/images/pz1.jpg',
      price: 2500,
      type: 'pdps ddsd',
      rating: 3.5,
      numReviews: 2,
      countInStock: 5,
      description: 'Chunky chicken & Chunky chicken & chrispy',
      isFeatured: true,
      banner: '/images/banner2.jpg',
    },
    {

      name: 'Chicken Burger',
      slug: 'Pan Cake',
      category: 'cake',
      image:
        'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 3200,
      type: 'Chunky chicken & chrispy',
      rating: 4.5,
      numReviews: 5,
      countInStock: 10,
      description: 'Chunky chicken & Chunky chicken & chrispy',
    },
    {

      name: 'Chicken Burger',
      slug: 'Pudding',
      category: 'fdf',
      image:
        'https://images.pexels.com/photos/10885314/pexels-photo-10885314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      price: 4500,
      type: 'lorem+6',
      rating: 4.5,
      numReviews: 2,
      countInStock: 10,
      description: 'Chunky chicken & Chunky chicken & chrispy',
    },
    // {
    //   // _id: '5',
    //   name: 'Special Burger',
    //   slug: 'Burger',
    //   category: 'fggg',
    //   image:
    //     'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    //   price: 1500,
    //   type: 'pdps ddsd',
    //   rating: 4,
    //   numReviews: 5,
    //   countInStock: 10,
    //   description: 'ds lorefdd',
    // },
    // {
    //   _id: '6',
    //   name: 'Italian Pizza',
    //   slug: 'pizza',
    //   category: '',
    //   image:
    //     'https://img.freepik.com/premium-photo/whole-italian-pizza-wooden-table-with-ingredients_251318-13.jpg?w=996',
    //   price: 2500,
    //   type: 'pdps ddsd',
    //   rating: 4.5,
    //   numReviews: 4,
    //   countInStock: 5,
    //   description: 'ds lorefdd',
    // },
    // {
    //   _id: '7',
    //   name: 'Cheesy Pizza',
    //   slug: 'pizza',
    //   category: 'pza',
    //   image:
    //     'https://img.freepik.com/free-photo/pizza-with-ham-mushrooms-olives_2829-10324.jpg?w=996&t=st=1675556128~exp=1675556728~hmac=0fc9a0c2f7e05cb7d00cd7f5f95862ce543126d5c67c3d551bee5244cd905902',
    //   price: 2500,
    //   type: 'pdps ddsd',
    //   rating: 4.5,
    //   numReviews: 4,
    //   countInStock: 5,
    //   description: 'ds lorefdd',
    // },

    {
      name: 'Sandwich',
      slug: 'sandwich',
      category: 'sndwich',
      image:
        'https://img.freepik.com/free-photo/club-sandwich-with-side-french-fries_140725-1744.jpg?w=996&t=st=1675556166~exp=1675556766~hmac=f9388f59eaa9390efbba5842885ee6ddf5fda248c0b1e7b5440eeb30d6f5138c',
      price: 2500,
      type: 'pdps ddsd',
      rating: 4.5,
      numReviews: 4,
      countInStock: 5,
      description: 'ds lorefdd',
    },
  ],
};

export default data;
