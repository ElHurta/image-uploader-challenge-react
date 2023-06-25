import React, { useState } from 'react'
import placeholderImg from '../../assets/placeholder-drop-img.svg'

import './UploadCard.css'

function UploadCard() {

    const [file, setFile] = useState<File | null>(null)

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const uploadedFile = e.dataTransfer.files[0]
        console.log(uploadedFile)
        setFile(uploadedFile)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Upload your image</h3>
                <p className="card-text">File should be Jpeg, Png,...</p>
                {/* Here goes the drop space for image */}
                <div className='image-drop-container'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}>
                    <img src={placeholderImg} alt="Placeholder Image" />
                    <p className='image-drop-text'>Drag & Drop your image here</p>
                </div>
                <p className='card-text'>Or</p>
                <button
                    className="btn btn-primary"
                    onClick={() => document.getElementById('file_input')?.click()}
                    >
                    Choose a file
                </button>
                <input
                    type="file"
                    id='file_input'
                    accept='image/*'
                    
                    hidden
                    />

                {
                    file && (
                        <div className='file-info'>
                            <p>{file.name}</p>
                            <p>{file.size}</p>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default UploadCard