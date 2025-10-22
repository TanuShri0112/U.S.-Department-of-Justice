import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Settings } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const GroupAboutPage = () => {
  const { groupId } = useParams();
  const { t } = useLanguage();

  // Get group data based on groupId
  const getGroupData = (id) => {
    const groups = {
      '1': {
        name: t('uqtrLawEnforcementTraining'),
        description: t('uqtrLawEnforcementDescription'),
        members: 45,
        sessions: 12,
        certifications: 5,
        modules: 3,
        category: t('lawEnforcementTraining'),
        status: t('activeAcceptingTrainees'),
        createdDate: t('january152024'),
        lastActivity: t('oneHourAgo'),
        totalMembers: t('fortyFiveOfficers'),
        groupType: t('professionalTrainingGroup')
      },
      '2': {
        name: t('uqtrCommunityOutreach'),
        description: t('uqtrCommunityOutreachDescription'),
        members: 32,
        sessions: 8,
        certifications: 3,
        modules: 2,
        category: t('communityDevelopment'),
        status: t('activeAcceptingMembers'),
        createdDate: t('february102024'),
        lastActivity: t('twoHoursAgo'),
        totalMembers: t('thirtyTwoMembers'),
        groupType: t('communityDevelopmentGroup')
      },
      '3': {
        name: t('uqtrLegalTrainingSpecialists'),
        description: t('uqtrLegalTrainingDescription'),
        members: 28,
        sessions: 15,
        certifications: 7,
        modules: 4,
        category: t('legalEducation'),
        status: t('activeAcceptingStudents'),
        createdDate: t('march52024'),
        lastActivity: t('threeHoursAgo'),
        totalMembers: t('twentyEightStudents'),
        groupType: t('legalEducationGroup')
      }
    };
    return groups[id] || groups['1'];
  };

  const group = getGroupData(groupId);

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{group.name}</h1>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {t('active')}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-gray-600">
        {group.description}
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
                <p className="text-sm text-gray-500">{t('members')}</p>
                <p className="text-2xl font-bold">{group.members}</p>
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
                <p className="text-sm text-gray-500">{t('trainingSessions')}</p>
                <p className="text-2xl font-bold">{group.sessions}</p>
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
                <p className="text-sm text-gray-500">{t('certifications')}</p>
                <p className="text-2xl font-bold">{group.certifications}</p>
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
                <p className="text-sm text-gray-500">{t('modules')}</p>
                <p className="text-xl font-bold">{group.modules}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Group Information */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">{t('groupInformation')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('category')}</p>
                <p className="font-medium">{group.category}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('createdDate')}</p>
                <p className="font-medium">{group.createdDate}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('lastActivity')}</p>
                <p className="font-medium">{group.lastActivity}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('status')}</p>
                <p className="font-medium">{group.status}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('totalMembers')}</p>
                <p className="font-medium text-blue-600">{group.totalMembers}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('groupType')}</p>
                <p className="font-medium">{group.groupType}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-6">{t('recentActivity')}</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('newTrainingSession')}</p>
                <p className="text-sm text-gray-500">{t('oneHourAgo')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('newMembersJoined')}</p>
                <p className="text-sm text-gray-500">{t('twoDaysAgo')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('certificationExamScheduled')}</p>
                <p className="text-sm text-gray-500">{t('fourDaysAgo')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('trainingMaterialsUpdated')}</p>
                <p className="text-sm text-gray-500">{t('oneWeekAgo')}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupAboutPage;