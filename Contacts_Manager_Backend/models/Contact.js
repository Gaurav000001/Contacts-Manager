const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Contact Name is required"]
        },
        email: {
            type: String,
            required: [true, "Contact Email is required"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactSchema);