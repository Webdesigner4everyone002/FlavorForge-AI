import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  value: { type: Number, min: 1, max: 5, required: true },
  createdAt: { type: Date, default: Date.now }
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  instructions: [String],
  prep_time: String,
  difficulty: { type: String, enum: ['easy','medium','hard'], default: 'easy' },
  cuisine_type: String,
  dietary_restrictions: [String],
  saved: { type: Boolean, default: false },
  ratings: [ratingSchema]
}, { timestamps: true });

recipeSchema.virtual('averageRating').get(function() {
  if (!this.ratings.length) return 0;
  const sum = this.ratings.reduce((a, r) => a + r.value, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

export const Recipe = mongoose.model('Recipe', recipeSchema);
