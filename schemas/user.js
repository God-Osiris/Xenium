const { Schema, model } = require("mongoose");
const userSchema = new Schema({
    userId: String,
    username: String,
    achievements: {
        firstMessage: {
            state: {type: Boolean, default: false},
            content: {type: String, default: undefined}
        }
    },
})

module.exports = model("User", userSchema, "achievements")