import React from 'react'
import InputLabel from './InputLabel'

const InputVideo = ({ handleData, fileName, handleDelete, ...props }) => {
  return (
    <div className='w-full relative'>
      <InputLabel value="Video Perumahan" />
      <input type='file' accept='video/*' onChange={handleData} className='file-input border border-base-content w-full file-input-md' {...props}/>
    </div>
  )
}

export default InputVideo