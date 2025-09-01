export const DebugPanel = ({ formData }) => (
  <details className="mt-8 p-4 bg-gray-100 rounded-lg">
    <summary className="cursor-pointer font-medium text-gray-700 mb-2">
      View JSON Output (for debugging)
    </summary>
    <pre className="text-xs bg-white p-3 rounded border overflow-auto">
      {JSON.stringify(formData, null, 2)}
    </pre>
  </details>
);