import mongoose from "mongoose";

// Defining Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

// Model
const ContactModel = mongoose.model("contact", contactSchema);

export default ContactModel;
