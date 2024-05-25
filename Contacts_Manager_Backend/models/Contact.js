const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: [true, "Contact Name is required"]
        },
        email: {
            type: String,
            required: [true, "Contact Email is required"]
        },
        phone: {
            type: String,
            required: [true, "Contact Phone number is required"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Contact", contactSchema);