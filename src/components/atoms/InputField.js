import React from 'react'

function InputField({ className="paper", value, name, handleChange,labelName,type,style,disabled,errors

}) {
  return (
    <div className="row ">
    <div className="col m-2">

    {labelName &&  <label for="textInput mb-2" className="lablestyle">
        {labelName}
      </label> }
     
      <input
      name={name}
      disabled={disabled}
        type={type}
        value={value}
        style={style}
        errors={errors}
        onChange={handleChange}
        id="textInput"
        className={`form-control ${className}`}
      />
    </div>
     {errors && (
              <span style={{ color: 'red' }}>{errors[name]}</span>
            )}
    
    </div>
  )
}

export default InputField
