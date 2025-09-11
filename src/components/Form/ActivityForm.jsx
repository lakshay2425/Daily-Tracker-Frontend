import { FormInput, FormTextarea, FormSelect } from "./FormFields.jsx";
import { Plus } from "lucide-react";

export const AddActivityForm = ({ newActivity, categories, onChange, onAdd }) => (
  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-200">
    <h3 className="text-lg font-medium text-gray-800 mb-3 sm:mb-4">Add New Activity</h3>
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <FormInput
          label="Activity Name"
          required
          value={newActivity.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="What did you do?"
        />
        <FormSelect
          label="Category"
          required
          options={categories}
          value={newActivity.category}
          onChange={(e) => onChange('category', e.target.value)}
        />
      </div>
      <FormTextarea
        label="Description"
        rows={3}
        value={newActivity.description}
        onChange={(e) => onChange('description', e.target.value)}
        placeholder="Describe what you did in detail..."
      />
      <button
        type="button"
        onClick={onAdd}
        disabled={!newActivity.name.trim() || !newActivity.category}
        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        Add Activity
      </button>
    </div>
  </div>
);