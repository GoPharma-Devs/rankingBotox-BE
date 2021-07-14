const Player = require('../models/player');

// Access leaderboard
exports.getPlayers = async (req, res) => {
    const players = await Player.find();
    res.json(players);
};

// Check specific player
exports.getPlayer = async (req, res) => {
    const player = await Player.findById(req.params.playerId);
    res.status(200).json(player);
};

// Create players
exports.createPlayer = async (req, res) => {
    const { username, score } = req.body;
    const newPlayer = new Player({ username, score });
    const playerSaved = await newPlayer.save()
    res.status(201).json(playerSaved);
}

// Update player info and score
exports.updatePlayer = async (req, res) => {
    const updatePlayer = await Player.findByIdAndUpdate(req.params.playerId, req.body, {
        new: true,
    });
    res.status(200).json(updatePlayer);
};

// Delete player
exports.deletePlayer = async (req, res) => {
    await Player.findByIdAndDelete(req.params.playerId);
    res.status(204).json();
};
