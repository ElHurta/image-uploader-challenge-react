import React, { ChangeEvent, useState } from 'react'
import placeholderImg from '../../assets/placeholder-drop-img.svg'
import LoadingBar from './components/LoadingBar'

import './UploadCard.css'

const API_URL = import.meta.env.VITE_API_URL
const API_PORT = import.meta.env.VITE_API_PORT

function UploadCard() {

    const [uploading, setUploading] = useState(false)
    const [uploadedImgId, setUploadedImgId] = useState('')
    const [copyLinkButtonText, setCopyLinkButtonText] = useState('Copy Link')

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

        fetch(`${API_URL}:${API_PORT}/image-upload/`, {
            method: 'POST',
            body: formData,
        }).then(
            res => res.json()
        ).then(
            data => {
                setUploading(false)
                setUploadedImgId(data.body)
            }
        )
        .catch(err => console.log(err))
    }

    const copyLink = () => {
        navigator.clipboard.writeText(`${API_URL}:${API_PORT}/images/${uploadedImgId}`)
        setCopyLinkButtonText('Copied!')
        setTimeout(() => setCopyLinkButtonText('Copy Link'), 1000)
    }

    return (
        <div className="card">
            {
                uploading ? (
                    <LoadingBar />
                ) : (
                    <div className="card-body">
                        {
                            uploadedImgId ? (
                                <div>
                                    <span className="material-symbols-outlined">check_circle</span>
                                    <h3 style={{marginTop: 0}}>Uploaded Succesfully!</h3>
                                    <img className='uploaded-img' src={`${API_URL}:${API_PORT}/images/${uploadedImgId}`} alt="" />
                                    <div className='img-link-container'>
                                        <p>{`${API_URL}:${API_PORT}/images/${uploadedImgId}`}</p>
                                        <button
                                            onClick={copyLink}
                                            className='btn btn-primary'>
                                                {copyLinkButtonText}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h3 className="card-title">Upload your image</h3>
                                    <p className="card-text">File should be Jpeg, Png,...</p>
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
                                </>
                            )
                        }
                </div>
            )}
        </div>
    )
}

export default UploadCard