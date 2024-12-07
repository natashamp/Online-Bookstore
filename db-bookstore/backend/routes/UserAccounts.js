import express from 'express';
const router = express.Router();

// Get all user accounts
router.get('/', async (req, res) => {
  try {
    const userAccounts = await req.context.models.UserAccount.findAll();
    return res.send(userAccounts);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a user account by ID
router.get('/:accountId', async (req, res) => {
  try {
    const userAccount = await req.context.models.UserAccount.findByPk(req.params.accountId);
    if (!userAccount) {
      return res.status(404).send('User account not found');
    }
    return res.send(userAccount);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new user account
router.post('/', async (req, res) => {
  try {
    const userAccount = await req.context.models.UserAccount.create({
      UserID: req.body.UserID,
      Username: req.body.Username,
      Password: req.body.Password,
      AccountStatus: req.body.AccountStatus || 'Active',
      LastLogin: req.body.LastLogin || null,
    });
    return res.status(201).send(userAccount);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a user account by ID
router.put('/:accountId', async (req, res) => {
  try {
    const userAccount = await req.context.models.UserAccount.findByPk(req.params.accountId);
    if (!userAccount) {
      return res.status(404).send('User account not found');
    }
    await userAccount.update({
      UserID: req.body.UserID,
      Username: req.body.Username,
      Password: req.body.Password,
      AccountStatus: req.body.AccountStatus,
      LastLogin: req.body.LastLogin,
    });
    return res.send(userAccount);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a user account by ID
router.delete('/:accountId', async (req, res) => {
  try {
    const userAccount = await req.context.models.UserAccount.findByPk(req.params.accountId);
    if (!userAccount) {
      return res.status(404).send('User account not found');
    }
    await userAccount.destroy();
    return res.send({ message: 'User account deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;