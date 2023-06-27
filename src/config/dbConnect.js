import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://alura:123@alura.99hrxvi.mongodb.net/alura-node");

let db = mongoose.connection;

export default db;