import express from 'express';
const router = express.Router();

// Get all order details
router.get('/', async (req, res) => {
  try {
    const orderDetails = await req.context.models.OrderDetail.findAll();
    return res.send(orderDetails);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get an order detail by ID
router.get('/:orderDetailId', async (req, res) => {
  try {
    const orderDetail = await req.context.models.OrderDetail.findByPk(req.params.orderDetailId);
    if (!orderDetail) {
      return res.status(404).send('Order detail not found');
    }
    return res.send(orderDetail);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new order detail
router.post('/', async (req, res) => {
  try {
    const orderDetail = await req.context.models.OrderDetail.create({
      OrderID: req.body.OrderID,
      BookID: req.body.BookID,
      Quantity: req.body.Quantity,
      Subtotal: req.body.Subtotal,
      Discount: req.body.Discount || 0.00,
    });
    return res.status(201).send(orderDetail);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update an order detail by ID
router.put('/:orderDetailId', async (req, res) => {
  try {
    const orderDetail = await req.context.models.OrderDetail.findByPk(req.params.orderDetailId);
    if (!orderDetail) {
      return res.status(404).send('Order detail not found');
    }
    await orderDetail.update({
      OrderID: req.body.OrderID,
      BookID: req.body.BookID,
      Quantity: req.body.Quantity,
      Subtotal: req.body.Subtotal,
      Discount: req.body.Discount,
    });
    return res.send(orderDetail);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete an order detail by ID
router.delete('/:orderDetailId', async (req, res) => {
  try {
    const orderDetail = await req.context.models.OrderDetail.findByPk(req.params.orderDetailId);
    if (!orderDetail) {
      return res.status(404).send('Order detail not found');
    }
    await orderDetail.destroy();
    return res.send({ message: 'Order detail deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;