import React, { useState, useEffect } from 'react'
import { Input } from './Input'
import { InputCam } from './InputCam'
import { RequiredLabel } from './RequiredLabel'
import './Form.css'

const videoSources = {
    CAMERA: 'camera',
    FILE: 'file'
}
// const backendUrl = 'http://localhost:3003/forms'
const backendUrl = 'https://kkroszka-form.herokuapp.com/forms'

export const Form = () => {
    const [formData, setFormData] = useState({
        firstName: {},
        lastName: {},
        age: {},
        file1: {},
        file2: {},
        video: {},
    })
    const [shouldBeVideoFilled, setShouldBeVideoFilled] = useState(false)
    const [videoSource, setVideoSource] = useState(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submitState, setSubmitState] = useState({})

    const getFormData = () => {
        const formDataToSend = new FormData()

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                const inputProps = formData[key];

                if(inputProps.value){
                    formDataToSend.append(key, inputProps.value)
                } else if(key === 'video') {
                    setShouldBeVideoFilled(true)
                    return null
                }
            }
        }

        return formDataToSend
    }

    const sendFormData = (formDataToSend) => {

        fetch(backendUrl, {
            method: 'post',
            body: formDataToSend
        }).then(async res => {
            console.log(res);
            const data = await res.json()
            console.log(data);
            if(res.ok){
                setSubmitState({
                    submitted: 'Form submitted!'
                })
            } else {
                setSubmitState({
                    error: data.msg
                })
                setIsSubmitted(false)
            }
        })
        .catch(err => {
            console.log(err);
            
            setSubmitState({
                error: err && err.message ? err.message : 'unknown'
            })
            setIsSubmitted(false)
        })
    }

    const trySendFormData = () => {
        if(isSubmitted){
            const data = getFormData()
            if(data) 
                sendFormData(data)
            else 
                setIsSubmitted(false) 
        }
    }

    useEffect(trySendFormData, [isSubmitted])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!shouldBeVideoFilled) setIsSubmitted(true)
    }

    const setInputData = (target) => {
        const { value, name, files } = target
        const file = files ? files[0] : null
        const newFormData = {
            type: file ? 'file' : 'text',
            value: file || value
        }
        setFormData({ ...formData, [name]: newFormData })
        
        if(name === 'video'){
            setVideoSource(videoSources.FILE)
            setShouldBeVideoFilled(false)
        }
    }

    const onInputChange = (target) => {
        setInputData(target)
    }

    const onCameraRecord = (videoBlob) => {
        const newFormData = {
            type: 'file',
            value: videoBlob
        }
        setFormData({ ...formData, video: newFormData })
        setVideoSource(videoSources.CAMERA)
        setShouldBeVideoFilled(false)
    }

    const handleRemoveVideo = () => {
        setFormData({ ...formData, video: {} })
        setVideoSource(null)
        setShouldBeVideoFilled(false)
    }

    console.log({submitState});

    return (
        <div className='formContainer'>
            <form onSubmit={ handleSubmit }>
                <div className={`overlay ${ isSubmitted ? 'active' : '' }`}></div>
                <Input name='firstName' label='first name' onInputChange={onInputChange} />
                <Input name='lastName' label='last name' onInputChange={onInputChange}/>
                <Input name='age' label='age' type='number' onInputChange={onInputChange} />
                <Input type='file' name='file1' label='file1' onInputChange={onInputChange} />
                <Input type='file' name='file2' label='file2' required={false} onInputChange={onInputChange} />
                <div className='videoInput inputContainer'>
                    <label className='bold'>Record or upload a video <RequiredLabel required={true} /></label>
                    <div className={(() => {
                        const classes = `content ${ shouldBeVideoFilled ? 'shouldBeFilled' : '' }`
                        return classes
                    })()}>
                        { videoSource === videoSources.FILE
                            ? null
                            : <InputCam name='video' label='camera' onCameraRecord={onCameraRecord} reset={ videoSource ? false : true } /> 
                        }
                        { videoSource ? null : <span className='videoOr'> OR </span> }
                        { videoSource === videoSources.CAMERA 
                            ? null
                            : <Input type='file' name='video' label='video' onInputChange={onInputChange} required={false} reset={ videoSource ? false : true } /> 
                        }
                        { videoSource ? <button type='button' onClick={handleRemoveVideo}>Remove video</button> : null }
                    </div>
                </div>
                <button className='submitBtn' type="submit">Submit</button>
            </form>
            <div className="submitMsg">
                { submitState.submitted || (submitState.error ? <span className='error'><span className="bold">Submiting error: </span> {submitState.error} </span> : null) || null }
            </div>
        </div>
    )
}
