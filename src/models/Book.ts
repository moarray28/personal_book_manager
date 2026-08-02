import mongoose, { Document, Model, Schema } from "mongoose";

export type BookStatus = "WANT_TO_READ" | "READING" | "COMPLETED";

export interface IBook extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<IBook>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    tags: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["WANT_TO_READ", "READING", "COMPLETED"],
      default: "WANT_TO_READ",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> =
  mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);

export default Book;