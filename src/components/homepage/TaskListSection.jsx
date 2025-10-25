import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TaskListSection() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete Workplace Safety Fundamentals',
      description: 'Essential safety principles according to Arbeitsschutzgesetz',
      dueDate: '2025-10-30',
      time: '9:00 AM - 11:00 AM',
      completed: false,
      priority: 'high',
      course: 'Safety Training',
      assignees: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format'
      ]
    },
    {
      id: 2,
      title: 'Review PPE Guidelines',
      description: 'Personal Protective Equipment training and certification',
      dueDate: '2025-11-01',
      time: '2:00 PM - 3:30 PM',
      completed: false,
      priority: 'high',
      course: 'Safety Training',
      assignees: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format'
      ]
    },
    {
      id: 3,
      title: 'Emergency Response Training',
      description: 'Complete emergency procedures and protocols module',
      dueDate: '2025-11-05',
      time: '10:00 AM - 12:00 PM',
      completed: false,
      priority: 'high',
      course: 'Safety Training',
      assignees: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format'
      ]
    }
  ]);



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


  const formatDueDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTodayDate = () => {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <Card className="border-0 shadow-lg bg-white overflow-hidden">
      <CardHeader className="pb-4 pt-5 px-6">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-xl font-bold text-gray-800 mb-1">
              Today's Task
            </CardTitle>
            <p className="text-sm text-gray-500">{getTodayDate()}</p>
          </div>
        </div>

        {/* Task Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-blue-600">All Tasks</span>
          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-600">
            {tasks.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Task Cards */}
        <div className="space-y-3">
          {tasks.slice(0, 5).map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-xl border border-gray-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
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
              </div>
            </div>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}

export default TaskListSection;
