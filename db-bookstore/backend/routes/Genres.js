import express from 'express';
const router = express.Router();

// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await req.context.models.Genre.findAll();
    return res.send(genres);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a genre by ID
router.get('/:genreId', async (req, res) => {
  try {
    const genre = await req.context.models.Genre.findByPk(req.params.genreId);
    if (!genre) {
      return res.status(404).send('Genre not found');
    }
    return res.send(genre);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new genre
router.post('/', async (req, res) => {
  try {
    const genre = await req.context.models.Genre.create({
      GenreName: req.body.GenreName,
    });
    return res.status(201).send(genre);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a genre by ID
router.put('/:genreId', async (req, res) => {
  try {
    const genre = await req.context.models.Genre.findByPk(req.params.genreId);
    if (!genre) {
      return res.status(404).send('Genre not found');
    }
    await genre.update({
      GenreName: req.body.GenreName,
    });
    return res.send(genre);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a genre by ID
router.delete('/:genreId', async (req, res) => {
  try {
    const genre = await req.context.models.Genre.findByPk(req.params.genreId);
    if (!genre) {
      return res.status(404).send('Genre not found');
    }
    await genre.destroy();
    return res.send({ message: 'Genre deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;