
import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
  query: {
    type: String,
    required: true,
  },
  results: {
    type: Array,
    required: true,
  },
});

class SearchModel {
  private model: mongoose.Model<mongoose.Document, {}>;

  constructor() {
    this.model = mongoose.model('Search', searchSchema);
  }

  public async searchApps(query: string) {
    try {
      const results = await this.model.find({ query: new RegExp(query, 'i') });
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default SearchModel;
