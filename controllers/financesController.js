const createFinance = async (req, res) => {
  res.send("create finance");
};
const getAllFinances = async (req, res) => {
  res.send("get all finances");
};
const updateFinance = async (req, res) => {
  res.send("update finance");
};
const deleteFinance = async (req, res) => {
  res.send("delete finance");
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export {
  createFinance,
  getAllFinances,
  updateFinance,
  deleteFinance,
  showStats,
};
