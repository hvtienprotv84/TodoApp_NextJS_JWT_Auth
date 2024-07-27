import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  securityInfo: string;
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
}

const userSchema: Schema<IUser> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  securityInfo: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  try {
    const token: string = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY as string,
      { expiresIn: "30d" },
    );

    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
      return next(new Error("Password hashing failed"));
    }
  }
  if (this.isModified("securityInfo")) {
    try {
      this.securityInfo = await bcrypt.hash(this.securityInfo, 12);
    } catch (error) {
      return next(new Error("Security info hashing failed"));
    }
  }
  next();
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
