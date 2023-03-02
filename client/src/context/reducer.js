import { initialState } from "./appContext";

const reducer = (state, action) => {
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
      token: action.payload.token,
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
    return { ...initialState, user: "", token: "" };
  }
  if (action.type === "UPDATE_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "UPDATE_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
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
  if (action.type === "HANDLE_CHANGE") {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === "CLEAR_VALUES") {
    function formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    }

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

  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
