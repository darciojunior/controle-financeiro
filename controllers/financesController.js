import { StatusCodes } from "http-status-codes";
import Finance from "../models/Finance.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createFinance = async (req, res) => {
  const { financeValue } = req.body;

  let convertToNumber = parseFloat(
    financeValue.replace(/\./g, "").replace(",", ".")
  );

  if (!financeValue) throw new BadRequestError("Verifique campos vazios.");
  if (convertToNumber === 0 || convertToNumber < 0)
    throw new BadRequestError("Valor não pode ser menor ou igual a 0.");
  req.body.createdBy = req.user.userId;
  const finance = await Finance.create(req.body);
  res.status(StatusCodes.CREATED).json({ finance });
};

const getAllFinances = async (req, res) => {
  const { financeType, incomeType, expenseType, financeDate } = req.query;

  const queryObject = { createdBy: req.user.userId };

  if (financeType !== "Mostrar todos") queryObject.financeType = financeType;
  if (incomeType !== "Mostrar todos") queryObject.incomeType = incomeType;
  if (expenseType !== "Mostrar todos") queryObject.expenseType = expenseType;
  if (financeDate !== "") queryObject.financeDate = financeDate;

  let result = Finance.find(queryObject);

  const limit = Number(req.query.limit) || 15;
  const finances = await result;

  const totalFinances = await Finance.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalFinances / limit);

  res.status(StatusCodes.OK).json({ finances, totalFinances, numOfPages });
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

  await finance.remove();
  res.status(StatusCodes.OK).json({ msg: "Sucesso. Finança removida." });
};

export { createFinance, getAllFinances, updateFinance, deleteFinance };
