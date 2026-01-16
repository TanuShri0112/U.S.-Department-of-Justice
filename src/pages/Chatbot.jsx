import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Mic, 
  Volume2, 
  RotateCcw, 
  FileText, 
  BookOpen, 
  GraduationCap,
  MessageCircle,
  User
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: {
        en: 'Hello! I am your AI teaching assistant. How can I help you with your AI education today?',
        mr: 'नमस्कार! मी तुमचा एआय शिक्षण सहाय्यक आहे. आज तुमच्या एआय शिक्षणात मी कसे मदत करू शकतो?',
        mk: 'Здраво! Јас сум вашиот АИ асистент за учење. Како можам да ви помогнам со вашето учење за АИ денес?'
      },
      timestamp: new Date(Date.now() - 300000)
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { currentLanguage } = useLanguage();

  const content = {
    en: {
      title: "AI Teaching Assistant",
      subtitle: "Get help with AI concepts, tools, and educational applications",
      placeholder: "Ask about AI tools, concepts, or teaching methods...",
      sendMessage: "Send",
      voiceInput: "Voice Input",
      clearChat: "Clear Chat",
      resources: "Helpful Resources",
      quickQuestions: "Quick Questions",
      aiTools: "AI Tools",
      teachingMethods: "Teaching Methods",
      aiConcepts: "AI Concepts",
      send: "Send",
      botResponse: "Assistant Response",
      userMessage: "Your Message",
      transcript: "Transcript",
      audio: "Audio",
      text: "Text"
    },
    mr: {
      title: "एआय शिक्षण सहाय्यक",
      subtitle: "एआय संकल्पना, साधने आणि शैक्षणिक अनुप्रयोगांबद्दल मदत घ्या",
      placeholder: "एआय साधनांबद्दल, संकल्पनांबद्दल किंवा शिकवण्याच्या पद्धतीबद्दल विचारा...",
      sendMessage: "पाठवा",
      voiceInput: "आवाज इनपुट",
      clearChat: "चॅट साफ करा",
      resources: "उपयुक्त संसाधने",
      quickQuestions: "जलद प्रश्न",
      aiTools: "एआय साधने",
      teachingMethods: "शिकवण्याच्या पद्धती",
      aiConcepts: "एआय संकल्पना",
      send: "पाठवा",
      botResponse: "सहाय्यक प्रतिसाद",
      userMessage: "तुमचा संदेश",
      transcript: "प्रतिलेखन",
      audio: "ऑडिओ",
      text: "मजकूर"
    },
    mk: {
      title: "АИ асистент за учење",
      subtitle: "Добијте помош со АИ концепти, алатки и образовни применливи",
      placeholder: "Прашајте за АИ алатки, концепти или методи на настава...",
      sendMessage: "Испрати",
      voiceInput: "Гласовен влез",
      clearChat: "Исчисти ја разговорната тема",
      resources: "Корисни ресурси",
      quickQuestions: "Брзи прашања",
      aiTools: "АИ алатки",
      teachingMethods: "Методи на настава",
      aiConcepts: "АИ концепти",
      send: "Испрати",
      botResponse: "Одговор од асистентот",
      userMessage: "Вашата порака",
      transcript: "Транскрипт",
      audio: "Аудио",
      text: "Текст"
    }
  };

  const t = content[currentLanguage] ?? content.mr;

  const quickQuestions = [
    {
      en: "How do I use AI tools in my classroom?",
      mr: "माझ्या वर्गात मी एआय साधने कशी वापरू शकतो?",
      mk: "Како да ги користам АИ алатките во мојата класа?"
    },
    {
      en: "What are the basics of machine learning?",
      mr: "मशीन लर्निंगची मूलभूत गोष्टी काय आहेत?",
      mk: "Што се основите на машинското учење?"
    },
    {
      en: "How to ensure AI ethics in education?",
      mr: "शिक्षणात एआय नैतिकता कशी सुनिश्चित करायची?",
      mk: "Како да осигуриме етички АИ во образованието?"
    },
    {
      en: "Can you recommend AI tools for assessment?",
      mr: "तुम्ही मूल्यांकनासाठी एआय साधने शिफारस करू शकता का?",
      mk: "Можете ли да ми препорачате АИ алатки за оценување?"
    }
  ];

  const resources = [
    {
      title: {
        en: "AI Tools Guide",
        mr: "एआय साधनांचे मार्गदर्शन",
        mk: "Водич за АИ алатки"
      },
      description: {
        en: "Complete guide to popular AI tools for educators",
        mr: "शिक्षकांसाठी लोकप्रिय एआय साधनांचे संपूर्ण मार्गदर्शन",
        mk: "Целосен водич за популарни АИ алатки за образовници"
      },
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: {
        en: "Ethics Framework",
        mr: "नैतिकता चौकट",
        mk: "Рамка за етика"
      },
      description: {
        en: "Guidelines for ethical AI usage in schools",
        mr: "शाळांमध्ये नैतिक एआय वापरासाठी मार्गदर्शक तत्त्वे",
        mk: "Упатства за етичко користење на АИ во училиштата"
      },
      icon: <GraduationCap className="h-5 w-5" />
    },
    {
      title: {
        en: "Lesson Plans",
        mr: "पाठ योजना",
        mk: "Наставни планови"
      },
      description: {
        en: "AI-integrated lesson plans for teachers",
        mr: "शिक्षकांसाठी एआय-एकत्रित पाठ योजना",
        mk: "Наставни планови со интегриран АИ за наставници"
      },
      icon: <FileText className="h-5 w-5" />
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: {
          en: "Thank you for your question! I'm here to help you with AI education. This is a simulated response. In a real implementation, this would connect to an AI service that understands Marathi and English.",
          mr: "तुमच्या प्रश्नाबद्दल धन्यवाद! एआय शिक्षणात मी मदत करण्यासाठी इथे आहे. हा एक सादृश्य प्रतिसाद आहे. वास्तविक अंमलबजावणीत, हे मराठी आणि इंग्रजी समजू शकणाऱ्या एआय सेवेशी कनेक्ट होईल.",
          mk: "Ви благодариме за вашето прашање! Јас сум тука за да ви помогнам со образованието за АИ. Ова е симулиран одговор. Во вистинска имплементација, ова ќе се поврзе со АИ сервис кој разбира македонски и англиски."
        },
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question[currentLanguage]);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: {
          en: 'Hello! I am your AI teaching assistant. How can I help you with your AI education today?',
          mr: 'नमस्कार! मी तुमचा एआय शिक्षण सहाय्यक आहे. आज तुमच्या एआय शिक्षणात मी कसे मदत करू शकतो?',
          mk: 'Здраво! Јас сум вашиот АИ асистент за учење. Како можам да ви помогнам со вашето учење за АИ денес?'
        },
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col border-l-4 border-l-orange-500 bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Bot className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{t.title}</CardTitle>
                    <p className="text-sm text-gray-500">{t.botResponse}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearChat}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t.clearChat}
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <Bot className="h-4 w-4" />
                          )}
                          <span className="text-xs opacity-70">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p>{message.content[currentLanguage]}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg max-w-xs">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4" />
                          <span className="text-xs opacity-70">Typing...</span>
                        </div>
                        <div className="flex space-x-1 pt-1">
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.placeholder}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    {t.send}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Quick Actions */}
          <div className="space-y-6">
            {/* Quick Questions */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  {t.quickQuestions}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto py-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    <span className="text-sm">{question[currentLanguage]}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Helpful Resources */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-green-600" />
                  {t.resources}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {resources.map((resource, index) => (
                  <div 
                    key={index} 
                    className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-orange-600 mt-0.5">
                        {resource.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">
                          {resource.title[currentLanguage]}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">
                          {resource.description[currentLanguage]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Language Indicator */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Volume2 className="h-5 w-5 text-purple-600" />
                  {t.transcript}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    {t.text}
                  </Badge>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {currentLanguage === 'mr' ? 'मराठी' : 'English'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;