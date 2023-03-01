import express from "express";
const router = express.Router();

import {
  createFinance,
  getAllFinances,
  updateFinance,
  deleteFinance,
  showStats,
} from "../controllers/financesController.js";

router.route("/").post(createFinance).get(getAllFinances);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteFinance).patch(updateFinance);

export default router;
