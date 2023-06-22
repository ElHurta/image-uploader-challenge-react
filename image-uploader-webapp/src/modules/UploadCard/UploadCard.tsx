import React, { useState } from 'react'
import placeholderImg from '../../assets/placeholder-drop-img.svg'

import './UploadCard.css'

function UploadCard() {

    const [file, setFile] = useState<File | null>(null)

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files[0]
        console.log(file)
        setFile(file)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text/plain', 'anything')
    }

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Upload your image</h3>
                <p className="card-text">File should be Jpeg, Png,...</p>
                {/* Here goes the drop space for image */}
                <div className='image-drop-container' onDrop={handleDrop} onDragOver={handleDragOver}>
                    <img src={placeholderImg} alt="Placeholder Image" />
                    <p className='image-drop-text'>Drag & Drop your image here</p>
                </div>
                <p className='card-text'>Or</p>
                <button type="button" className="btn btn-primary">Choose a file</button>
            </div>
        </div>
    )
}

export default UploadCard