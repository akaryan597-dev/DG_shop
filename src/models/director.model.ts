import { Schema, model } from 'mongoose';

const directorSchema = new Schema({
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
});

export const DirectorModel = model('Director', directorSchema);
