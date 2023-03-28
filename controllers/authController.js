import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookie.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    throw new BadRequestError("Verifique campos vazios.");
  if (name.length < 3) throw new BadRequestError("Nome é muito curto.");
  if (name.length > 30)
    throw new BadRequestError("Nome não pode ter mais que 30 caracteres.");
  if (password.length < 6) throw new BadRequestError("Senha é muito curta.");

  const emailAlreadyUsed = await User.findOne({ email });
  if (emailAlreadyUsed) throw new BadRequestError("E-mail já está em uso.");

  const user = await User.create(req.body);
  const token = user.createJWT();
  attachCookie({ res, token });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email } });
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
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { email, name } = req.body;
  if (!name || !email) throw new BadRequestError("Verifique campos vazios.");
  if (name.length < 3) throw new BadRequestError("Nome é muito curto.");
  if (name.length > 30)
    throw new BadRequestError("Nome não pode ter mais que 30 caracteres.");

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;

  await user.save();
  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

export { register, login, updateUser, getCurrentUser, logout };
