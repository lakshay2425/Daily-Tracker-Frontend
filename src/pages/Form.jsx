import { useState , useContext} from 'react';

import { FormHeader } from '../components/Form/Header';
import { DailyChecklist, EmailInput } from '../components/Form/FormFields';
import { StatusMessage } from '../components/Form/StatusMessage';
import { SubmitButton } from '../components/Form/FormFields';
import { DebugPanel } from '../components/Form/DebugPanel';
import axiosInstance from '../utilis/axiosInstance';
import {ActivitiesSection} from "../components/Form/ActivitySection"
import { AuthContext } from '../context/AuthContext';

// Main Form Component
const DailyEntryForm = () => {
  const {gmail} = useContext(AuthContext);
  // const userGmail = context
  const [formData, setFormData] = useState({
    email: gmail,
    checklist: {
      wakeUpEarly: false,
      workout: false,
      meditation: false,
      reading: false,
      learning: false,
      coding: false
    },
    activities: []
  });

  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    category: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    'Learning', 'Building', 'Writing', 'Reading', 'Exercise', 
    'Meditation', 'Work', 'Personal', 'Social', 'Creative', 'Other'
  ];


  const handleChecklistChange = (field) => {
    setFormData(prev => ({
      ...prev,
      checklist: {
        ...prev.checklist,
        [field]: !prev.checklist[field]
      }
    }));
  };

  const handleNewActivityChange = (field, value) => {
    setNewActivity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addActivity = () => {
    if (newActivity.name.trim() && newActivity.category) {
      setFormData(prev => ({
        ...prev,
        activities: [...prev.activities, { ...newActivity }]
      }));
      setNewActivity({ name: '', description: '', category: '' });
    }
  };

  const removeActivity = (index) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axiosInstance.post('/dailyTracker', formData);
      if (response.status === 201) {
        setSubmitStatus({ type: 'success', message: 'Entry created successfully!' });
        setFormData({
          email: gmail,
          checklist: {
            wakeUpEarly: false,
            workout: false,
            meditation: false,
            reading: false,
            learning: false,
            coding: false
          },
          activities: []
        });
      } else {
        setSubmitStatus({ type: 'error', message: 'Failed to create entry. Please try again.' });
      }
    } catch (error) {
        console.log(error.message, "Error")
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <FormHeader />
          
          <div className="p-8 space-y-8">
            <DailyChecklist 
              checklist={formData.checklist} 
              onChange={handleChecklistChange} 
            />
            
            <ActivitiesSection
              activities={formData.activities}
              newActivity={newActivity}
              categories={categories}
              onActivityChange={handleNewActivityChange}
              onAddActivity={addActivity}
              onRemoveActivity={removeActivity}
            />

            <StatusMessage status={submitStatus} />
            
            <SubmitButton
              isSubmitting={isSubmitting}
              disabled={isSubmitting || !formData.email}
              onClick={handleSubmit}
            />

            <DebugPanel formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyEntryForm;