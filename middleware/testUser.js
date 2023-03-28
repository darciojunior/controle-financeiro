import { BadRequestError } from "../errors/index.js";

const testUser = (req, res, next) => {
  if (req.user.testUser)
    throw new BadRequestError("Usuário teste, não autorizado à modificar!");
  next();
};

export default testUser