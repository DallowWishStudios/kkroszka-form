import React from 'react'

export const RequiredLabel = ({ required }) => {
    return (
        <>
            { required ? <span className='requiredLabel'> - required</span> : null }
        </>
    )
}
