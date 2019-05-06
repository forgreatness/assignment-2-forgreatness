db.createUser({
  user: "danh",
  pwd: "nguydanh",
  roles: [ { role: "readWrite", db: "yelp" } ]
});

db.businesses.insertMany([
  {
    "id": 0,
    "ownerid": 0,
    "name": "Block 15",
    "address": "300 SW Jefferson Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-758-2077",
    "category": "Restaurant",
    "subcategory": "Brewpub",
    "website": "http://block15.com"
  },
  {
    "id": 1,
    "ownerid": 1,
    "name": "Corvallis Brewing Supply",
    "address": "119 SW 4th St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-758-1674",
    "category": "Shopping",
    "subcategory": "Brewing Supply",
    "website": "http://www.lickspigot.com"
  },
  {
    "id": 2,
    "ownerid": 2,
    "name": "Robnett's Hardware",
    "address": "400 SW 2nd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-753-5531",
    "category": "Shopping",
    "subcategory": "Hardware"
  },
  {
    "id": 3,
    "ownerid": 3,
    "name": "First Alternative Co-op North Store",
    "address": "2855 NW Grant Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-452-3115",
    "category": "Shopping",
    "subcategory": "Groceries"
  },
  {
    "id": 4,
    "ownerid": 4,
    "name": "WinCo Foods",
    "address": "2335 NW Kings Blvd.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-753-7002",
    "category": "Shopping",
    "subcategory": "Groceries"
  },
  {
    "id": 5,
    "ownerid": 5,
    "name": "Fred Meyer",
    "address": "777 NW Kings Blvd.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-753-9116",
    "category": "Shopping",
    "subcategory": "Groceries"
  },
  {
    "id": 6,
    "ownerid": 6,
    "name": "Interzone",
    "address": "1563 NW Monroe Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-754-5965",
    "category": "Restaurant",
    "subcategory": "Coffee Shop"
  },
  {
    "id": 7,
    "ownerid": 7,
    "name": "The Beanery Downtown",
    "address": "500 SW 2nd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-753-7442",
    "category": "Restaurant",
    "subcategory": "Coffee Shop"
  },
  {
    "id": 8,
    "ownerid": 8,
    "name": "Local Boyz",
    "address": "1425 NW Monroe Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-754-5338",
    "category": "Restaurant",
    "subcategory": "Hawaiian"
  },
  {
    "id": 9,
    "ownerid": 9,
    "name": "Darkside Cinema",
    "address": "215 SW 4th St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-752-4161",
    "category": "Entertainment",
    "subcategory": "Movie Theater",
    "website": "http://darksidecinema.com"
  },
  {
    "id": 10,
    "ownerid": 10,
    "name": "The Book Bin",
    "address": "215 SW 4th St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-752-0040",
    "category": "Shopping",
    "subcategory": "Book Store"
  },
  {
    "id": 11,
    "ownerid": 11,
    "name": "Cyclotopia",
    "address": "435 SW 2nd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-757-9694",
    "category": "Shopping",
    "subcategory": "Bicycle Shop"
  },
  {
    "id": 12,
    "ownerid": 12,
    "name": "Corvallis Cyclery",
    "address": "344 SW 2nd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-752-5952",
    "category": "Shopping",
    "subcategory": "Bicycle Shop"
  },
  {
    "id": 13,
    "ownerid": 13,
    "name": "Oregon Coffee & Tea",
    "address": "215 NW Monroe Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-752-2421",
    "category": "Shopping",
    "subcategory": "Tea House",
    "website": "http://www.oregoncoffeeandtea.com"
  },
  {
    "id": 14,
    "ownerid": 14,
    "name": "Spaeth Lumber",
    "address": "1585 NW 9th St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-752-1930",
    "category": "Shopping",
    "subcategory": "Hardware"
  },
  {
    "id": 15,
    "ownerid": 15,
    "name": "New Morning Bakery",
    "address": "219 SW 2nd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-754-0181",
    "category": "Restaurant",
    "subcategory": "Bakery"
  },
  {
    "id": 16,
    "ownerid": 3,
    "name": "First Alternative Co-op South Store",
    "address": "1007 SE 3rd St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-753-3115",
    "category": "Shopping",
    "subcategory": "Groceries"
  },
  {
    "id": 17,
    "ownerid": 7,
    "name": "The Beanery Monroe",
    "address": "2541 NW Monroe Ave.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97330",
    "phone": "541-757-0828",
    "category": "Restaurant",
    "subcategory": "Coffee Shop"
  },
  {
    "id": 18,
    "ownerid": 0,
    "name": "Block 15 Brewery & Tap Room",
    "address": "3415 SW Deschutes St.",
    "city": "Corvallis",
    "state": "OR",
    "zip": "97333",
    "phone": "541-752-2337",
    "category": "Restaurant",
    "subcategory": "Brewpub",
    "website": "http://block15.com"
  }
]);

db.reviews.insertMany([
  {
    "id": 0,
    "userid": 7,
    "businessid": 8,
    "dollars": 1,
    "stars": 4.5,
    "review": "Cheap, delicious food."
  },
  {
    "id": 1,
    "userid": 25,
    "businessid": 2,
    "dollars": 1,
    "stars": 4,
    "review": "How many fasteners can one room hold?"
  },
  {
    "id": 2,
    "userid": 26,
    "businessid": 1,
    "dollars": 1,
    "stars": 5,
    "review": "Joel, the owner, is super friendly and helpful."
  },
  {
    "id": 3,
    "userid": 21,
    "businessid": 14,
    "dollars": 2,
    "stars": 4
  },
  {
    "id": 4,
    "userid": 28,
    "businessid": 18,
    "dollars": 1,
    "stars": 4,
    "review": "Good beer, good food, though limited selection."
  },
  {
    "id": 5,
    "userid": 21,
    "businessid": 9,
    "dollars": 1,
    "stars": 5,
    "review": "A Corvallis gem."
  },
  {
    "id": 6,
    "userid": 26,
    "businessid": 8,
    "dollars": 1,
    "stars": 5,
    "review": "Yummmmmmm!"
  },
  {
    "id": 7,
    "userid": 25,
    "businessid": 18,
    "dollars": 2,
    "stars": 4.5
  },
  {
    "id": 8,
    "userid": 20,
    "businessid": 2,
    "dollars": 2,
    "stars": 4
  },
  {
    "id": 9,
    "userid": 6,
    "businessid": 15,
    "dollars": 2,
    "stars": 5,
    "review": "Try the hazlenut torte.  It's the best!"
  }
]);

db.photos.insertMany([
  {
    "id": 0,
    "userid": 7,
    "businessid": 8,
    "caption": "This is my dinner."
  },
  {
    "id": 1,
    "userid": 25,
    "businessid": 2
  },
  {
    "id": 2,
    "userid": 26,
    "businessid": 1,
    "caption": "Hops"
  },
  {
    "id": 3,
    "userid": 21,
    "businessid": 14
  },
  {
    "id": 4,
    "userid": 28,
    "businessid": 18,
    "caption": "Sticky Hands"
  },
  {
    "id": 5,
    "userid": 21,
    "businessid": 9,
    "caption": "Popcorn!"
  },
  {
    "id": 6,
    "userid": 26,
    "businessid": 8
  },
  {
    "id": 7,
    "userid": 25,
    "businessid": 18,
    "caption": "Big fermentor"
  },
  {
    "id": 8,
    "userid": 20,
    "businessid": 2
  },
  {
    "id": 9,
    "userid": 6,
    "businessid": 15,
    "caption": "Cake!"
  }
]);
