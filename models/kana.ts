import mongoose, { model, Schema, Model } from "mongoose";
import { AlphabetCharacter, AlphabetTypes } from "types/alphabet";

const KanaSchema: Schema<AlphabetCharacter> = new Schema({
  _id: { type: String },
  ru: { type: String },
  romaji: { type: String },
  type: { type: String, enum: AlphabetTypes },
  hiragana: { type: String },
  katakana: { type: String },
});

const KanaModel: Model<AlphabetCharacter> =
  mongoose.models?.Kana || model("Kana", KanaSchema, "kana");

export default KanaModel;
