const express = require('express');
const router = express.Router();

const {
  Create,
  find,
  deleteById,
  updateById
} = require('../controllers/Table');

router.route('/:tableName').post(Create).get(find).delete(deleteById).patch(updateById);

module.exports = router;