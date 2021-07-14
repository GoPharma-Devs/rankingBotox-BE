const express = require('express');
const router = express.Router();

const playersCtrl = require('../controllers/players.controller');
const authJwt = require('../utils/middlewares/authToken');

router.get('/', playersCtrl.getPlayers);
router.get('/:playerId', [authJwt.verifyToken, authJwt.isUser], playersCtrl.getPlayer);
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], playersCtrl.createPlayer);
router.put('/:playerId', [authJwt.verifyToken, authJwt.isAdmin], playersCtrl.updatePlayer);
router.delete('/:playerId', [authJwt.verifyToken, authJwt.isAdmin], playersCtrl.deletePlayer);

module.exports = router;
