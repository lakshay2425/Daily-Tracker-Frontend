import  { useState, useEffect } from 'react';
import { Calendar,  Target, TrendingUp } from 'lucide-react';
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DayDetailPage from './DayDetailPage.jsx';
import axiosInstance from '../utilis/axiosInstance.jsx';
import {toast} from 'react-hot-toast'


// Main App Component
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDate, setSelectedDate] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/dailyTracker");
      setData(response.data.list);
    }
    fetchData();
  }, []);

  const navigateToDay = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate > today) {
      toast.error("🔮 This is a future date! You can't view or edit activities that haven't happened yet. Focus on today and make it count!");
      return;
    }
    
    setSelectedDate(date);
    setCurrentView('day');
  };

  const navigateHome = () => {
    setCurrentView('home');
    setSelectedDate(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">      
      <div className="relative z-10">
        {currentView === 'home' ? (
          <HomePage data={data} navigateToDay={navigateToDay} />
        ) : (
          <DayDetailPage 
            date={selectedDate} 
            data={data} 
            navigateHome={navigateHome} 
          />
        )}
      </div>
    </div>
  );
};

// HomePage Component - Improve text sizing and grid layout
const HomePage = ({ data, navigateToDay }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Daily Tracker
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">Track your progress, build better habits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <CalendarView data={data} navigateToDay={navigateToDay} />
          <div className="mt-6 sm:mt-8">
            <ActivityGraph data={data} />
          </div>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <StreakTracker data={data} />
        </div>
      </div>
    </div>
  );
};

