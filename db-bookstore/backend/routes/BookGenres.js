import express from 'express';
const router = express.Router();

// Get all book-genre relationships
router.get('/', async (req, res) => {
  try {
    const bookGenres = await req.context.models.BookGenre.findAll();
    return res.send(bookGenres);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a book-genre relationship by BookID and GenreID
router.get('/:bookId/:genreId', async (req, res) => {
  try {
    const bookGenre = await req.context.models.BookGenre.findOne({
      where: {
        BookID: req.params.bookId,
        GenreID: req.params.genreId,
      },
    });
    if (!bookGenre) {
      return res.status(404).send('Book-genre relationship not found');
    }
    return res.send(bookGenre);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new book-genre relationship
router.post('/', async (req, res) => {
  try {
    const bookGenre = await req.context.models.BookGenre.create({
      BookID: req.body.BookID,
      GenreID: req.body.GenreID,
    });
    return res.status(201).send(bookGenre);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a book-genre relationship by BookID and GenreID
router.delete('/:bookId/:genreId', async (req, res) => {
  try {
    const bookGenre = await req.context.models.BookGenre.findOne({
      where: {
        BookID: req.params.bookId,
        GenreID: req.params.genreId,
      },
    });
    if (!bookGenre) {
      return res.status(404).send('Book-genre relationship not found');
    }
    await bookGenre.destroy();
    return res.send({ message: 'Book-genre relationship deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;