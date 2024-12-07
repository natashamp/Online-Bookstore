import express from 'express';
const router = express.Router();

// Get all vendor orders
router.get('/', async (req, res) => {
  try {
    const vendorOrders = await req.context.models.VendorOrder.findAll();
    return res.send(vendorOrders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a vendor order by ID
router.get('/:vendorOrderId', async (req, res) => {
  try {
    const vendorOrder = await req.context.models.VendorOrder.findByPk(req.params.vendorOrderId);
    if (!vendorOrder) {
      return res.status(404).send('Vendor order not found');
    }
    return res.send(vendorOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new vendor order
router.post('/', async (req, res) => {
  try {
    const vendorOrder = await req.context.models.VendorOrder.create({
      VendorID: req.body.VendorID,
      BookID: req.body.BookID,
      OrderDate: req.body.OrderDate || new Date(),
      Quantity: req.body.Quantity,
      TotalCost: req.body.TotalCost,
      DeliveryDate: req.body.DeliveryDate || null,
      OrderStatus: req.body.OrderStatus || 'Pending',
    });
    return res.status(201).send(vendorOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a vendor order by ID
router.put('/:vendorOrderId', async (req, res) => {
  try {
    const vendorOrder = await req.context.models.VendorOrder.findByPk(req.params.vendorOrderId);
    if (!vendorOrder) {
      return res.status(404).send('Vendor order not found');
    }
    await vendorOrder.update({
      VendorID: req.body.VendorID,
      BookID: req.body.BookID,
      OrderDate: req.body.OrderDate,
      Quantity: req.body.Quantity,
      TotalCost: req.body.TotalCost,
      DeliveryDate: req.body.DeliveryDate,
      OrderStatus: req.body.OrderStatus,
    });
    return res.send(vendorOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a vendor order by ID
router.delete('/:vendorOrderId', async (req, res) => {
  try {
    const vendorOrder = await req.context.models.VendorOrder.findByPk(req.params.vendorOrderId);
    if (!vendorOrder) {
      return res.status(404).send('Vendor order not found');
    }
    await vendorOrder.destroy();
    return res.send({ message: 'Vendor order deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;