const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    userId: String,
    username: String,
    achievements: {type: Array, default: [
        {
            name: "The Journey Begins",
            state: false,
            desc: "Send a message for the first time in Xenolith."
        },
        {
            name: "Newborn Cryptographer",
            state: false,
            desc: "Use `/encrypt` for the first time."
        },
        {
            name: "Puzzle Aficionado",
            state: false,
            desc: "Win a puzzle of the day event.",
            count: 0
        }
    ]},
})

module.exports = model("User", userSchema, "achievements")