import express from 'express';
const router = express.Router();

// Get all audit logs
router.get('/', async (req, res) => {
  try {
    const auditLogs = await req.context.models.AuditLog.findAll();
    return res.send(auditLogs);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Get an audit log by ID
router.get('/:auditId', async (req, res) => {
  try {
    const auditLog = await req.context.models.AuditLog.findByPk(req.params.auditId);
    if (!auditLog) {
      return res.status(404).send('Audit log not found');
    }
    return res.send(auditLog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Create a new audit log
router.post('/', async (req, res) => {
  try {
    const auditLog = await req.context.models.AuditLog.create({
      UserID: req.body.UserID,
      Action: req.body.Action,
      Timestamp: req.body.Timestamp || new Date(),
      Details: req.body.Details,
    });
    return res.status(201).send(auditLog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Update an audit log by ID
router.put('/:auditId', async (req, res) => {
  try {
    const auditLog = await req.context.models.AuditLog.findByPk(req.params.auditId);
    if (!auditLog) {
      return res.status(404).send('Audit log not found');
    }
    await auditLog.update({
      UserID: req.body.UserID,
      Action: req.body.Action,
      Timestamp: req.body.Timestamp,
      Details: req.body.Details,
    });
    return res.send(auditLog);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Delete an audit log by ID
router.delete('/:auditId', async (req, res) => {
  try {
    const auditLog = await req.context.models.AuditLog.findByPk(req.params.auditId);
    if (!auditLog) {
      return res.status(404).send('Audit log not found');
    }
    await auditLog.destroy();
    return res.send({ message: 'Audit log deleted successfully' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;