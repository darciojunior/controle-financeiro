import { StatusCodes } from "http-status-codes";
import Finance from "../models/Finance.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

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
  const { id: financeId } = req.params;
  const finance = await Finance.findOne({ _id: financeId });

  if (!finance) throw new NotFoundError(`No finance with id: ${financeId}`);

  checkPermissions(req.user, finance.createdBy);

  const updateFinance = await Finance.findOneAndUpdate(
    { _id: financeId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updateFinance });
};

const deleteFinance = async (req, res) => {
  const { id: financeId } = req.params;
  const finance = await Finance.findOne({ _id: financeId });

  if (!finance) throw new NotFoundError(`No finance with id: ${financeId}`);

  checkPermissions(req.user, finance.createdBy);

  await finance.remove()
  res.status(StatusCodes.OK).json({ msg: 'Sucesso. Finança removida.' });
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
