import mongoose from "mongoose";
const { TextEncoder, TextDecoder } = require("util");

var util= require('util');
var encoder = new util.TextEncoder('utf-8');
// const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_URI = "mongodb+srv://sachin:12345@cluster0.wyi04.mongodb.net/urlshortener";
// console.log("hhh", process.env.MONGODB_URI,11,MONGODB_URI);
if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const dbConnect = () => {
  if (mongoose.connection.readyState >= 1) return;

  mongoose.connect(MONGODB_URI);
};

export default dbConnect;