import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const sampleCourses = [
  { id: 1, title: 'Hand Hygiene Basics', duration: '30m' },
  { id: 2, title: 'Personal Protective Equipment', duration: '45m' },
  { id: 3, title: 'Biomedical Waste Management', duration: '40m' },
  { id: 4, title: 'Outbreak Communication', duration: '35m' },
];

const learnerSteps = [
  { title: 'Course 1: Hand Hygiene', status: 'complete' },
  { title: 'Course 2: PPE Usage', status: 'active' },
  { title: 'Course 3: Waste Management', status: 'pending' },
];

const LearningPaths = () => {
  const [selectedCourses, setSelectedCourses] = useState([1, 2]);

  const toggleCourse = (id) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((courseId) => courseId !== id) : [...prev, id],
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">Learning Paths / Programs</h1>
        <p className="text-gray-500 text-sm">
          Prototype UI for grouping multiple courses into a single program journey.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Program Builder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Program name e.g. Infection Control Specialist" />
            <div className="grid gap-3">
              {sampleCourses.map((course) => (
                <label
                  key={course.id}
                  className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer transition ${
                    selectedCourses.includes(course.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div>
                    <p className="font-medium">{course.title}</p>
                    <p className="text-xs text-gray-500">{course.duration}</p>
                  </div>
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-blue-600"
                    checked={selectedCourses.includes(course.id)}
                    onChange={() => toggleCourse(course.id)}
                  />
                </label>
              ))}
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Save Program (Demo)</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>Learner Progress</CardTitle>
            <Badge variant="outline">Learner: DR-1021</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Overall progress</p>
              <Progress value={45} className="h-3" />
              <p className="text-xs text-gray-500 mt-1">45% complete</p>
            </div>
            <div className="space-y-3">
              {learnerSteps.map((step, index) => (
                <div key={step.title} className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full text-white flex items-center justify-center text-sm font-semibold ${
                      step.status === 'complete'
                        ? 'bg-green-600'
                        : step.status === 'active'
                        ? 'bg-blue-600'
                        : 'bg-gray-400'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step.title}</p>
                    <p className="text-xs text-gray-500 capitalize">{step.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LearningPaths;

