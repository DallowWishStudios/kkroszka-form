import React, { useRef } from 'react'
import { RequiredLabel } from './RequiredLabel'
import './Input.css'

export const Input = ({ name='', label='label', type='input', onInputChange=()=>{}, required=true, reset=false }) => {
    const inputRef = useRef(null)
    if(reset && inputRef.current) inputRef.current.value = ''

    const handleInputChange = (e) => {
        const target = e.target
        onInputChange(target)
    }

    const requiredObj = required ? { required: 'required' } : {}

    return (
        <div className='inputContainer'>
            <label className='bold' htmlFor={name}> {label} <RequiredLabel required={required} /> </label>
            <input ref={inputRef} type={type} name={name} id={name} onChange={handleInputChange} {...requiredObj} />
        </div>
    )
}
