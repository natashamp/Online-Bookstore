import express from 'express';
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await req.context.models.User.findAll();
    return res.send(users);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await req.context.models.User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address,
      TotalSpent: req.body.TotalSpent,
      PermissionType: req.body.PermissionType || 'User',
    });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.update({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address,
      TotalSpent: req.body.TotalSpent,
      PermissionType: req.body.PermissionType,
    });
    return res.send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const user = await req.context.models.User.findByPk(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    return res.send({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;