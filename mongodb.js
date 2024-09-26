const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_CONNECTION_URI);

const writerSchema = mongoose.Schema({
    name: { type: String, required: true },
    bio: { type: String },
    nationality: { type: String },
    birthdate: { type: String },
    deathdate: { type: String },
    genres: [{ type: String }],
    books: [{ type: String }],
    debut_year: { type: Number },
    wid: { type: String, required: true, unique: true }
});
const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String },
    publication_year: { type: Number },
    pages: { type: Number },
    summary: { type: String },
    writers: [{ type: String }],
    ISBN: { type: String, required: true, unique: true },
    language: { type: String },
    publisher: { type: String },
    bid: { type: String, required: true, unique: true }
});
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    apikeys: [{ type: String }],
    role: { type: String, enum: ['admin', 'user'], required: true },
    email: { type: String, required: true, unique: true }
});

const writers = mongoose.model('writers', writerSchema);
const books = mongoose.model('books', bookSchema);
const users = mongoose.model('users', userSchema);

module.exports = { writers, books, users };