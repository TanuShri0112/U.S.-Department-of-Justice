import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const LessonMod2YouthAdvocacy = () => {
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
              Module 2: Needs Assessment in Youth Advocacy
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Identifying and analyzing the needs of youth populations
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="aspect-video w-full max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-xl shadow-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Needs Assessment in Youth Advocacy Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Watch this overview to understand needs assessment in youth advocacy
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
                  onClick={() => handleSpeakToggle('lesson-text', 'Learn how to identify and assess the needs of youth populations through data collection, analysis, and community engagement.')}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? uiText.stop : uiText.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Learn how to identify and assess the needs of youth populations through data collection, 
                analysis, and community engagement.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Assessment Methods</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Surveys and questionnaires</li>
                  <li>• Focus group discussions</li>
                  <li>• Community mapping</li>
                  <li>• Data analysis techniques</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Key Outcomes</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Understanding youth needs</li>
                  <li>• Resource gap identification</li>
                  <li>• Community engagement strategies</li>
                  <li>• Action plan development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 2.1: Community Youth Needs */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">📊</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 2.1: Community Youth Needs</h2>
                <p className="text-gray-600">Identifying needs through data collection and outreach</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Data Collection Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-blue-800 mb-2">Quantitative Data</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Youth demographic surveys</li>
                      <li>• Program participation rates</li>
                      <li>• Educational outcomes data</li>
                      <li>• Community resource mapping</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-blue-800 mb-2">Qualitative Data</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Focus group discussions</li>
                      <li>• Youth interviews</li>
                      <li>• Parent feedback sessions</li>
                      <li>• Community leader insights</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 2.2: Skill-building Gaps */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">🎯</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 2.2: Skill-building Gaps</h2>
                <p className="text-gray-600">Assessing and addressing gaps in youth programs</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Gap Analysis Framework</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-green-800 mb-2">Current State</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Existing programs</li>
                      <li>• Available resources</li>
                      <li>• Current outcomes</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-green-800 mb-2">Desired State</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Target outcomes</li>
                      <li>• Required skills</li>
                      <li>• Success metrics</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-green-800 mb-2">Action Plan</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Program adjustments</li>
                      <li>• Resource allocation</li>
                      <li>• Timeline development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 2.3: Service Coordination */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl text-white">🤝</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Topic 2.3: Service Coordination</h2>
                <p className="text-gray-600">Working with schools and law enforcement</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Stakeholder Collaboration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">School Partnerships</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Academic support programs</li>
                      <li>• After-school activities</li>
                      <li>• Counseling services</li>
                      <li>• Teacher training</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-purple-800 mb-2">Law Enforcement Coordination</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Youth outreach programs</li>
                      <li>• Prevention initiatives</li>
                      <li>• Community policing</li>
                      <li>• Safety education</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Best Practices Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Practices for Coordination</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">📝</span>
                      <h4 className="font-semibold text-gray-800">Clear Communication</h4>
                    </div>
                    <p className="text-sm text-gray-600">Establish regular meetings and reporting structures between all stakeholders</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">🎯</span>
                      <h4 className="font-semibold text-gray-800">Shared Goals</h4>
                    </div>
                    <p className="text-sm text-gray-600">Define common objectives and success metrics for all partners</p>
                  </div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">📊</span>
                      <h4 className="font-semibold text-gray-800">Data Sharing</h4>
                    </div>
                    <p className="text-sm text-gray-600">Implement secure systems for sharing relevant information and outcomes</p>
                  </div>
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
              Module 2: Needs Assessment in Youth Advocacy
            </DialogTitle>
          </DialogHeader>
          {/* Modal content would mirror the main content structure */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonMod2YouthAdvocacy;
