import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor, informe seu nome"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Por favor, informe seu email"],
    validate: {
      validator: validator.isEmail,
      message: "Por favor, informe um email válido",
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Por favor, informe sua senha"],
    minlength: 6,
  },
});

export default mongoose.model("User", UserSchema);
