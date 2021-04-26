import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  isAdmin: { type: Boolean, required: true, default: false},
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // Comparing the password coming from the Schema above, with the enteredPassword from the User Controller
  return await bcrypt.compare(enteredPassword, this.password); 
};

// we want this to run before we save to encrypt the password each time
userSchema.pre('save', async function (next) {
  // If the password isn't Modifed which is from  Mongoose, call Next and move on. If not, the salt process runs
  if (!this.isModified('password')) {
    next();
  } 
  const salt = await bcrypt.genSalt(10) // will hash the password and returns a Promise
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;