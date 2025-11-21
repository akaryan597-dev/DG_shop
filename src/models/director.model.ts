import mongoose, { Document, Schema } from "mongoose";

// ✅ Define Director interface
export interface IDirector extends Document {
  name: string;
  movies: string[];
}

// ✅ Schema
const directorSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [{ type: String }]
});

// ✅ Model
const DirectorModel = mongoose.model<IDirector>("Director", directorSchema);

// ✅ Default export (so controller can use `import DirectorModel from ...`)
export default DirectorModel;
