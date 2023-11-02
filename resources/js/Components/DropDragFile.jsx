import { router } from '@inertiajs/react';
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const DropDragFile = ({ className, files, setFiles, name = null }) => {

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            setFiles(previousFiles => [
                ...previousFiles,
                ...acceptedFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) }))
            ])
        }

    }, [])


    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept: {
            'image/*': []
        },
        maxFiles: 5,
    })

    const removeFile = (name) => {
        setFiles(files => files.filter(file => file.name !== name))
    }

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
            <li key={file.path}>
                {file.path} - {file.size} bytes
                <ul>
                    {errors.map(e => <li key={e.code}>{e.message}</li>)}
                </ul>
            </li>
        )
    });



    return (
        <div className='w-full h-full flex flex-col items-center'>
            <div {...getRootProps({
                className: className
            })}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag or <span className='btn btn-primary btn-sm'>Click</span> here</p>
                }
            </div>
            <ul className='flex flex-wrap gap-2 mt-5 w-full h-2/4 overflow-hidden overflow-y-auto p-2 pt-5 pl-3 border rounded-lg border-base-content'>
                {files?.length ? (
                    <>
                        {files.map(file => (
                            <li key={file.name} className='relative w-24 h-20'>
                                <img
                                    src={file.preview}
                                    alt={file.name}
                                    className='w-full h-full object-cover'
                                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                                />
                                <button
                                    type='button'
                                    onClick={() => removeFile(file.name)}
                                    className="bg-red-500 -top-2 -right-1 w-6 h-6 flex justify-center items-center rounded-full text-white absolute border-2 border-white"
                                ><span>X</span></button>
                            </li>
                        ))}
                    </>
                ) : (
                    <div className='w-full h-full flex justify-center items-center'>
                        <span>Preview Image</span>
                    </div>
                )}
            </ul>
        </div>
    )
}
export default DropDragFile