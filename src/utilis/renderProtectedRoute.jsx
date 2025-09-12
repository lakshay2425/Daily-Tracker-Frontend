import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const RenderProtectedRoute = ({
  condition,
  renderPage,
  fallback,
  errorMessage,
  devMode = false,
}) => {
    if(devMode) return renderPage

    if(condition) return renderPage
  
    if (!condition) {
      toast.error(errorMessage);
      return <Navigate to={fallback} replace/>;
    }
};

export default RenderProtectedRoute;