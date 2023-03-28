import express from "express";
const router = express.Router();

import {
  createFinance,
  getAllFinances,
  updateFinance,
  deleteFinance,
} from "../controllers/financesController.js";
import testUser from "../middleware/testUser.js";

router.route("/").post(testUser, createFinance).get(getAllFinances);
router
  .route("/:id")
  .delete(testUser, deleteFinance)
  .patch(testUser, updateFinance);

export default router;
