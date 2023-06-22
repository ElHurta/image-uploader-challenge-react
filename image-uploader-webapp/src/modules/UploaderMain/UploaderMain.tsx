import UploadCard from "../UploadCard/UploadCard"

import './UploaderMain.css'

function UploaderMain() {
    return (
        <section className="uploader-container">
            <div className="card-container">
                <UploadCard />
            </div>
            <footer className="footer">
                <p className="footer-text">
                    created by <strong>
                        <a className="footer-link"  href="https://juan-hurtado-portfolio.netlify.app/" target="_blank">
                            Juan Hurtado
                        </a> 
                    </strong> - devChallenges.io 
                </p>
            </footer>
        </section>
    )
}

export default UploaderMain