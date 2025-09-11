import {  Activity, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import {   Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const DayDetailPage = ({ date, data, navigateHome }) => {
  const checklistItems = [
    { key: 'workout', label: 'Workout', icon: '💪', color: 'text-red-400' },
    { key: 'meditation', label: 'Meditation', icon: '🧘', color: 'text-purple-400' },
    { key: 'learning', label: 'Learning', icon: '📚', color: 'text-blue-400' },
    { key: 'coding', label: 'Building', icon: '🔨', color: 'text-green-400' },
    { key: 'reading', label: 'Reading', icon: '📖', color: 'text-yellow-400' },
    { key: 'wakeUpEarly', label: 'Woke Up Early', icon: '🌅', color: 'text-cyan-400' }
  ];

  const categoryColors = {
    'Learning': '#3b82f6',
    'Building': '#10b981', 
    'Workout': '#ef4444',
    'Meditation': '#8b5cf6',
    'Reading': '#f59e0b'
  };

  const pieData = data[0]?.activities?.reduce((acc, activity) => {
    const existing = acc.find(item => item.category === activity.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        category: activity.category,
        value: 1,
        color: categoryColors[activity.category] || '#6b7280'
      });
    }
    return acc;
  }, []) || [];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <button
          onClick={navigateHome}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300 mb-3 sm:mb-4"
        >
          <ArrowLeft size={18} sm:size={20} />
          Back to Calendar
        </button>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
          {date[0]?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </h1>
        <p className="text-gray-300">Daily progress and activities</p>
      </div>

      {!data ? (
        <div className="text-center py-12 sm:py-16">
          <div className="text-5xl sm:text-6xl mb-4">📅</div>
          <h2 className="text-xl sm:text-2xl text-white mb-2">No data for this day</h2>
          <p className="text-gray-400">Start tracking your daily activities!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Checklist */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                <CheckCircle className="text-green-400" size={20} sm:size={24} />
                Daily Checklist
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {checklistItems.map(item => (
                  <div
                    key={item.key}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                      data[0].checklist[item.key]
                        ? 'bg-green-500/20 border border-green-400/30'
                        : 'bg-red-500/20 border border-red-400/30'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${item.color}`}>{item.label}</h3>
                    </div>
                    {data[0].checklist[item.key] ? (
                      <CheckCircle className="text-green-400" size={24} />
                    ) : (
                      <XCircle className="text-red-400" size={24} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Activity className="text-blue-400" size={24} />
                Activities
              </h2>
              
              {data[0].activities.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No activities recorded for this day</p>
              ) : (
                <div className="space-y-4">
                  {data[0].activities.map((activity, index) => (
                    <div
                      key={index}
                      className="bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold text-lg">{activity.name}</h3>
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: categoryColors[activity.category] || '#6b7280' }}
                        >
                          {activity.category}
                        </span>
                      </div>
                      <p className="text-gray-300">{activity.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Day Stats */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Day Summary</h2>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    {Object.values(data[0].checklist).filter(Boolean).length}/6
                  </div>
                  <p className="text-gray-300">Goals Completed</p>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {data[0].activities.length}
                  </div>
                  <p className="text-gray-300">Activities Logged</p>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {pieData.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Activity Categories</h2>
                
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
  formatter={(value) => [`${value} Activities`, '']}
  labelFormatter={(label) => `Category ${label}`}
  contentStyle={{
    backgroundColor: 'rgba(17, 24, 39, 0.95)', // darker background
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '8px',
    color: '#fff',  // white text
    padding: '8px 12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }}
  itemStyle={{ color: '#fff' }}  // ensures item text is white
  labelStyle={{ color: '#fff' }} // ensures label text is white
  separator=""
/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-2 mt-4">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-gray-300 text-sm">{item.category}</span>
                      </div>
                      <span className="text-white font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default DayDetailPage