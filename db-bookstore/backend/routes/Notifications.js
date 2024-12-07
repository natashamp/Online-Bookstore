import express from 'express';
const router = express.Router();

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await req.context.models.Notification.findAll();
    return res.send(notifications);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a notification by ID
router.get('/:notificationId', async (req, res) => {
  try {
    const notification = await req.context.models.Notification.findByPk(req.params.notificationId);
    if (!notification) {
      return res.status(404).send('Notification not found');
    }
    return res.send(notification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const notification = await req.context.models.Notification.create({
      UserID: req.body.UserID,
      Message: req.body.Message,
      NotificationDate: req.body.NotificationDate || new Date(),
      NotificationType: req.body.NotificationType || 'SystemAlert',
    });
    return res.status(201).send(notification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a notification by ID
router.put('/:notificationId', async (req, res) => {
  try {
    const notification = await req.context.models.Notification.findByPk(req.params.notificationId);
    if (!notification) {
      return res.status(404).send('Notification not found');
    }
    await notification.update({
      UserID: req.body.UserID,
      Message: req.body.Message,
      NotificationDate: req.body.NotificationDate,
      NotificationType: req.body.NotificationType,
    });
    return res.send(notification);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a notification by ID
router.delete('/:notificationId', async (req, res) => {
  try {
    const notification = await req.context.models.Notification.findByPk(req.params.notificationId);
    if (!notification) {
      return res.status(404).send('Notification not found');
    }
    await notification.destroy();
    return res.send({ message: 'Notification deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;