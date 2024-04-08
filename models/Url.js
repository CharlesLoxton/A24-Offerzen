import mongoose from "mongoose";
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 6 });

const urlSchema = new mongoose.Schema({
      original_url: {
        type: String,
        unique: true,
        required: [true, 'original_url is required.'],
      },
      short_url: {
        type: String,
        unique: true,
        default: () => uid.rnd()
      }
});

export default mongoose.model("Url", urlSchema);