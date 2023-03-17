import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) return
  
    throw new UnauthenticatedError('Acesso não autorizado.')
};

export default checkPermissions;
