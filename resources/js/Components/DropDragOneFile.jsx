import { router } from '@inertiajs/react';
import React, { useCallback } from 'react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

const DropDragOneFile = ({ className, files, setFiles, name = null }) => {

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles?.length) {
            const newFile = acceptedFiles[0];
            newFile.preview = URL.createObjectURL(newFile);
            if (name !== null) {
                setFiles(name, newFile);
            } else {
                setFiles(newFile);
            }
        }
    }, [])

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        },
        maxFiles: 1,
        multiple: false,
        maxSize: 10485760
    })

    const fileRejectionItems = fileRejections.map(({ file }) => {
        return (
            <li key={file.path}>
                ( {file.path} ) Terlalu Besar
                <br />
                *Max size 10MB
            </li>
        )
    });

    return (
        <div className="w-full h-full">
            <div {...getRootProps({
                className: className
            })}>
                <input {...getInputProps()} />
                {files ? (
                    <img
                        src={files.preview}
                        alt={files.name}
                        onLoad={() => URL.revokeObjectURL(files.preview)}
                        className='w-full h-full object-cover rounded-lg' />
                ) : (
                    <div className='w-full h-full flex-col flex justify-center items-center'>
                        <span>Foto Utama</span>
                        <span className='btn btn-primary btn-sm'>Click</span>
                        <span>or Drag here</span>
                        {fileRejectionItems}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DropDragOneFile