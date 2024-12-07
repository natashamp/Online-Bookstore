import express from 'express';
const router = express.Router();

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await req.context.models.Vendor.findAll();
    return res.send(vendors);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get a vendor by ID
router.get('/:vendorId', async (req, res) => {
  try {
    const vendor = await req.context.models.Vendor.findByPk(req.params.vendorId);
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    return res.send(vendor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new vendor
router.post('/', async (req, res) => {
  try {
    const vendor = await req.context.models.Vendor.create({
      CompanyName: req.body.CompanyName,
      ContactName: req.body.ContactName,
      ContactEmail: req.body.ContactEmail,
      ContactPhone: req.body.ContactPhone,
      Address: req.body.Address,
      SupplyType: req.body.SupplyType,
    });
    return res.status(201).send(vendor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update a vendor by ID
router.put('/:vendorId', async (req, res) => {
  try {
    const vendor = await req.context.models.Vendor.findByPk(req.params.vendorId);
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    await vendor.update({
      CompanyName: req.body.CompanyName,
      ContactName: req.body.ContactName,
      ContactEmail: req.body.ContactEmail,
      ContactPhone: req.body.ContactPhone,
      Address: req.body.Address,
      SupplyType: req.body.SupplyType,
    });
    return res.send(vendor);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete a vendor by ID
router.delete('/:vendorId', async (req, res) => {
  try {
    const vendor = await req.context.models.Vendor.findByPk(req.params.vendorId);
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }
    await vendor.destroy();
    return res.send({ message: 'Vendor deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;