import { CircularProgress } from "@mui/material"

const LoadingComponent = () => {
    return(
        <div className="flex justify-center items-center h-screen w-100">
            <CircularProgress/>
        </div>
    )
}


export default LoadingComponent;