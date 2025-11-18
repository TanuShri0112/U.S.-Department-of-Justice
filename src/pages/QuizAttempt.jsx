import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';

const QUESTIONS = [
  {
    id: 'q1',
    question: 'Which step is critical before initiating an infection control procedure?',
    options: ['Wash hands thoroughly', 'Check email', 'Inform social media', 'None of the above'],
  },
  {
    id: 'q2',
    question: 'PPE stands for?',
    options: ['Personal Protective Equipment', 'Public Protection Exit', 'Primary Prevention Exercise', 'None'],
  },
  {
    id: 'q3',
    question: 'How often should surgical masks be replaced?',
    options: ['Every week', 'Once per shift', 'After every patient interaction', 'Never'],
  },
];

const QuizAttempt = () => {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold">MCQ Quiz Attempt</h1>
        <p className="text-gray-500 text-sm">
          Department of Health & Family Welfare prototype — Basic Infection Prevention & Control.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Attempt Details</CardTitle>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
            <Badge variant="outline">Time limit: 15 mins</Badge>
            <Badge variant="outline">Questions: {QUESTIONS.length}</Badge>
            <Badge variant="outline">Passing score: 70%</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {QUESTIONS.map((item, index) => (
            <Card key={item.id} className="border shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">
                  Q{index + 1}. {item.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={responses[item.id]}
                  onValueChange={(value) => handleChange(item.id, value)}
                  className="space-y-3"
                >
                  {item.options.map((option) => (
                    <label key={option} className="flex items-center gap-3 text-sm cursor-pointer">
                      <RadioGroupItem value={option} id={`${item.id}-${option}`} />
                      <span>{option}</span>
                    </label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}

          <div className="flex items-center gap-3">
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Submit Attempt
            </Button>
            {submitted && <span className="text-green-600 text-sm">Responses captured (demo only).</span>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizAttempt;

