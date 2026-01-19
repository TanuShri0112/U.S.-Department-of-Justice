import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Download, RefreshCw, TrendingUp, Clock, Target, Award, AlertCircle } from 'lucide-react';

const AIPredictivePatternResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const { formData, results } = location.state || {};
  const [showMindMap, setShowMindMap] = useState(false);

  const translations = {
    en: {
      title: 'Teacher Profile Results',
      assessmentCompleted: 'Assessment completed on',
      exportProfile: 'Export Profile',
      newAssessment: 'New Assessment',
      viewMindMap: 'View Mind Map',
      teacherProfile: 'Teacher Profile',
      name: 'Name',
      overallScore: 'Overall Score',
      learningStyle: 'Learning Style',
      communication: 'Communication',
      assessmentResults: 'Assessment Results by Category',
      trainingRecommendations: 'Training Recommendations',
      pedagogicalKnowledge: 'Pedagogical Knowledge',
      classroomManagement: 'Classroom Management',
      technologyIntegration: 'Technology Integration',
      highPriority: 'High Priority',
      mediumPriority: 'Medium Priority',
      recommendedMethods: 'Recommended Methods',
      timeline: 'Timeline',
      keyStrengths: 'Key Strengths',
      areasForDevelopment: 'Areas for Development',
      learningPreference: 'Learning Preference',
      motivationIndex: 'Motivation Index',
      communicationStyle: 'Communication Style',
      ongoing: 'Ongoing',
      weeks: 'weeks',
      interactiveTeachingMethods: 'Interactive teaching methods',
      caseStudyDiscussions: 'Case study discussions',
      peerObservationSessions: 'Peer observation sessions',
      curriculumDesignWorkshops: 'Curriculum design workshops',
      studentEngagementStrategies: 'Student engagement strategies',
      behaviorManagementTechniques: 'Behavior management techniques',
      inclusiveTeachingPractices: 'Inclusive teaching practices',
      digitalToolTraining: 'Digital tool training',
      smartClassroomUtilization: 'Smart classroom utilization',
      onlineTeachingPlatforms: 'Online teaching platforms',
      focusOnComprehensivePedagogicalTraining: 'Focus on comprehensive pedagogical training with hands-on practice and real-world teaching scenarios.',
      developCoreTeachingCompetencies: 'Develop core teaching competencies through practice and structured methodologies.',
      maximizeLearningThroughTechnology: 'Maximize learning through effective technology integration and digital teaching tools.',
      learningPathMindMap: 'Learning Path Mind Map',
      personalizedLearningJourney: 'Your Personalized Learning Journey',
      currentLevel: 'Current Level',
      targetLevel: 'Target Level',
      learningPath: 'Learning Path',
      coreCompetencies: 'Core Competencies',
      advancedSkills: 'Advanced Skills',
      masteryLevel: 'Mastery Level'
    },
    mr: {
      title: 'शिक्षक प्रोफाइल परिणाम',
      assessmentCompleted: 'मूल्यांकन पूर्ण झाले',
      exportProfile: 'प्रोफाइल एक्सपोर्ट करा',
      newAssessment: 'नवीन मूल्यांकन',
      viewMindMap: 'माइंड मॅप पहा',
      learnerProfile: 'शिक्षक प्रोफाइल',
      name: 'नाव',
      overallScore: 'एकूण गुण',
      learningStyle: 'शिक्षण शैली',
      communication: 'संवाद',
      assessmentResults: 'श्रेणीनुसार मूल्यांकन परिणाम',
      trainingRecommendations: 'प्रशिक्षण शिफारसी',
      pedagogicalKnowledge: 'शैक्षणिक ज्ञान',
      classroomManagement: 'वर्गखंड व्यवस्थापन',
      technologyIntegration: 'तंत्रज्ञान एकत्रीकरण',
      highPriority: 'उच्च प्राधान्य',
      mediumPriority: 'मध्यम प्राधान्य',
      recommendedMethods: 'शिफारसी पद्धती',
      timeline: 'वेळापत्रक',
      keyStrengths: 'मुख्य बळकटी',
      areasForDevelopment: 'विकासाच्या क्षेत्रे',
      learningPreference: 'शिक्षण प्राधान्य',
      motivationIndex: 'प्रेरणा निर्देशांक',
      communicationStyle: 'संवाद शैली',
      ongoing: 'सतत',
      weeks: 'आठवडे',
      interactiveTeachingMethods: 'इंटरॅक्टिव्ह शिक्षण पद्धती',
      caseStudyDiscussions: 'केस स्टडी चर्चा',
      peerObservationSessions: 'सहकारी निरीक्षण सत्रे',
      curriculumDesignWorkshops: 'अभ्यासक्रम डिझाइन कार्यशाळा',
      studentEngagementStrategies: 'विद्यार्थी सहभाग रणनीती',
      behaviorManagementTechniques: 'वर्तन व्यवस्थापन तंत्र',
      inclusiveTeachingPractices: 'समावेशी शिक्षण पद्धती',
      digitalToolTraining: 'डिजिटल साधन प्रशिक्षण',
      smartClassroomUtilization: 'स्मार्ट वर्गखंड वापर',
      onlineTeachingPlatforms: 'ऑनलाइन शिक्षण प्लॅटफॉर्म',
      focusOnComprehensivePedagogicalTraining: 'व्यावहारिक सराव आणि वास्तव-जगातील शिक्षण परिदृश्यांसह सविस्तर शैक्षणिक प्रशिक्षणावर लक्ष केंद्रित करा.',
      developCoreTeachingCompetencies: 'सराव आणि संरचित पद्धतींद्वारे मूलभूत शिक्षण योग्यता विकसित करा.',
      maximizeLearningThroughTechnology: 'प्रभावी तंत्रज्ञान एकत्रीकरण आणि डिजिटल शिक्षण साधनांद्वारे शिक्षण कमालीपर्यंत वाढवा.',
      learningPathMindMap: 'शिक्षण मार्ग माइंड मॅप',
      personalizedLearningJourney: 'आपली वैयक्तिकृत शिक्षण यात्रा',
      currentLevel: 'वर्तमान स्तर',
      targetLevel: 'लक्ष्य स्तर',
      learningPath: 'शिक्षण मार्ग',
      coreCompetencies: 'मूलभूत कौशल्ये',
      advancedSkills: 'प्रगत कौशल्ये',
      masteryLevel: 'प्रभुत्व स्तर'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const currentDate = new Date().toLocaleDateString(currentLanguage === 'mr' ? 'mr-IN' : 'en-US');

  // Calculate results based on teacher assessment answers
  const calculateResults = (answers) => {
    // Teacher-specific scoring based on assessment answers
    let pedagogicalScore = 0;
    let classroomManagementScore = 0;
    let technologyIntegrationScore = 0;
    
    // Question 1: Learning preference (affects pedagogical knowledge)
    if (answers[0] === 2) pedagogicalScore += 10; // Hands-on practice
    else if (answers[0] === 3) pedagogicalScore += 8; // Group discussions
    else if (answers[0] === 1) pedagogicalScore += 6; // Videos/demonstrations
    else pedagogicalScore += 4; // Reading textbooks
    
    // Question 2: Problem-solving approach (affects classroom management)
    if (answers[1] === 0) classroomManagementScore += 10; // Step by step analysis
    else if (answers[1] === 3) classroomManagementScore += 8; // Research similar problems
    else if (answers[1] === 1) classroomManagementScore += 6; // Try different solutions
    else classroomManagementScore += 4; // Ask for help immediately
    
    // Question 3: Training environment (affects technology integration)
    if (answers[2] === 2) technologyIntegrationScore += 10; // Interactive workshops
    else if (answers[2] === 3) technologyIntegrationScore += 8; // Online self-paced
    else if (answers[2] === 1) technologyIntegrationScore += 6; // Collaborative setting
    else technologyIntegrationScore += 4; // Quiet individual space
    
    // Question 4: Feedback handling (affects classroom management)
    if (answers[3] === 1) classroomManagementScore += 10; // Verbal discussions
    else if (answers[3] === 2) classroomManagementScore += 8; // Immediate responses
    else if (answers[3] === 0) classroomManagementScore += 6; // Written feedback
    else classroomManagementScore += 4; // Need time to process
    
    // Question 5: Motivation (affects pedagogical knowledge)
    if (answers[4] === 2) pedagogicalScore += 10; // Practical application
    else if (answers[4] === 1) pedagogicalScore += 8; // Personal growth
    else if (answers[4] === 0) pedagogicalScore += 6; // Career advancement
    else pedagogicalScore += 4; // Recognition and achievement
    
    // Question 6: Technical skills learning (affects technology integration)
    if (answers[5] === 1) technologyIntegrationScore += 10; // Real-world projects
    else if (answers[5] === 2) technologyIntegrationScore += 8; // Mentorship programs
    else if (answers[5] === 0) technologyIntegrationScore += 6; // Structured curriculum
    else technologyIntegrationScore += 4; // Trial and error
    
    // Question 7: Communication style (affects classroom management)
    if (answers[6] === 2) classroomManagementScore += 10; // Visual and demonstrative
    else if (answers[6] === 1) classroomManagementScore += 8; // Casual and conversational
    else if (answers[6] === 3) classroomManagementScore += 6; // Direct and concise
    else classroomManagementScore += 4; // Formal and detailed
    
    // Question 8: Technology approach (affects technology integration)
    if (answers[7] === 1) technologyIntegrationScore += 10; // Jump in and explore
    else if (answers[7] === 2) technologyIntegrationScore += 8; // Watch tutorials
    else if (answers[7] === 3) technologyIntegrationScore += 6; // Formal training
    else technologyIntegrationScore += 4; // Read documentation
    
    // Question 9: Assessment preference (affects pedagogical knowledge)
    if (answers[8] === 1) pedagogicalScore += 10; // Practical demonstrations
    else if (answers[8] === 2) pedagogicalScore += 8; // Peer evaluations
    else if (answers[8] === 3) pedagogicalScore += 6; // Portfolio reviews
    else pedagogicalScore += 4; // Written exams
    
    // Question 10: Learning retention (affects all areas)
    if (answers[9] === 2) {
      pedagogicalScore += 8;
      classroomManagementScore += 8;
      technologyIntegrationScore += 8;
    } // Practical application
    else if (answers[9] === 1) {
      pedagogicalScore += 6;
      classroomManagementScore += 6;
      technologyIntegrationScore += 6;
    } // Teaching others
    else if (answers[9] === 3) {
      pedagogicalScore += 4;
      classroomManagementScore += 4;
      technologyIntegrationScore += 4;
    } // Visual aids
    else {
      pedagogicalScore += 2;
      classroomManagementScore += 2;
      technologyIntegrationScore += 2;
    } // Note-taking
    
    // Normalize scores to 0-100 range
    const normalizeScore = (score) => Math.min(100, Math.max(0, score + 40)); // Add base score of 40
    
    const scores = {
      pedagogicalKnowledge: normalizeScore(pedagogicalScore),
      classroomManagement: normalizeScore(classroomManagementScore),
      technologyIntegration: normalizeScore(technologyIntegrationScore)
    };
    
    // Determine learning style based on answers
    const learningStyles = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'];
    const communicationStyles = ['Formal', 'Collaborative', 'Direct', 'Adaptive'];
    
    // Calculate learning style based on question patterns
    let learningStyleIndex = 0;
    if (answers[0] === 1 || answers[7] === 2) learningStyleIndex = 0; // Visual
    else if (answers[0] === 3 || answers[3] === 1) learningStyleIndex = 1; // Auditory
    else if (answers[0] === 2 || answers[9] === 2) learningStyleIndex = 2; // Kinesthetic
    else learningStyleIndex = 3; // Reading/Writing
    
    // Calculate communication style based on answers
    let communicationStyleIndex = 0;
    if (answers[6] === 0) communicationStyleIndex = 0; // Formal
    else if (answers[2] === 1 || answers[6] === 1) communicationStyleIndex = 1; // Collaborative
    else if (answers[6] === 3) communicationStyleIndex = 2; // Direct
    else communicationStyleIndex = 3; // Adaptive
    
    // Determine strengths and development areas
    const sortedScores = Object.entries(scores).sort(([,a], [,b]) => b - a);
    const strengths = [sortedScores[0][0].replace(/([A-Z])/g, ' $1').trim()];
    const developmentAreas = [sortedScores[2][0].replace(/([A-Z])/g, ' $1').trim()];
    
    return {
      overallScore: Math.round((scores.pedagogicalKnowledge + scores.classroomManagement + scores.technologyIntegration) / 3),
      learningStyle: learningStyles[learningStyleIndex],
      communicationStyle: communicationStyles[communicationStyleIndex],
      categoryScores: scores,
      strengths: strengths,
      developmentAreas: developmentAreas
    };
  };

  // Generate learning path based on assessment answers
  const generateLearningPath = (answers) => {
    const learningPaths = {
      pedagogical: {
        current: 'Basic Teaching Methods',
        target: 'Advanced Pedagogical Strategies',
        milestones: [
          'Understanding Learning Theories',
          'Curriculum Design Basics',
          'Assessment Techniques',
          'Differentiated Instruction',
          'Advanced Teaching Methodologies'
        ]
      },
      classroom: {
        current: 'Basic Classroom Setup',
        target: 'Master Classroom Management',
        milestones: [
          'Classroom Organization',
          'Student Engagement Basics',
          'Behavior Management',
          'Inclusive Teaching Practices',
          'Advanced Classroom Strategies'
        ]
      },
      technology: {
        current: 'Basic Digital Literacy',
        target: 'Technology Integration Expert',
        milestones: [
          'Digital Tools Basics',
          'Smart Classroom Usage',
          'Online Teaching Platforms',
          'Educational Technology',
          'Advanced Tech Integration'
        ]
      }
    };

    // Determine primary learning path based on highest scoring area
    const scores = results?.categoryScores || {};
    const highestArea = Object.entries(scores).reduce((a, b) => scores[a[0]] > scores[b[0]] ? a : b)[0];
    
    return learningPaths[highestArea] || learningPaths.pedagogical;
  };

  const MindMapComponent = () => {
    const learningPath = generateLearningPath(formData?.answers || []);
    const overallScore = results?.overallScore || 0;
    
    // Determine current level based on overall score
    const getCurrentLevel = () => {
      if (overallScore >= 80) return 4; // Advanced
      if (overallScore >= 60) return 3; // Proficient
      if (overallScore >= 40) return 2; // Developing
      return 1; // Beginning
    };

    const currentLevelIndex = getCurrentLevel();
    const milestones = learningPath.milestones;
    
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-600" />
          {t.learningPathMindMap}
        </h3>
        
        <div className="relative">
          {/* Central node */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-center">
              {t.personalizedLearningJourney}
            </div>
          </div>
          
          {/* Learning path visualization */}
          <div className="space-y-4">
            {/* Current level indicator */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">
                {t.currentLevel}
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4 relative">
                  <div 
                    className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(currentLevelIndex / 5) * 100}%` }}
                  />
                </div>
              </div>
              <div className="text-sm font-semibold text-blue-600">
                {milestones[currentLevelIndex - 1] || milestones[0]}
              </div>
            </div>
            
            {/* Target level indicator */}
            <div className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">
                {t.targetLevel}
              </div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-4 relative">
                  <div className="bg-green-600 h-4 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>
              <div className="text-sm font-semibold text-green-600">
                {learningPath.target}
              </div>
            </div>
          </div>
          
          {/* Milestones path */}
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.learningPath}</h4>
            <div className="relative">
              {/* Connection line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-300" />
              
              {/* Milestone nodes */}
              <div className="space-y-6">
                {milestones.map((milestone, index) => {
                  const isCompleted = index < currentLevelIndex;
                  const isCurrent = index === currentLevelIndex - 1;
                  const isFuture = index >= currentLevelIndex;
                  
                  return (
                    <div key={index} className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 ${
                        isCompleted 
                          ? 'bg-green-600 border-green-600' 
                          : isCurrent 
                            ? 'bg-blue-600 border-blue-600 animate-pulse'
                            : 'bg-white border-gray-300'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <span className={`text-xs font-semibold ${
                            isCurrent ? 'text-white' : 'text-gray-500'
                          }`}>
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className={`flex-1 p-3 rounded-lg ${
                        isCompleted 
                          ? 'bg-green-50 border border-green-200' 
                          : isCurrent 
                            ? 'bg-blue-50 border border-blue-200'
                            : 'bg-gray-50 border border-gray-200'
                      }`}>
                        <div className={`text-sm font-medium ${
                          isCompleted 
                            ? 'text-green-800' 
                            : isCurrent 
                              ? 'text-blue-800'
                              : 'text-gray-600'
                        }`}>
                          {milestone}
                        </div>
                        {isCurrent && (
                          <div className="text-xs text-blue-600 mt-1">
                            {t.currentLevel}
                          </div>
                        )}
                        {isCompleted && (
                          <div className="text-xs text-green-600 mt-1">
                            ✓ Completed
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Skill categories overview */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">{t.coreCompetencies}</h5>
              <div className="text-2xl font-bold text-blue-600">
                {results?.categoryScores?.pedagogicalKnowledge || 0}%
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-900 mb-2">{t.advancedSkills}</h5>
              <div className="text-2xl font-bold text-green-600">
                {results?.categoryScores?.classroomManagement || 0}%
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-900 mb-2">{t.masteryLevel}</h5>
              <div className="text-2xl font-bold text-purple-600">
                {results?.categoryScores?.technologyIntegration || 0}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleExportProfile = () => {
    // Create a simple text export
    const exportData = `
${t.title}
${t.assessmentCompleted}: ${currentDate}
${t.name}: ${formData?.name || 'N/A'}
${t.email}: ${formData?.email || 'N/A'}

${t.overallScore}: ${results?.overallScore || 0}%
${t.learningStyle}: ${results?.learningStyle || 'N/A'}
${t.communication}: ${results?.communicationStyle || 'N/A'}

${t.assessmentResults}:
${t.pedagogicalKnowledge}: ${results?.categoryScores?.pedagogicalKnowledge || 0}%
${t.classroomManagement}: ${results?.categoryScores?.classroomManagement || 0}%
${t.technologyIntegration}: ${results?.categoryScores?.technologyIntegration || 0}%

${t.keyStrengths}: ${results?.strengths?.join(', ') || 'N/A'}
${t.areasForDevelopment}: ${results?.developmentAreas?.join(', ') || 'N/A'}
    `.trim();

    const blob = new Blob([exportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learner-profile-${formData?.name || 'user'}-${currentDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleNewAssessment = () => {
    navigate('/ai-predictive-pattern');
  };

  const handleViewMindMap = () => {
    setShowMindMap(true);
  };

  const getPriorityColor = (priority) => {
    return priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!formData || !results) {
    return (
      <div className="min-h-screen bg-white p-4 flex items-center justify-center">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Assessment Data</h3>
            <p className="text-gray-600 mb-4">Please complete the assessment first.</p>
            <Button onClick={() => navigate('/ai-predictive-pattern')}>
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                <p className="text-gray-600">{t.assessmentCompleted}: {currentDate}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleViewMindMap}
                className="flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                {t.viewMindMap}
              </Button>
              <Button 
                onClick={handleNewAssessment}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t.newAssessment}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg h-fit bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  {t.learnerProfile}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">{t.name}</p>
                  <p className="font-semibold text-lg">{formData.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">{t.overallScore}</p>
                  <div className="flex items-center gap-3">
                    <span className={`text-3xl font-bold ${getScoreColor(results.overallScore)}`}>
                      {results.overallScore}%
                    </span>
                    <div className="flex-1">
                      <Progress value={results.overallScore} className="h-2" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">{t.learningStyle}</p>
                    <Badge variant="secondary" className="text-sm">
                      {results.learningStyle}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.communication}</p>
                    <Badge variant="secondary" className="text-sm">
                      {results.communicationStyle}
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-green-700">{t.keyStrengths}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {results.strengths.map((strength, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-700">{t.areasForDevelopment}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {results.developmentAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assessment Results and Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Results by Category */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  {t.assessmentResults}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: t.pedagogicalKnowledge, score: results.categoryScores.pedagogicalKnowledge },
                    { name: t.classroomManagement, score: results.categoryScores.classroomManagement },
                    { name: t.technologyIntegration, score: results.categoryScores.technologyIntegration }
                  ].map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <span className={`font-semibold ${getScoreColor(category.score)}`}>
                          {category.score}%
                        </span>
                      </div>
                      <Progress value={category.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Training Recommendations */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  {t.trainingRecommendations}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pedagogical Knowledge */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{t.pedagogicalKnowledge}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.focusOnComprehensivePedagogicalTraining}
                      </p>
                    </div>
                    <Badge className={getPriorityColor('high')}>
                      {t.highPriority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.recommendedMethods}:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• {t.interactiveTeachingMethods}</li>
                      <li>• {t.caseStudyDiscussions}</li>
                      <li>• {t.peerObservationSessions}</li>
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{t.timeline}: 4-6 {t.weeks}</span>
                    </div>
                  </div>
                </div>

                {/* Classroom Management */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{t.classroomManagement}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.developCoreTeachingCompetencies}
                      </p>
                    </div>
                    <Badge className={getPriorityColor('high')}>
                      {t.highPriority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.recommendedMethods}:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• {t.curriculumDesignWorkshops}</li>
                      <li>• {t.studentEngagementStrategies}</li>
                      <li>• {t.behaviorManagementTechniques}</li>
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{t.timeline}: 6-8 {t.weeks}</span>
                    </div>
                  </div>
                </div>

                {/* Technology Integration */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{t.technologyIntegration}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.maximizeLearningThroughTechnology}
                      </p>
                    </div>
                    <Badge className={getPriorityColor('medium')}>
                      {t.mediumPriority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t.recommendedMethods}:</p>
                    <ul className="text-sm text-gray-600 space-y-1 ml-4">
                      <li>• {t.digitalToolTraining}</li>
                      <li>• {t.smartClassroomUtilization}</li>
                      <li>• {t.onlineTeachingPlatforms}</li>
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{t.timeline}: {t.ongoing}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mind Map Modal */}
      {showMindMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-end mb-6">
                <Button 
                  onClick={() => setShowMindMap(false)}
                  variant="outline"
                  className="p-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              <MindMapComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictivePatternResults;
