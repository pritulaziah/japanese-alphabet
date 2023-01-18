import mongoose, { model, Schema, Model } from "mongoose";
import { IWord } from "types/word";

const WordSchema: Schema<IWord> = new Schema({
  _id: { type: String },
  japanese: { type: String, index: true },
  meaning: { type: String },
  romaji: { type: String, default: "" },
});

const WordsModel: Model<IWord> =
  mongoose.models?.Words || model("Words", WordSchema, "words");

export default WordsModel;
