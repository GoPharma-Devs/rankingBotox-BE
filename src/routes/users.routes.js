const express = require('express');
const router = express.Router();

const usersCtrl = require('../controllers/users.controller');
const authJwt = require('../utils/middlewares/authToken');

router.get('/', [authJwt.verifyToken, authJwt.isUser], usersCtrl.getUsers);
router.get('/:userId', [authJwt.verifyToken, authJwt.isUser], usersCtrl.getUser);
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.updateUser);
router.delete('/:userId', [authJwt.verifyToken, authJwt.isAdmin], usersCtrl.deleteUser);

module.exports = router;
