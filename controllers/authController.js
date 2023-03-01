import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError("Verifique campos vazios.");
  if (name.length < 3) throw new BadRequestError("Nome é muito curto.");
  if (name.length > 30) throw new BadRequestError("Nome não pode ter mais que 30 caracteres.");
  if (password.length < 6) throw new BadRequestError("Senha é muito curta.");

  const emailAlreadyUsed = await User.findOne({ email });
  if (emailAlreadyUsed) throw new BadRequestError("E-mail já está em uso.");

  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Verifique campos vazios.");

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new UnauthenticatedError("Usuário ou senha incorretos.");

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect)
    throw new UnauthenticatedError("Usuário ou senha incorretos.");

  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!name || !email) throw new BadRequestError("Verifique campos vazios.");
  if (name.length < 3) throw new BadRequestError("Nome é muito curto.");
  if (name.length > 30) throw new BadRequestError("Nome não pode ter mais que 30 caracteres.");

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user, token });
};

export { register, login, updateUser };