// CalendarView Component
const CalendarView = ({ data, navigateToDay }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const hasDataForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return data.some(entry => entry.date.split('T')[0] === dateStr);
  };

  const getCompletionRate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    const entry = data.find(entry => entry.date.split('T')[0] === dateStr);
    if (!entry) return 0;
    
    const completed = Object.values(entry.checklist).filter(Boolean).length;
    const total = Object.keys(entry.checklist).length;
    return completed / total;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ date: new Date(year, month, day), isCurrentMonth: true });
    }
    
    // Add empty cells to complete the 6-week grid
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 sm:p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Calendar className="text-blue-400" size={20} sm:size={24} />
        <h2 className="text-xl sm:text-2xl font-bold text-white">Calendar</h2>
      </div>
      
      <div className="calendar-container">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-purple-500/20 border border-purple-400/30 text-white rounded-lg hover:bg-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            ←
          </button>
          
          <h3 className="text-base sm:text-xl font-bold text-white">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h3>
          
          <button 
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="px-2 sm:px-4 py-1 sm:py-2 bg-purple-500/20 border border-purple-400/30 text-white rounded-lg hover:bg-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            →
          </button>
        </div>
        
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-1 sm:mb-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="text-center text-gray-400 text-[10px] xs:text-xs sm:text-sm font-semibold py-1 sm:py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        // Calendar grid - make it more compact on small screens
        <div className="grid grid-cols-7 gap-0 xs:gap-0.5 sm:gap-1">
          {days.map((dayObj, index) => {
            const { date, isCurrentMonth } = dayObj;
            const isToday = date.toDateString() === new Date().toDateString();
            const hasData = hasDataForDate(date);
            const completionRate = getCompletionRate(date);
            
            return (
              <button
                key={index}
                onClick={() => navigateToDay(date)}
                className={`
          relative h-7 xs:h-8 sm:h-10 md:h-12 p-0 xs:p-0.5 sm:p-1 text-xs sm:text-sm font-medium transition-all duration-300 rounded-lg
          ${isCurrentMonth ? 'text-white hover:bg-purple-500/20' : 'text-gray-600'}
          ${isToday ? 'bg-blue-500/20 border border-blue-400 text-blue-300' : ''}
          ${hasData ? 'bg-purple-500/10 border border-purple-400/30' : ''}
          hover:scale-105 hover:shadow-lg
        `}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-[10px] xs:text-xs sm:text-sm">{date.getDate()}</span>
                  {hasData && (
                     <div className="hidden sm:block mt-0.5 w-full max-w-[24px] bg-gray-700 rounded-full h-1">
              <div
                className="h-1 rounded-full bg-green-400"
                style={{ width: `${completionRate * 100}%` }}
              />
            </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ActivityGraph Component
const ActivityGraph = ({ data }) => {
  const [dateRange, setDateRange] = useState('This Week');
  
  const filterData = (range) => {
    const now = new Date();
    let startDate;
    
    switch (range) {
      case 'This Week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'This Month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'Last 30 Days':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }
    
    return data.filter(entry => new Date(entry.date) >= startDate);
  };

  const chartData = filterData(dateRange).map(entry => {
    const date = new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const completed = Object.values(entry.checklist).filter(Boolean).length;
    
    return {
      date,
      completed,
      workout: entry.checklist.workout ? 1 : 0,
      meditation: entry.checklist.meditation ? 1 : 0,
      learning: entry.checklist.learning ? 1 : 0,
      building: entry.checklist.building ? 1 : 0,
      reading: entry.checklist.reading ? 1 : 0,
      wokeUpEarly: entry.checklist.wokeUpEarly ? 1 : 0,
      activities: entry.activities
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg border border-purple-400/30 shadow-xl">
          <p className="text-white font-semibold mb-2">{label}</p>
          <p className="text-blue-400">Completed: {data.completed}/6</p>
          {data.activities && data.activities.length > 0 && (
            <div className="mt-2">
              <p className="text-gray-300 text-sm">Activities:</p>
              {data.activities.slice(0, 2).map((activity, i) => (
                <p key={i} className="text-gray-400 text-xs">• {activity.name}</p>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-green-400" size={24} />
          <h2 className="text-2xl font-bold text-white">Progress Overview</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {['This Week', 'This Month', 'Last 30 Days'].map(range => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
                      className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
          dateRange === range
            ? 'bg-purple-500 text-white shadow-lg'
            : 'bg-white/10 text-gray-300 hover:bg-white/20'
        }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
              domain={[0, 6]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="workout" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
            <Bar dataKey="meditation" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="learning" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="building" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
            <Bar dataKey="reading" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar dataKey="wokeUpEarly" stackId="a" fill="#06b6d4" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {[
          { key: 'workout', color: '#ef4444', label: 'Workout' },
          { key: 'meditation', color: '#8b5cf6', label: 'Meditation' },
          { key: 'learning', color: '#3b82f6', label: 'Learning' },
          { key: 'building', color: '#10b981', label: 'Building' },
          { key: 'reading', color: '#f59e0b', label: 'Reading' },
          { key: 'wokeUpEarly', color: '#06b6d4', label: 'Early Rise' }
        ].map(item => (
          <div key={item.key} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-300 text-sm">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StreakTracker = ({ data }) => {
  const calculateStreaks = () => {
    const sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    const streaks = {
      workout: 0,
      meditation: 0,
      learning: 0,
      coding: 0,
      reading: 0,
      wakeUpEarly: 0
    };

    Object.keys(streaks).forEach(key => {
      for (const entry of sortedData) {
        if (entry.checklist[key]) {
          streaks[key]++;
        } else {
          break;
        }
      }
    });

    return streaks;
  };

  const streaks = calculateStreaks();

  const streakItems = [
    { key: 'workout', label: 'Workout', icon: '💪', color: 'from-red-500 to-pink-500' },
    { key: 'meditation', label: 'Meditation', icon: '🧘', color: 'from-purple-500 to-indigo-500' },
    { key: 'learning', label: 'Learning', icon: '📚', color: 'from-blue-500 to-cyan-500' },
    { key: 'coding', label: 'Coding', icon: '🔨', color: 'from-green-500 to-emerald-500' },
    { key: 'reading', label: 'Reading', icon: '📖', color: 'from-yellow-500 to-orange-500' },
    { key: 'wakeUpEarly', label: 'Early Rise', icon: '🌅', color: 'from-cyan-500 to-blue-500' }
  ];
   return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-orange-400" size={24} />
        <h2 className="text-2xl font-bold text-white">Current Streaks</h2>
      </div>

      <div className="space-y-4">
        {streakItems.map(item => (
          <div 
            key={item.key}
            div className="group relative overflow-hidden bg-white/5 p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-white font-semibold">{item.label}</h3>
                  <p className="text-gray-300 text-sm">Daily consistency</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {streaks[item.key] > 0 ? '🔥' : '❄️'}
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {streaks[item.key]}
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  {streaks[item.key] === 1 ? 'day' : 'days'}
                </p>
              </div>
            </div>
            
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r opacity-60 rounded-full" 
                 style={{
                   backgroundColor: item.key === 'workout' ? '#ef4444' : 
                                   item.key === 'meditation' ? '#8b5cf6' : 
                                   item.key === 'learning' ? '#3b82f6' : 
                                   item.key === 'coding' ? '#10b981' : 
                                   item.key === 'reading' ? '#f59e0b' : '#06b6d4',
                   width: `${Math.min((streaks[item.key] / 30) * 100, 100)}%`
                 }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default App;