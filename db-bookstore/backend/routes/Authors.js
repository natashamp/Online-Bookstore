import express from 'express';
const router = express.Router();

// Get all authors
router.get('/', async (req, res) => {
  try {
    const authors = await req.context.models.Author.findAll();
    return res.send(authors);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get an author by ID
router.get('/:authorId', async (req, res) => {
  try {
    const author = await req.context.models.Author.findByPk(req.params.authorId);
    if (!author) {
      return res.status(404).send('Author not found');
    }
    return res.send(author);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new author
router.post('/', async (req, res) => {
  try {
    const author = await req.context.models.Author.create({
      Name: req.body.Name,
    });
    return res.status(201).send(author);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update an author by ID
router.put('/:authorId', async (req, res) => {
  try {
    const author = await req.context.models.Author.findByPk(req.params.authorId);
    if (!author) {
      return res.status(404).send('Author not found');
    }
    await author.update({
      Name: req.body.Name,
    });
    return res.send(author);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete an author by ID
router.delete('/:authorId', async (req, res) => {
  try {
    const author = await req.context.models.Author.findByPk(req.params.authorId);
    if (!author) {
      return res.status(404).send('Author not found');
    }
    await author.destroy();
    return res.send({ message: 'Author deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;