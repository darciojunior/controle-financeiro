const FormRowSelect = ({ labelText, name, value, handleChange, list, disabled }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className='form-label'>{labelText}</label>
            <select name={name} value={value} onChange={handleChange} className='form-select' disabled={disabled}>
                {list.map((itemValue, index) => {
                    return <option key={index} value={itemValue}>{itemValue}</option>
                })}
            </select>
        </div>
    )
}
export default FormRowSelect