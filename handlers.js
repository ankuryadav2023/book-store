const { writers, books, users } = require('./mongodb');
const { responses } = require('./responses');

exports.getUsers = async () => {
  try {
    const response = await users.find();
    return responses._200(response);
  } catch (error) {
    console.log(error.message);
    return responses._400({ error: error.message });
  }
}

exports.getWriters = async () => {
  try {
    const response = await writers.aggregate([
      {
        $lookup: {
          from: 'books',
          localField: 'books',
          foreignField: 'bid',
          as: 'books'
        }
      }
    ]);
    return responses._200(response);
  } catch (error) {
    console.log(error.message);
    return responses._400({ error: error.message });
  }
}

exports.getBooks = async () => {
  try {
    const response = await books.aggregate([
      {
        $lookup: {
          from: 'writers',
          localField: 'writers',
          foreignField: 'wid',
          as: 'writers'
        }
      }
    ]);
    return responses._200(response);
  } catch (error) {
    console.log(error.message);
    return responses._400({ error: error.message });
  }
}

exports.createUser = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const newUser = {
        name: body.name,
        apiKeys: body.apiKeys,
        role: body.role,
        email: body.email
      }
      await users.create(newUser);
      return responses._200({ message: "User created successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}

exports.createWriter = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const newWriter = {
        name: body.name,
        bio: body.bio,
        nationality: body.nationality,
        birthdate: body.birthdate,
        deathdate: body.deathdate,
        genres: body.genres,
        books: body.books,
        debut_year: body.debut_year,
        wid: body.wid
      }
      await writers.create(newWriter);
      return responses._200({ message: "Writer created successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}

exports.createBook = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const newBook = {
        title: body.title,
        genre: body.genre,
        publication_year: body.publication_year,
        pages: body.pages,
        summary: body.summary,
        writers: body.writers,
        ISBN: body.ISBN,
        language: body.language,
        publisher: body.publisher,
        bid: body.bid
      }
      await books.create(newBook);
      return responses._200({ message: "Book created successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}

exports.updateUserByID = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const response = await users.findById(event.pathParameters._id);
      if (body.name) response.name = body.name;
      if (body.apikeysToAdd) response.apikeys = [...response.apikeys, ...body.apikeysToAdd];
      if (body.apikeysToRemove) response.apikeys = response.apikeys.filter(apikey => {
        return !body.apikeysToRemove.includes(apikey);
      })
      if (body.role) response.role = body.role;
      if (body.email) response.email = body.email;
      await response.save();
      return responses._200({ message: "User updated successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}

exports.updateWriterByID = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const response = await writers.findById(event.pathParameters._id);
      if (body.name) response.name = body.name;
      if (body.bio) response.bio = body.bio;
      if (body.nationality) response.nationality = body.nationality;
      if (body.birthdate) response.birthdate = body.birthdate;
      if (body.deathdate) response.deathdate = body.deathdate;
      if (body.genresToAdd) response.genres = [...response.genres, ...body.genresToAdd];
      if (body.genresToRemove) response.genres = response.genres.filter(genre => {
        return !body.genresToRemove.includes(genre);
      })
      if (body.booksToAdd) response.books = [...response.books, ...body.booksToAdd];
      if (body.booksToRemove) response.books = response.books.filter(book => {
        return !body.booksToRemove.includes(book);
      })
      if (body.debut_year) response.debut_year = body.debut_year;
      if (body.wid) response.wid = body.wid;
      await response.save();
      return responses._200({ message: "Writer updated successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}

exports.updateBookByID = async (event) => {
  if (event.body) {
    try {
      const body = JSON.parse(event.body);
      const response = await books.findById(event.pathParameters._id);
      if (body.title) response.title = body.title;
      if (body.genre) response.genre = body.genre;
      if (body.publication_year) response.publication_year = body.publication_year;
      if (body.pages) response.pages = body.pages;
      if (body.summary) response.summary = body.summary;
      if (body.writersToAdd) response.writers = [...response.writers, ...body.writersToAdd];
      if (body.writersToRemove) response.writers = response.writers.filter(writer => {
        return !body.writersToRemove.includes(writer);
      })
      if (body.ISBN) response.ISBN = body.ISBN;
      if (body.language) response.language = body.language;
      if (body.publisher) response.publisher = body.publisher;
      if (body.bid) response.bid = body.bid;
      await response.save();
      return responses._200({ message: "Book updated successfully." });
    } catch (error) {
      console.log(error.message);
      return responses._400({ error: error.message });
    }
  } else {
    return responses._400({ error: "No body provided in API request." });
  }
}