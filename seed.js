"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

mongoose.connect(
  "mongodb://localhost:27017/workspace_db",
  { useNewUrlParser: true }
);
mongoose.connection;

var contacts = [
  {
    name: "Sato Kento",
    email: "sato-kento@sample.com",
    zipCode: 1000033
  },
  {
    name: "Hashimoto Yuko",
    email: "haashimoto-yuko@sample.com",
    zipCode: 9802211
  },
  {
    name: "Suzuki Yuma",
    email: "suzuki-yumae@sample.com",
    zipCode: 7890044
  }
];

Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach(c => {
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

Promise.all(commands)
  .then(r => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });