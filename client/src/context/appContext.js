import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_FINANCE_BEGIN,
  CREATE_FINANCE_SUCCESS,
  CREATE_FINANCE_ERROR,
  GET_FINANCES_BEGIN,
  GET_FINANCES_SUCCESS,
  SET_EDIT_FINANCE,
  DELETE_FINANCE_BEGIN,
  DELETE_FINANCE_ERROR,
  EDIT_FINANCE_BEGIN,
  EDIT_FINANCE_SUCCESS,
  EDIT_FINANCE_ERROR,
  CLEAR_FILTERS,
  SET_PAGE,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
} from "./actions";
import reducer from "./reducer";

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
  isLoading: false,
  userLoading: true,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  showSidebar: false,
  isEditing: false,
  editFinanceId: "",
  financeType: "Receita",
  incomeTypeOptions: [
    "Salário",
    "13º salário",
    "Férias",
    "Investimentos",
    "Outros",
  ],
  incomeType: "Salário",
  expenseTypeOptions: [
    "Alimentação",
    "Contas",
    "Habitação",
    "Lazer",
    "Saúde",
    "Transporte",
    "Outros",
  ],
  expenseType: "Outros",
  description: "",
  financeValue: "",
  financeDate: formatDate(new Date()),
  finances: [],
  totalFinances: 0,
  numOfPages: 1,
  page: 1,
  searchFinanceType: "Mostrar todos",
  searchIncomeType: "Mostrar todos",
  searchExpenseType: "Mostrar todos",
  searchFinanceDate: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //interceptors
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) logoutUser();
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, alertText },
      });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { user } = data;
      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createFinance = async () => {
    dispatch({ type: CREATE_FINANCE_BEGIN });
    try {
      const {
        financeType,
        incomeType,
        expenseType,
        description,
        financeValue,
        financeDate,
      } = state;
      await authFetch.post("/finances", {
        financeType,
        incomeType,
        expenseType,
        description,
        financeValue,
        financeDate,
      });
      getFinances()
      dispatch({ type: CREATE_FINANCE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: CREATE_FINANCE_ERROR,
          payload: { msg: error.response.data },
        });
      }
    }
    clearAlert();
  };

  const getFinances = async () => {
    const {
      searchFinanceType,
      searchIncomeType,
      searchExpenseType,
      searchFinanceDate,
    } = state;
    let url = `/finances?financeType=${searchFinanceType}&incomeType=${searchIncomeType}&expenseType=${searchExpenseType}&financeDate=${searchFinanceDate}`;
    dispatch({ type: GET_FINANCES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { finances, totalFinances, numOfPages } = data;
      dispatch({
        type: GET_FINANCES_SUCCESS,
        payload: { finances, totalFinances, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditFinance = (id) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch({ type: SET_EDIT_FINANCE, payload: { id } });
  };

  const editFinance = async () => {
    dispatch({ type: EDIT_FINANCE_BEGIN });
    try {
      const {
        financeType,
        incomeType,
        expenseType,
        financeValue,
        financeDate,
        description,
      } = state;
      if (financeType === "Receita") {
        await authFetch.patch(`/finances/${state.editFinanceId}`, {
          financeType,
          incomeType,
          financeValue,
          financeDate,
          description,
        });
      } else {
        await authFetch.patch(`/finances/${state.editFinanceId}`, {
          financeType,
          expenseType,
          financeValue,
          financeDate,
          description,
        });
      }
      getFinances()
      dispatch({ type: EDIT_FINANCE_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_FINANCE_ERROR,
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const DeleteFinance = async (id) => {
    dispatch({ type: DELETE_FINANCE_BEGIN });
    try {
      await authFetch.delete(`/finances/${id}`);
      getFinances();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_FINANCE_ERROR,
        payload: { msg: error.response.data },
      });
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const setPage = (pageNumber) => {
    dispatch({ type: SET_PAGE, payload: { pageNumber } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user } = data;
      dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createFinance,
        getFinances,
        setEditFinance,
        editFinance,
        DeleteFinance,
        clearFilters,
        setPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
