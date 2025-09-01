import { X } from "lucide-react";

const ActivityItem = ({ activity, index, onRemove }) => (
  <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            {activity.category}
          </span>
          <h4 className="font-medium text-gray-900">{activity.name}</h4>
        </div>
        {activity.description && (
          <p className="text-gray-600 text-sm">{activity.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);


export const ActivitiesList = ({ activities, onRemove }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-medium text-gray-800">Today's Activities</h3>
    <div className="space-y-3">
      {activities.map((activity, index) => (
        <ActivityItem
          key={index}
          activity={activity}
          index={index}
          onRemove={onRemove}
        />
      ))}
    </div>
  </div>
);