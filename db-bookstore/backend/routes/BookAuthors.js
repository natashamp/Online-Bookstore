import express from 'express';
const router = express.Router();

// Get all book-author relationships
router.get('/', async (req, res) => {
  try {
    const bookAuthors = await req.context.models.BookAuthor.findAll();
    return res.send(bookAuthors);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a book-author relationship by BookID and AuthorID
router.get('/:bookId/:authorId', async (req, res) => {
  try {
    const bookAuthor = await req.context.models.BookAuthor.findOne({
      where: {
        BookID: req.params.bookId,
        AuthorID: req.params.authorId,
      },
    });
    if (!bookAuthor) {
      return res.status(404).send('Book-author relationship not found');
    }
    return res.send(bookAuthor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new book-author relationship
router.post('/', async (req, res) => {
  try {
    const bookAuthor = await req.context.models.BookAuthor.create({
      BookID: req.body.BookID,
      AuthorID: req.body.AuthorID,
    });
    return res.status(201).send(bookAuthor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a book-author relationship by BookID and AuthorID
router.delete('/:bookId/:authorId', async (req, res) => {
  try {
    const bookAuthor = await req.context.models.BookAuthor.findOne({
      where: {
        BookID: req.params.bookId,
        AuthorID: req.params.authorId,
      },
    });
    if (!bookAuthor) {
      return res.status(404).send('Book-author relationship not found');
    }
    await bookAuthor.destroy();
    return res.send({ message: 'Book-author relationship deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;