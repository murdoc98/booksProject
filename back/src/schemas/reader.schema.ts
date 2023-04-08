import mongoose from 'mongoose';
const { Schema } = mongoose;

const readerSchema = mongoose.model(
  'reader',
  new Schema({
    _id: String,
    books_readed: [
      {
        external_id: String,
        name: String,
        startDate: Date,
        endDate: Date,
        score: { type: Number, min: 1, max: 5 },
        review: String,
        author: String,
        pages: Number,
        year: Number,
        publisher: String
      }
    ],
    books_to_read: [
      {
        external_id: String,
        name: String
      }
    ]
  })
);

export default readerSchema;