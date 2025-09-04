import toast from "react-hot-toast";

const RenderProtectedRoute = ({
  condition,
  renderPage,
  fallback,
  errorMessage,
  devMode = false,
}) => {
    console.log("Protected Route Condition:", condition);

  const checkFailed = () => {
    if (!condition) {
      toast.error(errorMessage);
      return <Navigate to={fallback} />;
    }
  };
  // console.log(condition, "Condition")
  return <div>{devMode ? renderPage : condition ? renderPage : checkFailed()}</div>;
};

export default RenderProtectedRoute;