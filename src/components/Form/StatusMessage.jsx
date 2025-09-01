// Status Message Component
export const StatusMessage = ({ status }) => {
  if (!status) return null;
  
  return (
    <div className={`p-4 rounded-lg ${
      status.type === 'success' 
        ? 'bg-green-100 text-green-800 border border-green-200' 
        : 'bg-red-100 text-red-800 border border-red-200'
    }`}>
      {status.message}
    </div>
  );
};