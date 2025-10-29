import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/translations/translations';

export const BScanQuiz = ({ onComplete }) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage].bscan;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      question: {
        en: 'What is the primary purpose of X-ray scanning systems?',
        ru: 'Какова основная цель систем рентгеновского сканирования?'
      },
      options: {
        en: [
          'To detect internal structures and threats',
          'To measure temperature',
          'To weigh objects',
          'To identify colors'
        ],
        ru: [
          'Обнаружение внутренних структур и угроз',
          'Измерение температуры',
          'Взвешивание объектов',
          'Идентификация цветов'
        ]
      },
      correctAnswer: 0
    },
    {
      id: 2,
      question: {
        en: 'Which principle is NOT part of radiation safety?',
        ru: 'Какой принцип НЕ является частью радиационной безопасности?'
      },
      options: {
        en: [
          'Time - minimize exposure duration',
          'Distance - maintain safe distance',
          'Speed - scan as fast as possible',
          'Shielding - use protective barriers'
        ],
        ru: [
          'Время - минимизация продолжительности воздействия',
          'Расстояние - поддержание безопасного расстояния',
          'Скорость - сканирование как можно быстрее',
          'Экранирование - использование защитных барьеров'
        ]
      },
      correctAnswer: 2
    },
    {
      id: 3,
      question: {
        en: 'What happens when X-rays pass through an object?',
        ru: 'Что происходит, когда рентгеновские лучи проходят через объект?'
      },
      options: {
        en: [
          'They are completely blocked',
          'Different materials absorb different amounts',
          'They change color',
          'They become stronger'
        ],
        ru: [
          'Они полностью блокируются',
          'Различные материалы поглощают разное количество',
          'Они меняют цвет',
          'Они становятся сильнее'
        ]
      },
      correctAnswer: 1
    },
    {
      id: 4,
      question: {
        en: 'What is the recommended minimum safe distance from an X-ray source?',
        ru: 'Каково рекомендуемое минимальное безопасное расстояние от источника рентгеновского излучения?'
      },
      options: {
        en: [
          'Less than 1 meter',
          '1-2 meters',
          'More than 3 meters',
          'No distance needed with shielding'
        ],
        ru: [
          'Менее 1 метра',
          '1-2 метра',
          'Более 3 метров',
          'Расстояние не требуется при наличии экранирования'
        ]
      },
      correctAnswer: 2
    },
    {
      id: 5,
      question: {
        en: 'What type of protective equipment is used in X-ray facilities?',
        ru: 'Какой тип защитного оборудования используется в рентгеновских установках?'
      },
      options: {
        en: [
          'Cotton aprons',
          'Lead barriers and protective aprons',
          'Plastic shields',
          'Glass windows'
        ],
        ru: [
          'Хлопковые фартуки',
          'Свинцовые барьеры и защитные фартуки',
          'Пластиковые щиты',
          'Стеклянные окна'
        ]
      },
      correctAnswer: 1
    }
  ];

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers({
      ...answers,
      [questionId]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
    setShowResults(true);
    
    if (onComplete && correct >= questions.length * 0.8) {
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const currentQ = questions[currentQuestion];
  const scorePercentage = (score / questions.length) * 100;
  const passed = scorePercentage >= 80;

  if (showResults) {
    return (
      <Card className="bg-white/10 border-white/20 backdrop-blur">
        <CardContent className="p-8 text-center">
          <div className={`mx-auto mb-6 p-6 rounded-full ${passed ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
            {passed ? (
              <Award className="h-24 w-24 text-green-400 mx-auto" />
            ) : (
              <XCircle className="h-24 w-24 text-yellow-400 mx-auto" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            {passed ? 
              (currentLanguage === 'en' ? 'Congratulations!' :
               currentLanguage === 'ru' ? 'Поздравляем!' : 'Glückwunsch!') :
              (currentLanguage === 'en' ? 'Good Effort!' :
               currentLanguage === 'ru' ? 'Хорошая попытка!' : 'Guter Versuch!')
            }
          </h2>
          
          <p className="text-xl text-blue-200 mb-6">
            {currentLanguage === 'en' ? `You scored ${score} out of ${questions.length}` :
             currentLanguage === 'ru' ? `Вы набрали ${score} из ${questions.length}` :
             `Sie haben ${score} von ${questions.length} erreicht`}
          </p>
          
          <div className="w-full bg-slate-700 rounded-full h-4 mb-8">
            <div 
              className={`h-4 rounded-full transition-all duration-1000 ${passed ? 'bg-green-500' : 'bg-yellow-500'}`}
              style={{ width: `${scorePercentage}%` }}
            ></div>
          </div>

          {/* Results Details */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-6 text-left">
            <h3 className="text-white font-semibold mb-4">
              {currentLanguage === 'en' ? 'Review Your Answers:' :
               currentLanguage === 'ru' ? 'Проверьте свои ответы:' :
               'Überprüfen Sie Ihre Antworten:'}
            </h3>
            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className="mb-4 pb-4 border-b border-slate-700 last:border-0">
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="text-white font-medium mb-2">
                        {index + 1}. {q.question[currentLanguage]}
                      </p>
                      <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                        {currentLanguage === 'en' ? 'Your answer: ' :
                         currentLanguage === 'ru' ? 'Ваш ответ: ' :
                         'Ihre Antwort: '}
                        {q.options[currentLanguage][userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-300 mt-1">
                          {currentLanguage === 'en' ? 'Correct answer: ' :
                           currentLanguage === 'ru' ? 'Правильный ответ: ' :
                           'Richtige Antwort: '}
                          {q.options[currentLanguage][q.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            {currentLanguage === 'en' ? 'Retake Quiz' :
             currentLanguage === 'ru' ? 'Пройти тест снова' :
             'Quiz wiederholen'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-2xl">{t.interactiveQuiz}</CardTitle>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-200">
            {currentQuestion + 1} / {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        {/* Progress Bar */}
        <div className="w-full bg-slate-700 rounded-full h-2 mb-8">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-6">
            {currentQ.question[currentLanguage]}
          </h3>

          <RadioGroup
            value={answers[currentQ.id]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQ.id, parseInt(value))}
          >
            <div className="space-y-4">
              {currentQ.options[currentLanguage].map((option, index) => (
                <div key={index}>
                  <div className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    answers[currentQ.id] === index 
                      ? 'border-blue-500 bg-blue-500/20' 
                      : 'border-slate-600 bg-slate-800/30 hover:border-slate-500'
                  }`}>
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label 
                      htmlFor={`option-${index}`}
                      className="flex-1 text-white cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 disabled:opacity-50"
          >
            {currentLanguage === 'en' ? 'Previous' :
             currentLanguage === 'ru' ? 'Назад' :
             'Zurück'}
          </Button>

          <Button
            onClick={handleNext}
            disabled={answers[currentQ.id] === undefined}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 
              (currentLanguage === 'en' ? 'Submit' :
               currentLanguage === 'ru' ? 'Отправить' :
               'Einreichen') :
              (currentLanguage === 'en' ? 'Next' :
               currentLanguage === 'ru' ? 'Далее' :
               'Weiter')
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

