import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Settings } from 'lucide-react';

const GroupAboutPage = () => {
  const { groupId } = useParams();

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Law Enforcement Training Group</h1>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          Active
        </Badge>
      </div>

      {/* Description */}
      <p className="text-gray-600">
        DOJ Law Enforcement Training Group focused on professional development, stakeholder analysis, and advanced law enforcement skills enhancement
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Training Sessions</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Certifications</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Settings className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Modules</p>
                <p className="text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Group Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">Group Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Category</p>
                <p className="font-medium">Law Enforcement Training</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Created Date</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Last Activity</p>
                <p className="font-medium">1 hour ago</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <p className="font-medium">Active and accepting new trainees</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Members</p>
                <p className="font-medium text-blue-600">45 officers</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">Group Type</p>
                <p className="font-medium">Professional Training Group</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">New training session: "Stakeholder Analysis & Needs Assessment"</p>
                <p className="text-sm text-gray-500">1 hour ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">5 new officers joined the training program</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">Module 2 certification exam scheduled for next week</p>
                <p className="text-sm text-gray-500">4 days ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">DOJ compliance training materials updated</p>
                <p className="text-sm text-gray-500">1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupAboutPage;