import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, ChevronRight, Plus, User } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function TaskListSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');

  const getTasks = (t) => [
    {
      id: 1,
      title: t('completeUQTRTrainingCatalogue'),
      description: t('completeUQTRTrainingCatalogueDescription'),
      dueDate: '2023-07-10',
      time: '10:00 PM - 11:45 PM',
      completed: false,
      priority: 'high',
      course: t('uqtrTrainingCatalogue'),
      assignees: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&auto=format'
      ]
    },
    {
      id: 2,
      title: t('reviewUQTRSelfRegistration'),
      description: t('reviewUQTRSelfRegistrationDescription'),
      dueDate: '2023-07-12',
      time: '2:00 PM - 3:30 PM',
      completed: false,
      priority: 'medium',
      course: t('uqtrSelfRegistration'),
      assignees: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'
      ]
    },
    {
      id: 3,
      title: t('submitUQTRProgressTracking'),
      description: t('submitUQTRProgressTrackingDescription'),
      dueDate: '2023-07-15',
      time: '9:00 AM - 11:00 AM',
      completed: true,
      priority: 'high',
      course: t('uqtrProgressTracking'),
      assignees: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format'
      ]
    }
  ];

  const [tasks, setTasks] = useState(getTasks(t));

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    navigate('/tasks');
  };

  const handleViewAllTasks = () => {
    navigate('/tasks');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getFilteredTasks = () => {
    switch (activeFilter) {
      case t('open'):
        return tasks.filter(task => !task.completed);
      case t('closed'):
        return tasks.filter(task => task.completed);
      case t('archived'):
        return tasks.filter(task => task.archived);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const openTasks = tasks.filter(task => !task.completed);
  const closedTasks = tasks.filter(task => task.completed);

  const formatDueDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTodayDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString(undefined, options);
  };

  const getFilterOptions = (t) => [
    { key: 'All', label: t('all') },
    { key: t('open'), label: t('open') },
    { key: t('closed'), label: t('closed') },
    { key: t('archived'), label: t('archived') }
  ];

  const filterOptions = getFilterOptions(t);

  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 mb-1">
              {t('todaysTask')}
            </CardTitle>
            <p className="text-sm text-gray-500">{getTodayDate()}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 transition-all duration-300"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('newTask')}
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-6">
          {filterOptions.map((filter) => {
            const count = filter.key === 'All' ? tasks.length : 
                         filter.key === t('open') ? openTasks.length :
                         filter.key === t('closed') ? closedTasks.length : 0;
            
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeFilter === filter.key 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Task Cards */}
        <div className="space-y-3">
          {filteredTasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="group bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all duration-300 cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Checkbox 
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-gray-800 mb-1 ${
                      task.completed ? 'line-through text-gray-400' : ''
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-sm text-gray-500 mb-3 ${
                      task.completed ? 'line-through' : ''
                    }`}>
                      {task.description}
                    </p>
                    
                    {/* Task Details */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        <span>{task.time}</span>
                      </div>
                      
                      {/* Assignee Avatars */}
                      <div className="flex items-center -space-x-2">
                        {task.assignees.map((avatar, index) => (
                          <img
                            key={index}
                            src={avatar}
                            alt={`Assignee ${index + 1}`}
                            className="w-6 h-6 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Completion Indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.completed 
                    ? 'bg-blue-500 border-blue-500' 
                    : 'border-gray-300 hover:border-blue-300'
                }`}>
                  {task.completed && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
          onClick={handleViewAllTasks}
        >
          {t('viewAllTasks')}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default TaskListSection;
