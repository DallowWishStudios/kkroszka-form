import React from 'react'
import './Input.css'

export const Input = ({ name, label, type='input', onInputChange }) => {
    // const [inputValue, setInputValue] = useState('')

    const handleInputChange = (e) => {
        // const { value, name } = e.target
        const target = e.target
        // setInputValue(value)
        onInputChange(target)
    }

    return (
        <div className='inputContainer'>
            <label className='bold' htmlFor={name}> {label} </label>
            <input type={type} name={name} id={name} onChange={handleInputChange} />
        </div>
    )
}
