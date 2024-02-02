#! /usr/bin/env node

console.log(
  'This script populates some test items and cetegories to the Database.'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const items = [];
const categories = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createCategories();
  await createItems();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
  const categoryDetail = { name: name, description: description };
  const category = new Category(categoryDetail);
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function itemCreate(
  index,
  name,
  description,
  category,
  price,
  numberinstock
) {
  const itemDetail = {
    name: name,
    description: description,
    price: price,
    numberinstock: numberinstock,
  };

  if (category != false) itemDetail.category = category;

  const item = new Item(itemDetail);

  await item.save();
  items[index] = item;
  console.log(`Added item: ${name}`);
}

async function createCategories() {
  console.log('Adding categories');
  await Promise.all([
    categoryCreate(
      0,
      'Watches',
      'Cool devices to check the hours and look fine'
    ),
    categoryCreate(1, 'Glasses', 'They protect your eyes from the sunlight!'),
    categoryCreate(
      2,
      'Sneakers',
      'To have that young drip, and also may protect your feet'
    ),
  ]);
}

async function createItems() {
  console.log('Addind items');
  await Promise.all([
    itemCreate(
      0,
      'Seiko Watch',
      'Automatic japanese watch',
      categories[0],
      399,
      4
    ),
    itemCreate(
      1,
      'Ray-Ban Sunglasses',
      'Aviator style ray-ban sunglasses with UV Protection',
      categories[1],
      199,
      8
    ),
    itemCreate(
      2,
      'Adidas Samba',
      'Beautiful and atemporal sneaker to make your looks fresh',
      categories[2],
      399,
      8
    ),
  ]);
}
