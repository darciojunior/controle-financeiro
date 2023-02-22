const reducer = (state, action) => {
    if(action.type === 'DISPLAY_ALERT'){
        return {...state, showAlert: true, alertType: 'danger', alertText: 'Preencha todos os campos.'}
    }
    if(action.type === 'CLEAR_ALERT'){
        return {...state, showAlert: false, alertType: '', alertText: ''}
    }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;