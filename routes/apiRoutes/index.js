const express = require('express');
const router = express.Router();

router.use(require('./deptRoutes'));
router.use(require('./rolesRoutes'));

module.exports = router;