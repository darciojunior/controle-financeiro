import { StatusCodes } from "http-status-codes";
import Finance from "../models/Finance.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";

const createFinance = async (req, res) => {
  const { financeValue } = req.body;

  if (!financeValue) throw new BadRequestError("Verifique campos vazios.");

  req.body.createdBy = req.user.userId;
  const finance = await Finance.create(req.body);
  res.status(StatusCodes.CREATED).json({ finance });
};

const getAllFinances = async (req, res) => {
  const finances = await Finance.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ finances, totalFinances: finances.length, numOfPages: 1 });
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
