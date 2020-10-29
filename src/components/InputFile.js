import React from 'react'

export const InputFile = ({ name, label }) => {
    return (
        <div className='inputContainer InputFile'>
            <label className='bold' htmlFor={name}> {label} </label>
            <input type='file' name={name} id={name} />
        </div>
    )
}
