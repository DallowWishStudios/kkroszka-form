import React from 'react'
import Webcam from 'react-record-webcam'
import './InputCam.css'

const statusMessages = {
  INIT: "Starting camera ...",
  PREVIEW: "Preview",
  ERROR: "Error occured while opening camera"
}

export const InputCam = ({ label, onCameraRecord, reset=false }) => {

    const handleStatus = (status) => {
        if(status === statusMessages.PREVIEW){
          const videoBlob = window.videoBlob
          console.log('window.videoBlob', videoBlob);
          onCameraRecord(videoBlob)
        }
    };

    return (
        <div className='InputCam'>
            <label className='bold'> {label} </label>
 
            <Webcam
                getStatus={handleStatus}
                recordingLength={10}
                statusMessages={{
                    INIT: statusMessages.INIT,
                    PREVIEW: statusMessages.PREVIEW,
                    ERROR: statusMessages.ERROR,
                    // CLOSED: "Camera is closed ❌",
                    // OPEN: "Camera is open 🎥",
                    // RECORDING: "Recording ... ⏺",
                }}

                options={{
                    type: 'video'
                }}

                render={(props) => {
                    return (
                      <div className="webcam__render-wrapper">
                        <h2 className="webcam__render-status">{props.status}</h2>
                        <div className="webcam__render-action-wrapper">
                          <button
                            className="webcam__render-action-button"
                            disabled={props.isWebcamOn || props.isPreview}
                            onClick={props.openCamera}
                            type='button'
                            >
                            Open camera
                          </button>
                          <button
                            className="webcam__render-action-button"
                            disabled={!props.isWebcamOn}
                            onClick={props.closeCamera}
                            type='button'
                          >
                            Close camera
                          </button>
                          <button
                            className="webcam__render-action-button"
                            disabled={!props.isPreview}
                            onClick={props.retake}
                            type='button'
                          >
                            Retake
                          </button>
                          <button
                            className="webcam__render-action-button"
                            disabled={
                              !props.isWebcamOn || props.isRecording || props.isPreview
                            }
                            onClick={props.start}
                            type='button'
                          >
                            Start recording
                          </button>
                          <button
                            className="webcam__render-action-button"
                            disabled={!props.isRecording}
                            onClick={props.stop}
                            type='button'
                          >
                            Stop recording
                          </button>
                          <button
                            className="webcam__render-action-button"
                            disabled={!props.isPreview}
                            onClick={props.download}
                            type='button'
                          >
                            Download
                          </button>
                        </div>
                      </div>
                    );
                }}
            />
        </div>
    )
}
