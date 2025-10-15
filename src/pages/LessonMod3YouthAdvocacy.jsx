import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LessonMod3YouthAdvocacy = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);

  // Language options
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: 'English (US)' },
    { code: 'hi-IN', label: 'हिन्दी (Hindi)' },
    { code: 'mr-IN', label: 'मराठी (Marathi)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { preview: 'Preview', language: 'Language', voice: 'Voice', listen: 'Listen', stop: 'Stop', download: 'Download' },
      'hi': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज़', listen: 'सुनें', stop: 'रोकें', download: 'डाउनलोड' },
      'mr': { preview: 'पूर्वावलोकन', language: 'भाषा', voice: 'आवाज', listen: 'ऐका', stop: 'थांबवा', download: 'डाउनलोड' }
    };
    const key = (selectedLang || 'en-US').split('-')[0];
    return map[key] || map['en'];
  }, [selectedLang]);

  const handleBackToModules = () => {
    navigate(-1);
  };

  // Load voices when component mounts
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      const v = synth.getVoices();
      setVoices(v);
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || v[0];
      if (defaultVoice && !selectedVoiceURI) {
        setSelectedVoiceURI(defaultVoice.voiceURI);
      }
    };
    load();
    synth.onvoiceschanged = load;
    return () => {
      if (synth) synth.onvoiceschanged = null;
    };
  }, [selectedLang, selectedVoiceURI]);

  const handleSpeakToggle = (blockKey, text) => {
    if (!text) return;
    const synth = window.speechSynthesis;
    if (!synth) return;
    
    const isSpeaking = speakingBlocks[blockKey];
    if (isSpeaking) {
      synth.cancel();
      setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
      return;
    }
    
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = selectedLang;
    const voice = voices.find(v => v.voiceURI === selectedVoiceURI) || voices.find(v => v.lang === selectedLang);
    if (voice) utter.voice = voice;
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Modules
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Introduction */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Module 3: Designing Advocacy Training Programs
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Creating comprehensive training programs for youth advocates
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Designing Advocacy Training Programs Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Watch this overview to understand how to design effective advocacy training programs
              </p>
            </div>
          </div>

          {/* Section Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                What You'll Learn in This Module
              </h2>
              
              {/* Language and Voice Controls */}
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                </select>
                
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => setSelectedVoiceURI(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {voices
                    .filter(v => v.lang === selectedLang || v.lang?.startsWith(selectedLang.split('-')[0]))
                    .map(v => (
                      <option key={v.voiceURI} value={v.voiceURI}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  {voices.length === 0 && (
                    <option value="">System default</option>
                  )}
                </select>
                
                <Button
                  onClick={handleFullScreen}
                  variant="outline"
                  size="icon"
                  className="p-2"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', 'Learn how to design and implement effective advocacy training programs that empower youth advocates and create lasting impact.')}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Learn how to design and implement effective advocacy training programs that empower 
                youth advocates and create lasting impact.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Program Design</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Curriculum development</li>
                  <li>• Learning objectives</li>
                  <li>• Training methodologies</li>
                  <li>• Evaluation strategies</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Implementation</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Resource allocation</li>
                  <li>• Stakeholder engagement</li>
                  <li>• Program delivery</li>
                  <li>• Impact assessment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 3.1: Co-designing Youth Training */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">👥</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 3.1: Co-designing Youth Training</h2>
                <p className="text-gray-600">Participatory design and storytelling approaches</p>
              </div>
            </div>

            {/* Step by Step Process Flow */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Co-Design Process</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-300"></div>
                <div className="space-y-6">
                  <div className="relative flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">1</div>
                    <div className="ml-6">
                      <h4 className="font-semibold text-gray-800">Stakeholder Engagement</h4>
                      <p className="text-sm text-gray-600">Identify and involve key youth participants and community leaders</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">2</div>
                    <div className="ml-6">
                      <h4 className="font-semibold text-gray-800">Story Collection</h4>
                      <p className="text-sm text-gray-600">Gather personal narratives and experiences from youth</p>
                    </div>
                  </div>
                  <div className="relative flex items-start">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10">3</div>
                    <div className="ml-6">
                      <h4 className="font-semibold text-gray-800">Design Workshops</h4>
                      <p className="text-sm text-gray-600">Collaborative sessions to develop training content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel for Design Methods */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Design Methods</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Storytelling</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Personal narratives</li>
                    <li>• Digital storytelling</li>
                    <li>• Visual journaling</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Participatory Methods</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Focus groups</li>
                    <li>• Design thinking</li>
                    <li>• Youth panels</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Creative Tools</h4>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Art workshops</li>
                    <li>• Digital media</li>
                    <li>• Role-playing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 3.2: Social Justice and Leadership */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 3.2: Social Justice and Leadership</h2>
                <p className="text-gray-600">Building a comprehensive curriculum for youth leaders</p>
              </div>
            </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="text-2xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">Leadership Skills</h4>
                <p className="text-sm text-gray-600">Developing core competencies for youth leadership</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="text-2xl mb-2">🤝</div>
                <h4 className="font-semibold text-gray-800 mb-2">Community Building</h4>
                <p className="text-sm text-gray-600">Creating inclusive and supportive environments</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <div className="text-2xl mb-2">⚖️</div>
                <h4 className="font-semibold text-gray-800 mb-2">Social Justice</h4>
                <p className="text-sm text-gray-600">Understanding systemic issues and advocacy</p>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              <div className="border rounded-lg">
                <button className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50">
                  <span className="font-medium">Core Leadership Principles</span>
                  <span className="transform transition-transform">▼</span>
                </button>
                <div className="px-4 py-3 bg-white">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Ethical decision-making</li>
                    <li>• Inclusive leadership</li>
                    <li>• Conflict resolution</li>
                  </ul>
                </div>
              </div>
              <div className="border rounded-lg">
                <button className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50">
                  <span className="font-medium">Social Justice Framework</span>
                  <span className="transform transition-transform">▼</span>
                </button>
                <div className="px-4 py-3 bg-white">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Understanding systemic inequities</li>
                    <li>• Advocacy strategies</li>
                    <li>• Community mobilization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 3.3: Digital Literacy and Civic Engagement */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">💻</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 3.3: Integrated Skills Development</h2>
                <p className="text-gray-600">Digital literacy, mental health, and civic engagement</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Implementation Timeline</h3>
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-24 font-semibold text-gray-600">Week 1-2</div>
                  <div className="flex-1 bg-blue-50 rounded-lg p-3">
                    <h4 className="font-semibold text-blue-800">Digital Literacy Foundations</h4>
                    <p className="text-sm text-gray-600">Basic skills and online safety</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 font-semibold text-gray-600">Week 3-4</div>
                  <div className="flex-1 bg-purple-50 rounded-lg p-3">
                    <h4 className="font-semibold text-purple-800">Mental Health Awareness</h4>
                    <p className="text-sm text-gray-600">Understanding and support strategies</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="w-24 font-semibold text-gray-600">Week 5</div>
                  <div className="flex-1 bg-green-50 rounded-lg p-3">
                    <h4 className="font-semibold text-green-800">Civic Engagement</h4>
                    <p className="text-sm text-gray-600">Community action and participation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Flashcards */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Concepts</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">💻</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Digital Citizenship</h4>
                    <p className="text-xs text-gray-600">Responsible online behavior</p>
                  </div>
                </div>
                <div className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🧠</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Mental Wellness</h4>
                    <p className="text-xs text-gray-600">Self-care and support</p>
                  </div>
                </div>
                <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">🗽</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2">Civic Action</h4>
                    <p className="text-xs text-gray-600">Community engagement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Lists and Paragraphs */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Digital Literacy Skills</h3>
                <p className="text-gray-700 mb-4">
                  In today's digital age, youth advocates need strong digital literacy skills to effectively engage with their communities and create change. Our comprehensive digital literacy curriculum covers essential skills from basic online safety to advanced digital advocacy tools.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Online safety and privacy</li>
                  <li>Digital communication tools</li>
                  <li>Social media advocacy</li>
                  <li>Content creation and sharing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Mental Health Integration</h3>
                <p className="text-gray-700 mb-4">
                  Mental health awareness is crucial for youth advocates who often deal with challenging social issues. Our program integrates mental health education and support strategies throughout the curriculum.
                </p>
                <div className="bg-purple-50 rounded-lg p-4">
                  <ul className="text-sm text-purple-800 space-y-2">
                    <li>• Understanding mental health basics</li>
                    <li>• Stress management techniques</li>
                    <li>• Peer support strategies</li>
                    <li>• Resource identification and referral</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Full Screen Modal */}
      <Dialog open={isFullScreenModalOpen} onOpenChange={setIsFullScreenModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="pb-4 border-b">
            <DialogTitle className="text-xl font-bold">
              Module 3: Designing Advocacy Training Programs
            </DialogTitle>
          </DialogHeader>
          {/* Modal content would mirror the main content structure */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod3YouthAdvocacy;
