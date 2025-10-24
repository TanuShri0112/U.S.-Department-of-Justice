import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, ChevronRight, Plus, ChevronDown, ChevronUp, ListTodo } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export function TaskListSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const getTasks = (t) => [
    {
      id: 1,
      title: t('completeUQTRTrainingCatalogue'),
      description: t('completeUQTRTrainingCatalogueDescription'),
      time: '10:00 PM - 11:45 PM',
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      title: t('reviewUQTRSelfRegistration'),
      description: t('reviewUQTRSelfRegistrationDescription'),
      time: '2:00 PM - 3:30 PM',
      completed: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: t('submitUQTRProgressTracking'),
      description: t('submitUQTRProgressTrackingDescription'),
      time: '9:00 AM - 11:00 AM',
      completed: true,
      priority: 'high'
    }
  ];

  const [tasks, setTasks] = useState(getTasks(t));

  const toggleTask = (taskId, e) => {
    e?.stopPropagation();
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = (e) => {
    e?.stopPropagation();
    navigate('/tasks');
  };

  const handleViewAllTasks = (e) => {
    e?.stopPropagation();
    navigate('/tasks');
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

  // Get the first incomplete task for the collapsed view
  const firstIncompleteTask = tasks.find(task => !task.completed);

  if (!isExpanded) {
    return (
      <Card 
        className="shadow-sm border border-gray-100 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
        onClick={() => setIsExpanded(true)}
      >
        <div className="flex items-center p-4 gap-3">
          <div className="bg-purple-100 rounded-full p-2 flex-shrink-0">
            <ListTodo className="h-5 w-5 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-medium text-gray-900">
                {t('todaysTask')}
              </h3>
              {firstIncompleteTask && (
                <>
                  <span className="text-gray-400">·</span>
                  <span className="text-sm text-gray-500 truncate">
                    {firstIncompleteTask.title}
                  </span>
                </>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-3 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
            onClick={handleAddTask}
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
          <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white overflow-hidden">
      <CardHeader 
        className="pb-4 pt-5 px-6 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
        onClick={() => setIsExpanded(false)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 rounded-full p-2">
              <ListTodo className="h-5 w-5 text-purple-600" />
            </div>
            <CardTitle className="text-base font-medium text-gray-900">
              {t('todaysTask')}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-3 text-sm bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
              onClick={handleAddTask}
            >
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
            <ChevronUp className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-4 border-b border-gray-100 pb-3">
          {[
            { key: 'All', label: t('all'), count: tasks.length },
            { key: t('open'), label: t('open'), count: openTasks.length },
            { key: t('closed'), label: t('closed'), count: closedTasks.length }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                activeFilter === filter.key 
                  ? 'text-purple-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {filter.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === filter.key 
                  ? 'bg-purple-100 text-purple-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className="group bg-white rounded-lg border border-gray-100 p-3 hover:shadow-sm transition-all duration-300"
              onClick={(e) => toggleTask(task.id, e)}
            >
              <div className="flex items-start gap-3">
                <Checkbox 
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium text-sm text-gray-900 mb-1 ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <p className={`text-xs text-gray-600 mb-2 line-clamp-2 ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}>
                    {task.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{task.time}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  task.completed 
                    ? 'bg-purple-500 border-purple-500' 
                    : 'border-gray-300 group-hover:border-purple-300'
                }`}>
                  {task.completed && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full mt-4 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
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