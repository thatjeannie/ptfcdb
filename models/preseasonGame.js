const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preseasonGameSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    dateLocal: {
        type: Date,
        required: false
    },
    homeTeam: {
        type: String,
        required: true
    },
    awayTeam: {
        type: String,
        required: true
    },
    thornsWinLossDraw: {
        type: String,
        required: true
    },
    finalScore: {
        type: String,
        required: true
    },
    goals: {
        type: Array,
        required: false,
        properties: [{
            team: String,
            player: String,
            minute: String,
            assistedBy: String,
            pk: Boolean
        }]
    },
    infractions: {
        type: Array,
        required: false,
        properties: [{
            team: String,
            player: String,
            minute: String,
            booked: String
        }]
    },
    stadium: {
        type: String,
        required: true
    },
    attendance: {
        type: Number,
        required: true
    },
    referee: {
        type: String,
        required: false
    },
    notes: {
        type: String,
        required: false
    }
}, { timestamps: true });

const PreseasonGame = mongoose.model('PreseasonGame', preseasonGameSchema);
module.exports = PreseasonGame;
