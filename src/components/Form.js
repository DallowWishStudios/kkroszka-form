import React, { useState } from 'react'
import { Input } from './Input'
import { InputCam } from './InputCam'
import './Form.css'

const mbSize = 1048576
const readFile = (name, file) => {
    // Check if the file is an image.
    if (file.type && file.type.indexOf('image') === -1) {
      console.log('File is not an image.', file.type, file);
    }

    const formData = new FormData()

    formData.append(name, file)
}

export const Form = () => {
    const [inputs, setInputs] = useState({
        firstName: {},
        lastName: {},
        age: {},
        file1: {},
        file2: {},
        video: {},
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        for (const key in inputs) {
            if (inputs.hasOwnProperty(key)) {
                const inputProps = inputs[key];
                console.log(key, inputProps);

                if(inputProps.value){
                    formData.append(key, inputProps.value)
                }
            }
        }
    }

    const onInputChange = (target) => {
        const { value, name, files } = target
        const file = files ? files[0] : null
        const newInputData = {
            type: file ? 'file' : 'text',
            value: file || value
        }
        setInputs({ ...inputs, [name]: newInputData })
    }

    const onCameraRecord = (videoBlob) => {
        const newInputData = {
            type: 'file',
            value: videoBlob
        }
        setInputs({ ...inputs, video: newInputData })
    }

    return (
        <div className='formContainer'>
            <form onSubmit={ handleSubmit }>
                <Input name='firstName' label='first name' onInputChange={onInputChange} />
                <Input name='lastName' label='last name' onInputChange={onInputChange}/>
                <Input name='age' label='age' type='number' onInputChange={onInputChange} />
                <Input type='file' name='file1' label='file1' onInputChange={onInputChange} />
                <Input type='file' name='file2' label='file2' onInputChange={onInputChange} />
                <div className="videoInput">
                    <InputCam name='video' label='camera' onCameraRecord={onCameraRecord} />
                    <span className='videoOr'> OR </span> 
                    <Input type='file' name='video' label='video' onInputChange={onInputChange} />
                </div>
                <button className='submitBtn' type="submit">Submit</button>
            </form>
        </div>
    )
}
