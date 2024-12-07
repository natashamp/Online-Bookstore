import express from 'express';
const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await req.context.models.Order.findAll();
    return res.send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get an order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const order = await req.context.models.Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    return res.send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = await req.context.models.Order.create({
      UserID: req.body.UserID,
      OrderDate: req.body.OrderDate || new Date(),
      TotalAmount: req.body.TotalAmount,
      Status: req.body.Status || 'Pending',
    });
    return res.status(201).send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update an order by ID
router.put('/:orderId', async (req, res) => {
  try {
    const order = await req.context.models.Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    await order.update({
      UserID: req.body.UserID,
      OrderDate: req.body.OrderDate,
      TotalAmount: req.body.TotalAmount,
      Status: req.body.Status,
    });
    return res.send(order);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete an order by ID
router.delete('/:orderId', async (req, res) => {
  try {
    const order = await req.context.models.Order.findByPk(req.params.orderId);
    if (!order) {
      return res.status(404).send('Order not found');
    }
    await order.destroy();
    return res.send({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;