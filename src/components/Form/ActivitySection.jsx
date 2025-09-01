import { AddActivityForm } from "./ActivityForm";
import { Activity } from "lucide-react";
import { ActivitiesList } from "./ActivityItem";
import { SectionHeader } from "./Header";


export const ActivitiesSection = ({ activities, newActivity, categories, onActivityChange, onAddActivity, onRemoveActivity }) => (
  <div className="space-y-6">
    <SectionHeader icon={Activity} title="Activities" iconColor="text-purple-600" />
    
    <AddActivityForm
      newActivity={newActivity}
      categories={categories}
      onChange={onActivityChange}
      onAdd={onAddActivity}
    />
    
    {activities.length > 0 && (
      <ActivitiesList activities={activities} onRemove={onRemoveActivity} />
    )}
  </div>
);