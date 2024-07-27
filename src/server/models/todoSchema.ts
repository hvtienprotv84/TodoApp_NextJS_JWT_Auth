import mongoose, { Document, Model, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  important: boolean;
  date: string;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
}

const todoSchema: Schema<ITodo> = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: String,
    required: true,
  },
  important: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  userName: {
    type: String,
    required: true,
  },
});

todoSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Todo: Model<ITodo> =
  mongoose.models.Todo || mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
