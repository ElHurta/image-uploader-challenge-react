import LinearProgress from '@mui/material/LinearProgress';

import './LoadingBar.css';

function LoadingBar(){
    return(
        <div className="loading-bar">
            <h3>Uploading...</h3>
            <LinearProgress />
        </div>
    )
}

export default LoadingBar;