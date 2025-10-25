import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, HardHat, AlertTriangle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const safetyModules = [
  {
    id: 1,
    title: 'Workplace Safety Fundamentals',
    icon: Shield,
    description: 'Essential safety principles and practices according to Arbeitsschutzgesetz',
    status: 'pending',
    duration: '2 hours'
  },
  {
    id: 2,
    title: 'Personal Protective Equipment',
    icon: HardHat,
    description: 'Proper use and maintenance of safety equipment',
    status: 'pending',
    duration: '1.5 hours'
  },
  {
    id: 3,
    title: 'Emergency Procedures',
    icon: AlertTriangle,
    description: 'Emergency response and evacuation protocols',
    status: 'pending',
    duration: '2 hours'
  },
  {
    id: 4,
    title: 'First Aid Basics',
    icon: Heart,
    description: 'Basic first aid and emergency medical response',
    status: 'pending',
    duration: '2.5 hours'
  }
];

export function SafetyTrainingSection() {
  const navigate = useNavigate();

  const handleModuleClick = (moduleId) => {
    navigate(`/courses/${moduleId}`);
  };

  return (
    <section className="mb-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Required Safety Training</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyModules.map((module) => {
              const IconComponent = module.icon;
              return (
                <div
                  key={module.id}
                  onClick={() => handleModuleClick(module.id)}
                  className="group cursor-pointer bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                          {module.status}
                        </span>
                        <span className="text-xs text-gray-500">{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SafetyTrainingSection;
