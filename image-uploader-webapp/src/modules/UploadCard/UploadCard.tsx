import React, { ChangeEvent, useState } from 'react'
import placeholderImg from '../../assets/placeholder-drop-img.svg'

import './UploadCard.css'


function UploadCard() {

    const [uploading, setUploading] = useState(false)

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        uploadImage(e.dataTransfer.files[0])
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          uploadImage(e.target.files[0])
        }
    };

    const uploadImage = (imgToUpload: File) => {
        if (!imgToUpload) return
        setUploading(true)

        const formData = new FormData();
        formData.append('', imgToUpload)

        fetch('http://localhost:3000/image-upload/', {
            method: 'POST',
            body: formData,
        }).then(
            res => res.json()
        )
        .then(() => setUploading(false))
        .catch(err => console.log(err))
    }

    return (
        <div className="card">
            {
                uploading ? (
                    <div className="uploading">
                        <p>Uploading...</p>
                    </div>
                ) : (
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
                        onChange={handleFileChange}
                        hidden
                        />
                </div>
            )}
        </div>
    )
}

export default UploadCard