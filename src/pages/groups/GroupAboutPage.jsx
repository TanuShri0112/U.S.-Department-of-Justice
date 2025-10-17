import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Settings, BookOpen, Award, Clock, Target } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

const GroupAboutPage = () => {
  const { groupId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t('assessmentLearningSpecialists')}</h1>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          {t('active')}
        </Badge>
      </div>

      {/* Description */}
      <p className="text-gray-600">
        {t('assessmentLearningDescription')}
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
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('assessmentModules')}</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('certifications')}</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-4">
          <CardContent className="p-0">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Target className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t('rubricsDesign')}</p>
                <p className="text-xl font-bold">3</p>
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
                <p className="font-medium">{t('educationalAssessment')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('createdDate')}</p>
                <p className="font-medium">{t('january152024')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('lastActivity')}</p>
                <p className="font-medium">{t('oneHourAgo')}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('status')}</p>
                <p className="font-medium">{t('activeAndAccepting')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('totalMembers')}</p>
                <p className="font-medium text-blue-600">{t('fortyFiveEducators')}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('groupType')}</p>
                <p className="font-medium">{t('professionalDevelopmentGroup')}</p>
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
                <p className="font-medium">{t('fiveNewEducatorsJoined')}</p>
                <p className="text-sm text-gray-500">{t('twoDaysAgo')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('module2CertificationScheduled')}</p>
                <p className="text-sm text-gray-500">{t('fourDaysAgo')}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">{t('assessmentMaterialsUpdated')}</p>
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