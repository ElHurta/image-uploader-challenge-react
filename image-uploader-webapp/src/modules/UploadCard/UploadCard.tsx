import './UploadCard.css'

function UploadCard() {
    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title">Upload your image</h3>
                <p className="card-text">File should be Jpeg, Png,...</p>
                {/* Here goes the drop space for image */}
                
                <p className='card-text'>Or</p>
                <button type="button" className="btn btn-primary">Choose a file</button>
            </div>
        </div>
    )
}

export default UploadCard