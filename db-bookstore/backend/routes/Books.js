import express from 'express';
const router = express.Router();

// Get all books
/*
router.get('/', async (req, res) => {
  const players = await req.context.models.Player.findAll();
  return res.send(players);
});
*/
router.get('/', async (req, res) => {
  try {
    // const books = await req.context.models.Book.findAll({
    //   attributes: ['BookID', 'ISBN', 'Title', 'Publisher', 'PublicationYear', 'Edition', 'Price', 'Stock']
    // });
    const books = await req.context.models.Book.findAll ();  
    return res.send(books);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a book by ID
router.get('/:bookId', async (req, res) => {
  try {
    const book = await req.context.models.Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    return res.send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new book
router.post('/', async (req, res) => {
  try {
    const book = await req.context.models.Book.create({
      ISBN: req.body.ISBN,
      Title: req.body.Title,
      Publisher: req.body.Publisher,
      PublicationYear: req.body.PublicationYear,
      Edition: req.body.Edition,
      Price: req.body.Price,
      Stock: req.body.Stock,
    });
    return res.status(201).send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a book by ID
router.put('/:bookId', async (req, res) => {
  try {
    const book = await req.context.models.Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    await book.update({
      ISBN: req.body.ISBN,
      Title: req.body.Title,
      Publisher: req.body.Publisher,
      PublicationYear: req.body.PublicationYear,
      Edition: req.body.Edition,
      Price: req.body.Price,
      Stock: req.body.Stock,
    });
    return res.send(book);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a book by ID
router.delete('/:bookId', async (req, res) => {
  try {
    const book = await req.context.models.Book.findByPk(req.params.bookId);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    await book.destroy();
    return res.send({ message: 'Book deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;