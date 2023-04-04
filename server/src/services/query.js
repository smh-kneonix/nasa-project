function getPagination(query) {
  //http://localhost:8000/v1/launches?limit=50&page=1
  const page = Math.abs(query.page) || 1;
  const limit = Math.abs(query.limit) || 0;
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
}

module.exports = {
  getPagination,
};
