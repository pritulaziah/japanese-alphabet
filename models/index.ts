import mongoose, { model, Model, Schema } from "mongoose";
import { IWord } from "types/word";

const WordSchema: Schema = new Schema({
  _id: {
    type: String,
  },
  japanese: {
    type: String,
  },
  meaning: {
    type: String,
  },
});

export const Words: Model<IWord> =
  mongoose.models.Words || model("Words", WordSchema);
