import { initialState } from "./appContext";

const reducer = (state, action) => {
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  if (action.type === "DISPLAY_ALERT") {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Preencha todos os campos.",
    };
  }
  if (action.type === "CLEAR_ALERT") {
    return { ...state, showAlert: false, alertType: "", alertText: "" };
  }
  if (action.type === "SETUP_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "SETUP_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText,
    };
  }
  if (action.type === "SETUP_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "TOGGLE_SIDEBAR") {
    return { ...state, showSidebar: !state.showSidebar };
  }
  if (action.type === "LOGOUT_USER") {
    return { ...initialState, userLoading: false };
  }
  if (action.type === "UPDATE_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "UPDATE_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "Usuário atualizado com sucesso!",
    };
  }
  if (action.type === "UPDATE_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "GET_CURRENT_USER_BEGIN") {
    return {
      ...state,
      userLoading: true,
      showAlert: false,
    };
  }
  if (action.type === "GET_CURRENT_USER_SUCCESS") {
    return {
      ...state,
      userLoading: false,
      user: action.payload.user,
    };
  }
  if (action.type === "HANDLE_CHANGE") {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === "CLEAR_VALUES") {
    const initialState = {
      isEditing: false,
      editFinanceId: "",
      incomeType: "Salário",
      expenseType: "Outros",
      description: "",
      financeValue: "",
      financeDate: formatDate(new Date()),
    };
    return {
      ...state,
      ...initialState,
    };
  }
  if (action.type === "CREATE_FINANCE_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "CREATE_FINANCE_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Finança adicionada com sucesso!",
    };
  }
  if (action.type === "CREATE_FINANCE_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "GET_FINANCES_BEGIN") {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === "GET_FINANCES_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      finances: action.payload.finances,
      totalFinances: action.payload.totalFinances,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === "SET_EDIT_FINANCE") {
    const finance = state.finances.find(
      (finance) => finance._id === action.payload.id
    );
    const {
      _id,
      financeType,
      incomeType,
      expenseType,
      financeValue,
      financeDate,
      description,
    } = finance;

    return {
      ...state,
      isEditing: true,
      editFinanceId: _id,
      financeType,
      incomeType,
      expenseType,
      financeValue,
      financeDate: formatDate(financeDate),
      description,
    };
  }
  if (action.type === "DELETE_FINANCE_BEGIN") {
    return { ...state };
  }
  if (action.type === "DELETE_FINANCE_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "EDIT_FINANCE_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "EDIT_FINANCE_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Finança atualizada com sucesso!",
    };
  }
  if (action.type === "EDIT_FINANCE_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === "CLEAR_FILTERS") {
    return {
      ...state,
      searchFinanceType: "Mostrar todos",
      searchIncomeType: "Mostrar todos",
      searchExpenseType: "Mostrar todos",
      searchFinanceDate: "",
    };
  }
  if (action.type === "SET_PAGE") {
    return {
      ...state,
      page: action.payload.pageNumber,
    };
  }

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
