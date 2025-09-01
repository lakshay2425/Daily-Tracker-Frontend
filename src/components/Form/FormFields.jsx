import { User , CheckSquare} from "lucide-react";
import { SectionHeader } from "./Header.jsx";
import { LoadingSpinner } from "../Spinner.jsx";

// Email Input Component
export const EmailInput = ({ email, onChange }) => (
  <div className="space-y-4">
    <SectionHeader icon={User} title="User Information" iconColor="text-blue-600" />
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Email Address *
      </label>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        placeholder="Enter your email address"
      />
    </div>
  </div>
);

// Individual Checklist Item Component
const ChecklistItem = ({ label, checked, onChange }) => (
  <div
    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
      checked
        ? 'border-green-500 bg-green-50 shadow-md'
        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
    }`}
    onClick={onChange}
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-all duration-200 ${
          checked ? 'border-green-500 bg-green-500' : 'border-gray-300'
        }`}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <span className="font-medium text-gray-800">{label}</span>
    </div>
  </div>
);

// Daily Checklist Component
export const DailyChecklist = ({ checklist, onChange }) => {
  const checklistLabels = {
    wakeUpEarly: 'Wake Up Early',
    workout: 'Workout',
    meditation: 'Meditation',
    reading: 'Reading',
    learning: 'Learning',
    coding: 'Coding'
  };

  return (
    <div className="space-y-4">
      <SectionHeader icon={CheckSquare} title="Daily Checklist" iconColor="text-green-600" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(checklistLabels).map(([key, label]) => (
          <ChecklistItem
            key={key}
            label={label}
            checked={checklist[key]}
            onChange={() => onChange(key)}
          />
        ))}
      </div>
    </div>
  );
};

// Form Input Component
export const FormInput = ({ label, type = "text", required = false, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      {...props}
    />
  </div>
);

// Select Input Component
export const FormSelect = ({ label, options, required = false, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && '*'}
    </label>
    <select
      required={required}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      {...props}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Textarea Component
export const FormTextarea = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
      {...props}
    />
  </div>
);

export const SubmitButton = ({ isSubmitting, disabled, onClick }) => (
  <div className="pt-6 border-t border-gray-200">
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
    >
      {isSubmitting ? <LoadingSpinner /> : 'Create Daily Entry'}
    </button>
  </div>
);

