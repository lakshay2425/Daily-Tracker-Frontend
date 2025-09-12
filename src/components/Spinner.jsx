export const LoadingSpinner = ({message="Loading"}) => (
  <div className="flex items-center justify-center gap-2">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
   {message}
  </div>
);