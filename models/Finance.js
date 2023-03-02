import mongoose, { Schema } from "mongoose";

//income and expense

const FinanceSchema = new Schema(
  {
    financeType: {
      type: String,
      enum: ["Receita", "Despesa"],
      default: "Receita",
    },
    incomeType: {
      type: String,
      enum: ["Salário", "13º salário", "Férias", "Investimentos", "Outros"],
      default: "Salário",
    },
    expenseType: {
      type: String,
      enum: [
        "Alimentação",
        "Contas",
        "Habitação",
        "Lazer",
        "Saúde",
        "Transporte",
        "Outros",
      ],
      default: "Outros",
    },
    description: {
      type: String,
      maxlength: 100,
    },
    financeValue: {
      type: String,
      required: [true, "Por favor, informe o valor"],
      maxlength: 15,
    },
    financeDate: {
      type: Date,
      required: [true, "Por favor, informe a data relativa a finança"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Por favor, informe o usuário"],
    },
  },
  { timestamps: true }
);

FinanceSchema.pre("save", function () {
  if (this.financeType === "Receita") this.expenseType = '';
  if (this.financeType === "Despesa") this.incomeType = '';
});

export default mongoose.model("Finance", FinanceSchema);
