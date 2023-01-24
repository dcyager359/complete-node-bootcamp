class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };

    //remove non search terms from new object
    const nonSearchTerms = ['page', 'sort', 'limit', 'fields'];
    nonSearchTerms.forEach((item) => delete queryObj[item]);
    let queryString = JSON.stringify(queryObj);
    console.log('query string after deleting nonSearchTerms:', queryString);

    //put $ in front of gte,gt,lte,lt to make mongoose search work correctly
    const operatorRegex = /\b(gt|gte|lt|lte|in)\b/g;
    queryString = queryString.replace(operatorRegex, (match) => `$${match}`);
    console.log('query string after regex to fix gte, etc.:', queryString);

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
