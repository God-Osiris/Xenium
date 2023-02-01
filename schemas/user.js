const { Schema, model } = require("mongoose");

const stateSchema = new Schema({
    setState: {type: Boolean, default: false}
})

const userSchema = new Schema({
    userId: String,
    username: String,
    achievements: {type: Array, default: [
        {
            name: "The Journey Begins",
            state: stateSchema,
            desc: "Send a message for the first time in Xenolith."
        },
        {
            name: "Newborn Cryptographer",
            state: stateSchema,
            desc: "Use `/encrypt` for the first time."
        },
        {
            name: "NPC Master",
            state: stateSchema,
            desc: "Get access to the Xenium AI."
        }
    ]},
})

module.exports = model("User", userSchema, "achievements")