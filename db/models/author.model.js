import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  birthDate: Date,
  books: [
    {
      type: ObjectId,
      ref: 'Book',
    },
  ],
});

const Author = mongoose.model('Author', schema);
export default Author;
