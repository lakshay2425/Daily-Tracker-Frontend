import {Calendar} from 'lucide-react'

export const FormHeader = () => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
    <div className="flex items-center gap-3">
      <Calendar className="w-8 h-8" />
      <div>
        <h1 className="text-3xl font-bold">Daily Activity Tracker</h1>
        <p className="text-blue-100 mt-1">Record your daily achievements and activities</p>
      </div>
    </div>
  </div>
);


export const SectionHeader = ({ icon: Icon, title, iconColor }) => (
  <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
    <Icon className={`w-6 h-6 ${iconColor}`} />
    {title}
  </div>
);