import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const RenderProtectedRoute = ({
  condition,
  renderPage,
  fallback,
  errorMessage,
  devMode = false,
}) => {

  const checkFailed = () => {
    if (!condition) {
      toast.error(errorMessage);
      return <Navigate to={fallback} replace/>;
    }
  };
  return <div>{devMode ? renderPage : condition ? renderPage : checkFailed()}</div>;
};

export default RenderProtectedRoute;