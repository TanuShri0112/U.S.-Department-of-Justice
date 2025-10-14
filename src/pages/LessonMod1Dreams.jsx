import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Play, Pause, X, Heart, ExternalLink, FileDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';


const LessonMod1Dreams = () => {
  const navigate = useNavigate();
  const [speakingBlocks, setSpeakingBlocks] = useState({});
  const [voices, setVoices] = useState([]);
  const [selectedLang, setSelectedLang] = useState('en-US');
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');
  const [isFullScreenModalOpen, setIsFullScreenModalOpen] = useState(false);
  const [audioLang, setAudioLang] = useState('en-US'); // Local state for audio section only
  const [quizAnswers, setQuizAnswers] = useState({}); // State for quiz answers
  const [isTTSPlaying, setIsTTSPlaying] = useState(false); // TTS state
  const [currentTTSIndex, setCurrentTTSIndex] = useState(0); // Current topic being read
  const textRef = useRef(null);

  // Language options - Only languages with commonly available voices
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'en-AU', label: '🇦🇺 English (Australia)' },
    { code: 'en-CA', label: '🇨🇦 English (Canada)' },
    { code: 'hi-IN', label: '🇮🇳 हिन्दी (Hindi)' },
    { code: 'mr-IN', label: '🇮🇳 मराठी (Marathi)' },
    { code: 'ta-IN', label: '🇮🇳 தமிழ் (Tamil)' },
    { code: 'te-IN', label: '🇮🇳 తెలుగు (Telugu)' },
    { code: 'bn-IN', label: '🇮🇳 বাংলা (Bengali)' },
    { code: 'gu-IN', label: '🇮🇳 ગુજરાતી (Gujarati)' },
    { code: 'kn-IN', label: '🇮🇳 ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', label: '🇮🇳 മലയാളം (Malayalam)' },
    { code: 'pa-IN', label: '🇮🇳 ਪੰਜਾਬੀ (Punjabi)' },
    { code: 'ur-IN', label: '🇮🇳 اردو (Urdu)' },
    { code: 'fr-FR', label: '🇫🇷 Français (French)' },
    { code: 'fr-CA', label: '🇨🇦 Français (Canada)' },
    { code: 'de-DE', label: '🇩🇪 Deutsch (German)' },
    { code: 'es-ES', label: '🇪🇸 Español (Spain)' },
    { code: 'es-MX', label: '🇲🇽 Español (Mexico)' },
    { code: 'it-IT', label: '🇮🇹 Italiano (Italian)' },
    { code: 'pt-PT', label: '🇵🇹 Português (Portugal)' },
    { code: 'pt-BR', label: '🇧🇷 Português (Brazil)' },
    { code: 'nl-NL', label: '🇳🇱 Nederlands (Dutch)' },
    { code: 'sv-SE', label: '🇸🇪 Svenska (Swedish)' },
    { code: 'no-NO', label: '🇳🇴 Norsk (Norwegian)' },
    { code: 'da-DK', label: '🇩🇰 Dansk (Danish)' },
    { code: 'fi-FI', label: '🇫🇮 Suomi (Finnish)' },
    { code: 'pl-PL', label: '🇵🇱 Polski (Polish)' },
    { code: 'ru-RU', label: '🇷🇺 Русский (Russian)' },
    { code: 'uk-UA', label: '🇺🇦 Українська (Ukrainian)' },
    { code: 'cs-CZ', label: '🇨🇿 Čeština (Czech)' },
    { code: 'sk-SK', label: '🇸🇰 Slovenčina (Slovak)' },
    { code: 'hu-HU', label: '🇭🇺 Magyar (Hungarian)' },
    { code: 'ro-RO', label: '🇷🇴 Română (Romanian)' },
    { code: 'bg-BG', label: '🇧🇬 Български (Bulgarian)' },
    { code: 'hr-HR', label: '🇭🇷 Hrvatski (Croatian)' },
    { code: 'sl-SI', label: '🇸🇮 Slovenščina (Slovenian)' },
    { code: 'et-EE', label: '🇪🇪 Eesti (Estonian)' },
    { code: 'lv-LV', label: '🇱🇻 Latviešu (Latvian)' },
    { code: 'lt-LT', label: '🇱🇹 Lietuvių (Lithuanian)' },
    { code: 'el-GR', label: '🇬🇷 Ελληνικά (Greek)' },
    { code: 'tr-TR', label: '🇹🇷 Türkçe (Turkish)' },
    { code: 'is-IS', label: '🇮🇸 Íslenska (Icelandic)' },
    { code: 'mt-MT', label: '🇲🇹 Malti (Maltese)' },
    { code: 'ja-JP', label: '🇯🇵 日本語 (Japanese)' },
    { code: 'ko-KR', label: '🇰🇷 한국어 (Korean)' },
    { code: 'zh-CN', label: '🇨🇳 中文 (Chinese Simplified)' },
    { code: 'zh-TW', label: '🇹🇼 繁體中文 (Chinese Traditional)' },
    { code: 'th-TH', label: '🇹🇭 ไทย (Thai)' },
    { code: 'vi-VN', label: '🇻🇳 Tiếng Việt (Vietnamese)' },
    { code: 'id-ID', label: '🇮🇩 Bahasa Indonesia (Indonesian)' },
    { code: 'ms-MY', label: '🇲🇾 Bahasa Melayu (Malay)' },
    { code: 'fil-PH', label: '🇵🇭 Filipino (Philippines)' },
    { code: 'ar-SA', label: '🇸🇦 العربية (Arabic)' },
    { code: 'he-IL', label: '🇮🇱 עברית (Hebrew)' },
    { code: 'fa-IR', label: '🇮🇷 فارسی (Persian)' }
  ]), []);

  // UI text based on selected language
  const uiText = React.useMemo(() => {
    const map = {
      'en': { 
        backToModules: 'Back to Modules',
        module1: 'Module 1: Foundations of Law Enforcement Training in the U.S.',
        courseTitle: 'Law Enforcement Training',
        description: 'Comprehensive training program covering foundations, stakeholder analysis, and curriculum design for law enforcement professionals',
        complete: 'Complete Module'
      },
      'hi': { 
        backToModules: 'मà¥‰अ¡à¥अ¯à¥‚अ²à¥अ¸ अªअ° अµअ¾अªअ¸ अœअ¾अअ‚',
        module1: 'मà¥‰अ¡à¥अ¯à¥‚अ² 1: अ…अªअ¨à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अ¸मअअ¨अ¾',
        courseTitle: 'अ¸अªअ¨à¥‹अ‚ अ•à¥€ अ°अ•à¥अ·अ¾',
        description: 'अœअ¾अ¨à¥‡अ‚ अ•अ¿ अ†अªअ•à¥‡ अªअ°अ¿अµअ¾अ° अ•à¥‡ अ­अµअ¿अ·à¥अ¯ अ•à¥‡ अ²अ¿अ अµअ¿अ¤à¥अ¤à¥€अ¯ अ¸à¥अ°अ•à¥अ·अ¾ अ•अ¾ अ•à¥अ¯अ¾ मअ¤अ²अ¬ अ¹à¥ˆ',
        complete: 'मà¥‰अ¡à¥अ¯à¥‚अ² अªà¥‚अ°अ¾ अ•अ°à¥‡अ‚'
      },
      'mr': { 
        backToModules: 'मà¥‰अ¡à¥अ¯à¥‚अ²à¥अ¸अ•अ¡à¥‡ अªअ°अ¤ अœअ¾',
        module1: 'मà¥‰अ¡à¥अ¯à¥‚अ² 1: अ¤à¥मअšà¥‡ अ¸à¥अµअªà¥अ¨à¥‡ अ¸मअœà¥‚अ¨ अ˜à¥‡अ£à¥‡',
        courseTitle: 'अ¸à¥अµअªà¥अ¨अ¾अ‚अšà¥‡ अ¸अ‚अ°अ•à¥अ·अ£',
        description: 'अ¤à¥मअšà¥अ¯अ¾ अ•à¥अŸà¥अ‚अ¬अ¾अšà¥अ¯अ¾ अ­अµअ¿अ·à¥अ¯अ¾अ¸अ¾अ à¥€ अ†अ°à¥अ¥अ¿अ• अ¸à¥अ°अ•à¥अ·अ¾ मà¥अ¹अ£अœà¥‡ अ•अ¾अ¯ अ¹à¥‡ अœअ¾अ£à¥‚अ¨ अ˜à¥अ¯अ¾अ². अ†मà¥अ¹à¥€ अµà¥अ¯अ¾अµअ¹अ¾अ°अ¿अ• अªअ¾अµअ²à¥‡ अ¸अ¾अ‚अ—à¥‚ अœà¥अ¯अ¾मà¥अ³à¥‡ अ¤à¥मà¥अ¹à¥€ अअ• मअœअ¬à¥‚अ¤ अ†अ°à¥अ¥अ¿अ• अªअ¾अ¯अ¾ अ¤अ¯अ¾अ° अ•अ°à¥‚ अ¶अ•अ¤अ¾ अœà¥‹ अ…अ¨अ¿अ¶à¥अšअ¿अ¤अ¤à¥‡अ¤अ¹à¥€ अ¸à¥अµअªà¥अ¨à¥‡ मअ¾अ°à¥अ—अ¾अµअ° अ à¥‡अµअ¤à¥‹.',
        complete: 'मà¥‰अ¡à¥अ¯à¥‚अ² अªà¥‚अ°à¥अ£ अ•अ°अ¾'
      }
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
      
      const defaultVoice = v.find(voice => voice.lang === selectedLang) || 
                          v.find(voice => voice.lang?.startsWith(selectedLang.split('-')[0])) || 
                          v[0];
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
    
    // Enhanced voice selection with fallback strategies
    const findBestVoice = (targetLang) => {
      // Strategy 1: Exact language code match
      let exactMatch = voices.find(voice => voice.lang === targetLang);
      if (exactMatch) return exactMatch;

      // Strategy 2: Case-insensitive exact match
      exactMatch = voices.find(voice => 
        voice.lang.toLowerCase() === targetLang.toLowerCase()
      );
      if (exactMatch) return exactMatch;

      // Strategy 3: Base language match (e.g., 'hi' for 'hi-IN')
      const baseLanguage = targetLang.substring(0, 2);
      const baseMatch = voices.find(voice => 
        voice.lang.startsWith(baseLanguage + '-') || 
        voice.lang === baseLanguage ||
        voice.lang.includes(baseLanguage)
      );
      if (baseMatch) return baseMatch;

      // Strategy 4: Language family matching for all languages
      const languageFamilyMap = {
        // Indian Languages
        'hi': ['hi', 'hin', 'hindi'],
        'ta': ['ta', 'tam', 'tamil'],
        'te': ['te', 'tel', 'telugu'],
        'bn': ['bn', 'ben', 'bengali'],
        'gu': ['gu', 'guj', 'gujarati'],
        'kn': ['kn', 'kan', 'kannada'],
        'ml': ['ml', 'mal', 'malayalam'],
        'mr': ['mr', 'mar', 'marathi'],
        'pa': ['pa', 'pan', 'punjabi'],
        'ur': ['ur', 'urd', 'urdu'],
        'or': ['or', 'ori', 'odia'],
        'as': ['as', 'asm', 'assamese'],
        'ne': ['ne', 'nep', 'nepali'],
        'sa': ['sa', 'san', 'sanskrit'],
        
        // European Languages
        'en': ['en', 'eng', 'english'],
        'fr': ['fr', 'fre', 'french'],
        'de': ['de', 'ger', 'german'],
        'es': ['es', 'spa', 'spanish'],
        'it': ['it', 'ita', 'italian'],
        'pt': ['pt', 'por', 'portuguese'],
        'nl': ['nl', 'dut', 'dutch'],
        'sv': ['sv', 'swe', 'swedish'],
        'no': ['no', 'nor', 'norwegian'],
        'da': ['da', 'dan', 'danish'],
        'fi': ['fi', 'fin', 'finnish'],
        'pl': ['pl', 'pol', 'polish'],
        'ru': ['ru', 'rus', 'russian'],
        'uk': ['uk', 'ukr', 'ukrainian'],
        'cs': ['cs', 'cze', 'czech'],
        'sk': ['sk', 'slo', 'slovak'],
        'hu': ['hu', 'hun', 'hungarian'],
        'ro': ['ro', 'rum', 'romanian'],
        'bg': ['bg', 'bul', 'bulgarian'],
        'hr': ['hr', 'hrv', 'croatian'],
        'sl': ['sl', 'slv', 'slovenian'],
        'et': ['et', 'est', 'estonian'],
        'lv': ['lv', 'lav', 'latvian'],
        'lt': ['lt', 'lit', 'lithuanian'],
        'el': ['el', 'gre', 'greek'],
        'tr': ['tr', 'tur', 'turkish'],
        'is': ['is', 'ice', 'icelandic'],
        'mt': ['mt', 'mlt', 'maltese'],
        
        // Asian Languages
        'ja': ['ja', 'jpn', 'japanese'],
        'ko': ['ko', 'kor', 'korean'],
        'zh': ['zh', 'chi', 'chinese'],
        'th': ['th', 'tha', 'thai'],
        'vi': ['vi', 'vie', 'vietnamese'],
        'id': ['id', 'ind', 'indonesian'],
        'ms': ['ms', 'may', 'malay'],
        'fil': ['fil', 'tag', 'filipino'],
        'ar': ['ar', 'ara', 'arabic'],
        'he': ['he', 'heb', 'hebrew'],
        'fa': ['fa', 'per', 'persian'],
        
        // African & Other Languages
        'af': ['af', 'afr', 'afrikaans'],
        'sw': ['sw', 'swa', 'swahili'],
        'am': ['am', 'amh', 'amharic'],
        'yo': ['yo', 'yor', 'yoruba'],
        'ig': ['ig', 'ibo', 'igbo'],
        'ha': ['ha', 'hau', 'hausa'],
        'zu': ['zu', 'zul', 'zulu'],
        'xh': ['xh', 'xho', 'xhosa'],
        'st': ['st', 'sot', 'sotho'],
        'tn': ['tn', 'tsn', 'tswana'],
        'so': ['so', 'som', 'somali'],
        'rw': ['rw', 'kin', 'kinyarwanda'],
        'lg': ['lg', 'lug', 'luganda'],
        'mg': ['mg', 'mlg', 'malagasy'],
        'ht': ['ht', 'hat', 'haitian'],
        'qu': ['qu', 'que', 'quechua'],
        'gn': ['gn', 'grn', 'guarani'],
        'ay': ['ay', 'aym', 'aymara'],
        'mi': ['mi', 'mao', 'maori'],
        'haw': ['haw', 'haw', 'hawaiian'],
        'fj': ['fj', 'fij', 'fijian'],
        'sm': ['sm', 'smo', 'samoan'],
        'to': ['to', 'ton', 'tongan'],
        'ty': ['ty', 'tah', 'tahitian']
      };
      
      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
      const familyMatch = voices.find(voice => 
        familyCodes.some(code => 
          voice.lang.toLowerCase().includes(code.toLowerCase())
        )
      );
      
      if (familyMatch) return familyMatch;

      // Strategy 5: Fallback to any available voice
      return voices[0];
    };

    const voice = findBestVoice(selectedLang);
    if (voice) {
      utter.voice = voice;
      utter.lang = voice.lang; // Use the voice's actual language code
    } else {
      // Don't proceed if no voice is available
      toast.error(`No voice available for ${selectedLang}. Please try another language.`);
      return;
    }
    
    utter.rate = 0.8; // Slower for better pronunciation
    utter.pitch = 1.0;
    utter.volume = 1.0;
    
    utter.onend = () => setSpeakingBlocks(prev => ({ ...prev, [blockKey]: false }));
    setSpeakingBlocks(prev => ({ ...prev, [blockKey]: true }));
    synth.speak(utter);
  };

  // TTS Functions for Law Enforcement Training Content
  const lawEnforcementContent = [
    {
      title: "Adult Learning in Tactical & Compliance Settings",
      content: "Understanding Andragogy in Policing. Adult learning principles are crucial for effective law enforcement training. Unlike traditional pedagogy, andragogy recognizes that adult learners bring life experiences and prefer self-directed learning. Key principles include self-directed learning where officers prefer to control their learning pace, build on existing experience and knowledge, and focus on practical job-relevant skills. Problem-centered approach uses real-world scenarios and case studies, connects training to actual policing situations, and emphasizes practical application over theory. Experience-based learning leverages officers' field experience, uses peer-to-peer learning opportunities, and encourages reflection on past incidents."
    },
    {
      title: "DOJ & POST Training Requirements", 
      content: "Federal and State Training Standards. The Department of Justice and Peace Officer Standards and Training programs establish comprehensive training requirements for law enforcement professionals. Federal standards include constitutional law updates, civil rights training, use of force protocols, and specialized role training requirements. State POST requirements vary by jurisdiction but typically include basic academy training, field training programs, continuing education credits, and recertification processes. Documentation and reporting protocols ensure compliance with federal and state standards, maintain training records, and provide audit trails for accountability."
    },
    {
      title: "Ethical & Civil Rights Foundations",
      content: "Use of Force, Miranda, Implicit Bias. Ethical foundations in law enforcement training focus on constitutional rights, civil liberties, and professional conduct standards. Use of force training covers the force continuum from presence to deadly force, emphasizing de-escalation techniques and objective reasonableness standards. Miranda rights training ensures proper custodial interrogation procedures and constitutional protections. Implicit bias awareness prevents discriminatory practices through recognition of unconscious biases, cultural competency training, and fair and impartial policing principles."
    },
    {
      title: "Trauma-informed Instruction for First Responders",
      content: "Supporting First Responders' Mental Health. Trauma-informed training recognizes the psychological impact of law enforcement work on officers and the communities they serve. This approach includes understanding trauma exposure types such as direct trauma, vicarious trauma, and organizational trauma. Support resources include peer support programs, mental health services, and critical incident stress management. Training principles focus on creating safe learning environments, recognizing trauma symptoms, and implementing self-care strategies for long-term career sustainability."
    }
  ];

  const handleTTSPlayPause = () => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    if (isTTSPlaying) {
      synth.cancel();
      setIsTTSPlaying(false);
      setCurrentTTSIndex(0);
      return;
    }

    // Start reading from current topic
    const currentTopic = lawEnforcementContent[currentTTSIndex];
    if (!currentTopic) return;

    const utter = new SpeechSynthesisUtterance();
    utter.text = `${currentTopic.title}. ${currentTopic.content}`;
    utter.rate = 0.8;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    utter.onend = () => {
      if (currentTTSIndex < lawEnforcementContent.length - 1) {
        setCurrentTTSIndex(prev => prev + 1);
        // Continue to next topic
        setTimeout(() => {
          const nextTopic = lawEnforcementContent[currentTTSIndex + 1];
          if (nextTopic) {
            const nextUtter = new SpeechSynthesisUtterance();
            nextUtter.text = `${nextTopic.title}. ${nextTopic.content}`;
            nextUtter.rate = 0.8;
            nextUtter.pitch = 1.0;
            nextUtter.volume = 1.0;
            nextUtter.onend = () => {
              if (currentTTSIndex + 1 < lawEnforcementContent.length - 1) {
                setCurrentTTSIndex(prev => prev + 1);
              } else {
                setIsTTSPlaying(false);
                setCurrentTTSIndex(0);
              }
            };
            synth.speak(nextUtter);
          }
        }, 500);
      } else {
        setIsTTSPlaying(false);
        setCurrentTTSIndex(0);
      }
    };

    setIsTTSPlaying(true);
    synth.speak(utter);
  };

  const handleTTSStop = () => {
    const synth = window.speechSynthesis;
    if (synth) {
      synth.cancel();
    }
    setIsTTSPlaying(false);
    setCurrentTTSIndex(0);
  };

  const handleFullScreen = () => {
    setIsFullScreenModalOpen(true);
  };

  const handleCompleteModule = () => {
    // Mark module as complete and navigate back
    toast.success('Module 1 completed successfully!');
    navigate(-1);
  };

  const baseLang = (selectedLang || 'en-US').split('-')[0];
  const completionMsg = baseLang === 'en'
    ? 'Complete this module to unlock Module 2'
    : baseLang === 'hi'
    ? 'मà¥‰अ¡à¥अ¯à¥‚अ² 2 अ•à¥‹ अ…अ¨अ²à¥‰अ• अ•अ°अ¨à¥‡ अ•à¥‡ अ²अ¿अ अ‡अ¸ मà¥‰अ¡à¥अ¯à¥‚अ² अ•à¥‹ अªà¥‚अ°अ¾ अ•अ°à¥‡अ‚'
    : 'मà¥‰अ¡à¥अ¯à¥‚अ² 2 अ…अ¨अ²à¥‰अ• अ•अ°अ£à¥अ¯अ¾अ¸अ¾अ à¥€ अ¹à¥‡ मà¥‰अ¡à¥अ¯à¥‚अ² अªà¥‚अ°à¥अ£ अ•अ°अ¾';

  const t = React.useMemo(() => {
    if (baseLang === 'hi') {
      return {
        introTitle: 'अªअ¾अ  1: अ…अªअ¨à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अ¸मअअ¨अ¾',
        introSubtitle: 'अœअ¾अ¨à¥‡अ‚ अ•अ¿ अ†अªअ•à¥‡ अªअ°अ¿अµअ¾अ° अ•à¥‡ अ­अµअ¿अ·à¥अ¯ अ•à¥‡ अ²अ¿अ अµअ¿अ¤à¥अ¤à¥€अ¯ अ¸à¥अ°अ•à¥अ·अ¾ अ•अ¾ अ•à¥अ¯अ¾ मअ¤अ²अ¬ अ¹à¥ˆ',
        learnTitle: 'अ‡अ¸ अªअ¾अ  मà¥‡अ‚ अ†अª अ•à¥अ¯अ¾ अ¸à¥€अ–à¥‡अ‚अ—à¥‡',
        listen: 'अ¸à¥अ¨à¥‡अ‚',
        stop: 'अ°à¥‹अ•à¥‡अ‚',
        outcomesTitle: 'अªअ°अ¿अ£अ¾म',
        toolsTitle: 'अ†अª अœअ¿अ¨ अ‰अªअ•अ°अ£à¥‹अ‚ अ•अ¾ अ‰अªअ¯à¥‹अ— अ•अ°à¥‡अ‚अ—à¥‡',
        paragraph:
          'अ‡अ¸ अªअ¾अ  मà¥‡अ‚, अ†अª अ…अªअ¨à¥‡ अ¸अ¬अ¸à¥‡ मअ¹अ¤à¥अµअªà¥‚अ°à¥अ£ अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अ¸à¥अªअ·à¥अŸ अ•अ°à¥‡अ‚अ—à¥‡ अ”अ° अœअ¾अ¨à¥‡अ‚अ—à¥‡ अ•अ¿ अ‰अ¨à¥अ¹à¥‡अ‚ अ¶à¥अ°à¥अ†अ¤à¥€ अšअ°अ£ मà¥‡अ‚ अ¸à¥अ°अ•à¥अ·अ¿अ¤ अ•अ°अ¨अ¾ अ•à¥अ¯à¥‹अ‚ अ†अµअ¶à¥अ¯अ• अ¹à¥ˆà¥¤ अ¹म अµà¥अ¯अ¾अµअ¹अ¾अ°अ¿अ• अ•अ¦म अ¬अ¤अ¾अअ‚अ—à¥‡ अœअ¿अ¸अ¸à¥‡ अ†अª अअ• मअœअ¬à¥‚अ¤ अµअ¿अ¤à¥अ¤à¥€अ¯ अ¨à¥€अ‚अµ अ¬अ¨अ¾ अ¸अ•à¥‡अ‚ अœà¥‹ अ…अ¨अ¿अ¶à¥अšअ¿अ¤ अªअ°अ¿अ¸à¥अ¥अ¿अ¤अ¿अ¯à¥‹अ‚ मà¥‡अ‚ अ­à¥€ अ†अªअ•à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अŸà¥अ°à¥ˆअ• अªअ° अ°अ–à¥‡à¥¤',
        outcomes: ['• अ…अªअ¨à¥‡ अ²अ•à¥अ·à¥अ¯à¥‹अ‚ अ•à¥‹ अªअ°अ¿अ­अ¾अ·अ¿अ¤ अ”अ° अªà¥अ°अ¾अ¥मअ¿अ•अ¤अ¾ अ¦à¥‡अ‚', '• अªà¥अ°मà¥अ– अœà¥‹अ–अ¿म अ”अ° अ¸à¥अ°अ•à¥अ·अ¾ अ•à¥‹ अ¸मअà¥‡अ‚', '• अअ• अ¸अ°अ² अ•अ¾अ°à¥अ¯अ¯à¥‹अœअ¨अ¾ अ¬अ¨अ¾अअ', '• अ¤अ¿मअ¾अ¹à¥€ अ¸मà¥€अ•à¥अ·अ¾ अ•à¥अ¯अ¾ अ•अ°à¥‡अ‚ अœअ¾अ¨à¥‡अ‚'],
        tools: ['• अ¡à¥अ°à¥€म अ¬अ¿अ²à¥अ¡अ° अšà¥‡अ•अ²अ¿अ¸à¥अŸ', '• अœà¥‹अ–अ¿म मà¥‚अ²à¥अ¯अ¾अ‚अ•अ¨ अªà¥‰अ‡अ‚अŸअ°à¥अ¸', '• अ¸à¥अŸअ¾अ°à¥अŸअ° अªà¥अ°à¥‹अŸà¥‡अ•à¥अ¶अ¨ मअ¿अ•à¥अ¸', '• अ¸मà¥€अ•à¥अ·अ¾ अ†अµà¥ƒअ¤à¥अ¤अ¿ अŸà¥‡मà¥अªअ²à¥‡अŸ'],
        audioSection: 'अ¸à¥‡अ•à¥अ¶अ¨ 2: अ‘अ¡अ¿अ¯à¥‹ अµअ¿अµअ°अ£',
        chooseNarration: 'अµअ°à¥अ£अ¨ अ­अ¾अ·अ¾ अšà¥अ¨à¥‡अ‚',
        listenToLesson: 'अªअ¾अ  अ¸à¥अ¨à¥‡अ‚',
        hoverToFlip: 'अ«à¥अ²अ¿अª अ•अ°अ¨à¥‡ अ¹à¥‡अ¤à¥ अ¹à¥‹अµअ° अ•अ°à¥‡अ‚',
        summary: 'सारांश',
        studyKeyIdeas: 'मà¥अ–à¥अ¯ अµअ¿अšअ¾अ°à¥‹अ‚ अ•अ¾ अ…अ§à¥अ¯अ¯अ¨ अ•अ°अ¨à¥‡ अ•à¥‡ अ²अ¿अ अ¸à¥अµअ¾अ‡अª अ¯अ¾ अ¹à¥‹अµअ° अ•अ°à¥‡अ‚',
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'अªअ¾अ  1: अ¤à¥मअšà¥‡ अ¸à¥अµअªà¥अ¨à¥‡ अ¸मअœà¥‚अ¨ अ˜à¥‡अ£à¥‡',
        introSubtitle: 'अ¤à¥मअšà¥अ¯अ¾ अ•à¥अŸà¥अ‚अ¬अ¾अšà¥अ¯अ¾ अ­अµअ¿अ·à¥अ¯अ¾अ¸अ¾अ à¥€ अ†अ°à¥अ¥अ¿अ• अ¸à¥अ°अ•à¥अ·अ¾ मà¥अ¹अ£अœà¥‡ अ•अ¾अ¯ अ¹à¥‡ अœअ¾अ£à¥‚अ¨ अ˜à¥अ¯अ¾अ². अ†मà¥अ¹à¥€ अµà¥अ¯अ¾अµअ¹अ¾अ°अ¿अ• अªअ¾अµअ²à¥‡ अ¸अ¾अ‚अ—à¥‚ अœà¥अ¯अ¾मà¥अ³à¥‡ अ¤à¥मà¥अ¹à¥€ अअ• मअœअ¬à¥‚अ¤ अ†अ°à¥अ¥अ¿अ• अªअ¾अ¯अ¾ अ¤अ¯अ¾अ° अ•अ°à¥‚ अ¶अ•अ¤अ¾ अœà¥‹ अ…अ¨अ¿अ¶à¥अšअ¿अ¤अ¤à¥‡अ¤अ¹à¥€ अ¸à¥अµअªà¥अ¨à¥‡ मअ¾अ°à¥अ—अ¾अµअ° अ à¥‡अµअ¤à¥‹.',
        learnTitle: 'अ¯अ¾ अ§अ¡à¥अ¯अ¾अ¤ अ¤à¥मà¥अ¹à¥€ अ•अ¾अ¯ अ¶अ¿अ•अ¾अ²',
        listen: 'अअ•अ¾',
        stop: 'अ¥अ¾अ‚अ¬अµअ¾',
        outcomesTitle: 'अªअ°अ¿अ£अ¾म',
        toolsTitle: 'अ¤à¥मà¥अ¹à¥€ अµअ¾अªअ°अ£अ¾अ°à¥€ अ¸अ¾अ§अ¨à¥‡',
        paragraph:
          'अ¯अ¾ अ§अ¡à¥अ¯अ¾अ¤, अ¤à¥मà¥अ¹à¥€ अ¤à¥मअšà¥€ अ¸अ°à¥अµअ¾अ¤ मअ¹अ¤à¥अ¤à¥अµअ¾अšà¥€ अ¸à¥अµअªà¥अ¨à¥‡ अ¸à¥अªअ·à¥अŸ अ•अ°अ¾अ² अ†अ£अ¿ अ¤à¥अ¯अ¾अ‚अ¨अ¾ अ²अµअ•अ° अ¸अ‚अ°अ•à¥अ·अ¿अ¤ अ•अ°अ£à¥‡ अ•अ¾ अ†अµअ¶à¥अ¯अ• अ†अ¹à¥‡ अ¹à¥‡ अœअ¾अ£à¥‚अ¨ अ˜à¥अ¯अ¾अ². अ†मà¥अ¹à¥€ अµà¥अ¯अ¾अµअ¹अ¾अ°अ¿अ• अªअ¾अµअ²à¥‡ अ¸अ¾अ‚अ—à¥‚ अœà¥अ¯अ¾मà¥अ³à¥‡ अ¤à¥मà¥अ¹à¥€ अअ• मअœअ¬à¥‚अ¤ अ†अ°à¥अ¥अ¿अ• अªअ¾अ¯अ¾ अ¤अ¯अ¾अ° अ•अ°à¥‚ अ¶अ•अ¤अ¾ अœà¥‹ अ…अ¨अ¿अ¶à¥अšअ¿अ¤अ¤à¥‡अ¤अ¹à¥€ अ¸à¥अµअªà¥अ¨à¥‡ मअ¾अ°à¥अ—अ¾अµअ° अ à¥‡अµअ¤à¥‹.',
        outcomes: ['• अ§à¥अ¯à¥‡अ¯à¥‡ अªअ°अ¿अ­अ¾अ·अ¿अ¤ अ•अ°अ¾ अ†अ£अ¿ अªà¥अ°अ¾अ§अ¾अ¨à¥अ¯ अ¦à¥अ¯अ¾', '• अªà¥अ°मà¥अ– अ§à¥‹अ•à¥‡ अ†अ£अ¿ अ¸अ‚अ°अ•à¥अ·अ£ अ¸मअœअ¾', '• अ¸अ¾अ§à¥€ अ•à¥ƒअ¤à¥€ अ¯à¥‹अœअ¨अ¾ अ¤अ¯अ¾अ° अ•अ°अ¾', '• अ¤अ¿मअ¾अ¹à¥€ अªà¥अ¨अ°अ¾अµअ²à¥‹अ•अ¨ अ•अ¾अ¯ अ•अ°अ¾अ¯अšà¥‡ अ¤à¥‡ अœअ¾अ£à¥‚अ¨ अ˜à¥अ¯अ¾'],
        tools: ['• अ¡à¥अ°à¥€म अ¬अ¿अ²à¥अ¡अ° अšà¥‡अ•अ²अ¿अ¸à¥अŸ', '• अœà¥‹अ–à¥€म मà¥‚अ²à¥अ¯अ¾अ‚अ•अ¨ अªà¥‰अˆअ‚अŸअ°à¥अ¸', '• अ¸à¥अŸअ¾अ°à¥अŸअ° अªà¥अ°à¥‹अŸà¥‡अ•à¥अ¶अ¨ मअ¿अ•à¥अ¸', '• अªà¥अ¨अ°अ¾अµअ²à¥‹अ•अ¨ अµअ¾अ°अ‚अµअ¾अ°अ¤अ¾ अŸà¥‡मà¥अªअ²à¥‡अŸ'],
        audioSection: 'अµअ¿अ­अ¾अ— 2: अ‘अ¡अ¿अ“ अ¨अ¿अµà¥‡अ¦अ¨',
        chooseNarration: 'अ¨अ¿अµà¥‡अ¦अ¨ अ­अ¾अ·अ¾ अ¨अ¿अµअ¡अ¾',
        listenToLesson: 'अªअ¾अ  अअ•अ¾',
        hoverToFlip: 'अ«à¥अ²अ¿अªअ¸अ¾अ à¥€ अ¹à¥‹अµअ° अ•अ°अ¾',
        summary: 'सारांश',
        studyKeyIdeas: 'मअ¹अ¤à¥अ¤à¥अµअ¾अšà¥अ¯अ¾ अ•अ²à¥अªअ¨अ¾ अ…अ­à¥अ¯अ¾अ¸अ£à¥अ¯अ¾अ¸अ¾अ à¥€ अ¸à¥अµअ¾अ‡अª अ•अ¿अ‚अµअ¾ अ¹à¥‹अµअ° अ•अ°अ¾',
      };
    }
    return {
      introTitle: 'Module 1: Foundations of Law Enforcement Training in the U.S.',
      introSubtitle: "Master the essential principles and frameworks for effective law enforcement training",
      learnTitle: "What You'll Learn in This Module",
      listen: 'Listen',
      stop: 'Stop',
      outcomesTitle: 'Outcomes',
      toolsTitle: "Tools You'll Use",
      paragraph:
        "This module provides the foundational knowledge needed to design and deliver effective law enforcement training programs. You'll learn about adult learning principles, compliance requirements, ethical frameworks, and trauma-informed approaches that are essential for modern law enforcement training.",
      outcomes: ['• Master adult learning principles for law enforcement', '• Understand DOJ and POST training requirements', '• Apply ethical and civil rights foundations', '• Implement trauma-informed training approaches'],
      tools: ['• Adult learning assessment framework', '• Compliance tracking templates', '• Ethical decision-making guides', '• Trauma-informed training protocols'],
      audioSection: 'Audio Narration',
      chooseNarration: 'Choose Narration Language',
      listenToLesson: 'Listen to Lesson',
      hoverToFlip: 'Hover to flip',
      summary: 'Summary',
      studyKeyIdeas: 'Swipe or hover to study key ideas',
    };
  }, [baseLang]);

  const studyCards = React.useMemo(() => {
    if (baseLang === 'hi') {
      return [
        {
          title: 'अ†अªअ•à¥‡ अ¸अªअ¨à¥‡ अ•à¥अ¯अ¾ अ¹à¥ˆअ‚?',
          front: ['मà¥अ–à¥अ¯ अœà¥€अµअ¨ अ²अ•à¥अ·à¥अ¯à¥‹अ‚ अ•à¥€ अªअ¹अšअ¾अ¨', 'अ²अ˜à¥/अ¦à¥€अ°à¥अ˜अ•अ¾अ²अ¿अ• अ†अ•अ¾अ‚अ•à¥अ·अ¾अअ‚ अ¸à¥‚अšà¥€अ¬अ¦à¥अ§ अ•अ°à¥‡अ‚', 'अªà¥अ°अ­अ¾अµ अ”अ° अ¸मअ¯अ°à¥‡अ–अ¾ अ•à¥‡ अ†अ§अ¾अ° अªअ° अªà¥अ°अ¾अ¥मअ¿अ•अ¤अ¾'],
          back: 'अ…अªअ¨à¥‡ अ”अ° अ…अªअ¨à¥‡ अªअ°अ¿अµअ¾अ° अ•à¥‡ अ²अ¿अ अ¸अ¬अ¸à¥‡ मअ¹अ¤à¥अµअªà¥‚अ°à¥अ£ अ²अ•à¥अ·à¥अ¯à¥‹अ‚ अ•à¥‹ अ¸à¥अªअ·à¥अŸ अ•अ°à¥‡अ‚à¥¤',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अ¸à¥अ°अ•à¥अ·अ¾ अ•à¥अ¯à¥‹अ‚ अšअ¾अ¹अ¿अ',
          front: ['अœà¥‹अ–अ¿म अ¸मअà¥‡अ‚: अ†अ¯ अ¹अ¾अ¨अ¿, अšअ¿अ•अ¿अ¤à¥अ¸अ¾ अ–अ°à¥अš', 'अ¬à¥€मअ¾ अ…अ¨अ¿अ¶à¥अšअ¿अ¤अ¤अ¾ अ•à¥ˆअ¸à¥‡ अ˜अŸअ¾अ¤अ¾ अ¹à¥ˆ', 'अªà¥अ°à¥‹अअ•à¥अŸअ¿अµ अ¯à¥‹अœअ¨अ¾ अ¸à¥‡ अ¦à¥ƒअ¢अ¼अ¤अ¾ अ¬अ¨अ¾अअ‚'],
          back: 'अ…अ¨अªà¥‡अ•à¥अ·अ¿अ¤ अ˜अŸअ¨अ¾अ“अ‚ अ¸à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥€ अ°अ•à¥अ·अ¾ अ¹à¥‡अ¤à¥ अ¸à¥अ°अ•à¥अ·अ¾ अ†अµअ¶à¥अ¯अ• अ¹à¥ˆà¥¤',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'मअœअ¬à¥‚अ¤ अ¨à¥€अ‚अµ अ¬अ¨अ¾अअ‚',
          front: ['अ¸à¥अªअ·à¥अŸ अµअ¿अ¤à¥अ¤à¥€अ¯ मअ¾अ‡अ²अ¸à¥अŸà¥‹अ¨', 'अ†अªअ¾अ¤अ•अ¾अ²à¥€अ¨ अ¬अšअ¤ अµ अ¬à¥‡अ¸अ¿अ• अªà¥अ°à¥‹अŸà¥‡अ•à¥अ¶अ¨', 'अ¨अ¿अ¯मअ¿अ¤ अ¸मà¥€अ•à¥अ·अ¾ अµ अ¸à¥अ§अ¾अ°'],
          back: 'अ¸अ°अ², अŸअ¿अ•अ¾अŠ अ†अ§अ¾अ° अ†अªअ•à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥‹ अŸà¥अ°à¥ˆअ• अªअ° अ°अ–अ¤अ¾ अ¹à¥ˆà¥¤',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'à¦¤à¥मअšà¥€ अ¸à¥अµà¦ªà¥अ¨à¥‡ अ•अ¾अ¯ अ†अ¹à¥‡अ¤?',
          front: ['मअ¹अ¤à¥अ¤à¥अµअ¾अšà¥€ अœà¥€अµअ¨अ§à¥अ¯à¥‡अ¯à¥‡ अ“अ³अ–अ¾', 'अ²अ˜à¥/अ¦à¥€अ°à¥अ˜अ•अ¾अ²à¥€अ¨ अ†अ•अ¾अ‚अ•à¥अ·अ¾ अ¯अ¾अ¦à¥€ अ•अ°अ¾', 'अªअ°अ¿अ£अ¾म अµ अ•अ¾अ²अ°à¥‡अ·à¥‡अ¨à¥अ¸अ¾अ° अªà¥अ°अ¾अ§अ¾अ¨à¥अ¯'],
          back: 'अ¸à¥अµअ¤अƒअ¸अ¾अ à¥€ अµ अ•à¥अŸà¥अ‚अ¬अ¾अ¸अ¾अ à¥€ अ¸अ°à¥अµअ¾अ¤ मअ¹अ¤à¥अ¤à¥अµअ¾अšà¥€ अ§à¥अ¯à¥‡अ¯à¥‡ अ¸à¥अªअ·à¥अŸ अ•अ°अ¾.',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'अ¸à¥अµअªà¥अ¨अ¾अ‚अ¨अ¾ अ¸à¥अ°अ•à¥अ·अ¾ अ•अ¾ अ†अµअ¶à¥अ¯अ•',
          front: ['अœà¥‹अ–à¥€म अ¸मअœà¥‚अ¨ अ˜à¥अ¯अ¾: अ‰अ¤à¥अªअ¨à¥अ¨ अ˜अŸ, अµà¥ˆअ¦à¥अ¯अ•à¥€अ¯ अ–अ°à¥अš', 'अµअ¿मअ¾ अ…अ¨अ¿अ¶à¥अšअ¿अ¤अ¤अ¾ अ•अ¶à¥€ अ•मà¥€ अ•अ°अ¤à¥‹', 'अ¸अ•à¥अ°अ¿अ¯ अ¨अ¿अ¯à¥‹अœअ¨अ¾अ¨à¥‡ अ²अµअšअ¿अ•अ¤अ¾'],
          back: 'अ…अ¨अªà¥‡अ•à¥अ·अ¿अ¤ अ˜अŸअ¨अ¾अ‚अªअ¾अ¸à¥‚अ¨ अ¸à¥अµअªà¥अ¨à¥‡ अµअ¾अšअµअ£à¥अ¯अ¾अ¸अ¾अ à¥€ अ¸अ‚अ°अ•à¥अ·अ£ अ—अ°अœà¥‡अšà¥‡ अ†अ¹à¥‡.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'मअœअ¬à¥‚अ¤ अªअ¾अ¯अ¾ अ¤अ¯अ¾अ° अ•अ°अ¾',
          front: ['अ¸à¥अªअ·à¥अŸ अ†अ°à¥अ¥अ¿अ• मà¥ˆअ²अ¾अšà¥‡ अ¦अ—अ¡', 'अ†अ£à¥€अ¬अ¾अ£à¥€ अ¬अšअ¤ अµ मà¥‚अ²अ­à¥‚अ¤ अ¸अ‚अ°अ•à¥अ·अ£', 'अ¨अ¿अ¯मअ¿अ¤ अªà¥अ¨अ°अ¾अµअ²à¥‹अ•अ¨ अµ अ¸à¥अ§अ¾अ°अ£अ¾'],
          back: 'अ¸à¥‹अªà¥€, अŸअ¿अ•अ¾अŠ अªअ¾अ¯अ¾अ­अ°अ£à¥€ अ¸à¥अµअªà¥अ¨à¥‡ मअ¾अ°à¥अ—अ¾अµअ° अ à¥‡अµअ¤à¥‡.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    return [
      {
        title: 'Adult Learning Principles',
        front: ['Self-directed learning approaches', 'Problem-centered training methods', 'Experience-based skill development'],
        back: 'Master andragogy principles specifically designed for law enforcement training environments.',
        color: 'from-pink-50 to-rose-50 border-pink-100',
      },
      {
        title: 'DOJ & POST Requirements',
        front: ['Federal training standards compliance', 'State POST certification requirements', 'Documentation and reporting protocols'],
        back: 'Ensure all training meets federal and state law enforcement standards.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Ethical Foundations',
        front: ['Civil rights and constitutional law', 'Use of force guidelines', 'Implicit bias awareness training'],
        back: 'Build ethical decision-making skills for professional law enforcement.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
    ];
  }, [baseLang]);

  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'अªà¥€अ¡à¥€अअ« अ¦अ¸à¥अ¤अ¾अµà¥‡अœ', open: 'अ–à¥‹अ²à¥‡अ‚', download: 'अ¡अ¾अ‰अ¨अ²à¥‹अ¡' };
    if (baseLang === 'mr') return { title: 'PDF अ¦अ¸à¥अ¤अअµअœ', open: 'अ‰अ˜अ¡अ¾', download: 'अ¡अ¾अ‰अ¨अ²à¥‹अ¡' };
    return { title: ' ent', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Lesson1Understanding_Your_Dream.pdf';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style jsx>{`
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 200px;
          perspective: 1000px;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <Button 
            onClick={handleBackToModules} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {uiText.backToModules}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Section 1: Intro */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{t.introTitle}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t.introSubtitle}</p>
          </div>

          {/* Study Card Carousel (Flipping cards) */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent>
                  {studyCards.map((card, idx) => (
                    <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                      <div className="group [perspective:1000px] h-[220px]">
                        <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                          {/* Front */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${card.color} border rounded-xl p-6 shadow-sm [backface-visibility:hidden]`}>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{card.title}</h3>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {card.front.map((pt, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                            <p className="text-xs text-gray-500 mt-4">{baseLang === 'hi' ? 'अ«à¥अ²अ¿अª अ•अ°अ¨à¥‡ अ¹à¥‡अ¤à¥ अ¹à¥‹अµअ° अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ«à¥अ²अ¿अªअ¸अ¾अ à¥€ अ¹à¥‹अµअ° अ•अ°अ¾' : 'Hover to flip'}</p>
                          </div>
                          {/* Back */}
                          <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'सारांश' : baseLang === 'mr' ? 'सारांश' : 'Summary'}</h4>
                            <p className="text-sm text-gray-700 leading-relaxed">{card.back}</p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">{baseLang === 'hi' ? 'मà¥अ–à¥अ¯ अµअ¿अšअ¾अ°à¥‹अ‚ अ•अ¾ अ…अ§à¥अ¯अ¯अ¨ अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'मअ¹अ¤à¥अ¤à¥अµअ¾अšà¥अ¯अ¾ अ•अ²à¥अªअ¨अ¾ अ…अ­à¥अ¯अ¾अ¸अ¾' : 'Study key ideas'}</p>
          </div>

          {/* Section Description with TTS and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.learnTitle}</h2>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Language:</span>
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    // Stop any currently playing audio when language changes
                    const synth = window.speechSynthesis;
                    if (synth) {
                      synth.cancel();
                      setSpeakingBlocks({});
                    }
                    const newLang = e.target.value;
                    setSelectedLang(newLang);
                    
                    // Automatically select the best voice for the selected language
                    const availableVoices = voices.filter(voice => 
                      voice.name && voice.name.trim() !== '' && 
                      voice.voiceURI && voice.voiceURI.trim() !== ''
                    );
                    
                    const bestVoice = availableVoices.find(voice => voice.lang === newLang) || 
                                    availableVoices.find(voice => voice.lang?.startsWith(newLang.split('-')[0])) ||
                                    availableVoices[0];
                    
                    if (bestVoice) {
                      setSelectedVoiceURI(bestVoice.voiceURI);
                    }
                  }}
                  className="px-3 py-2 border-0 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <optgroup label="🌍 English Variants">
                    {languageOptions.filter(opt => opt.code.startsWith('en-')).map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                  </optgroup>
                  <optgroup label="🇮🇳 Indian Languages">
                    {languageOptions.filter(opt => opt.code.includes('-IN')).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🇪🇺 European Languages">
                    {languageOptions.filter(opt => 
                      ['fr-', 'de-', 'es-', 'it-', 'pt-', 'nl-', 'sv-', 'no-', 'da-', 'fi-', 'pl-', 'ru-', 'uk-', 'cs-', 'sk-', 'hu-', 'ro-', 'bg-', 'hr-', 'sl-', 'et-', 'lv-', 'lt-', 'el-', 'tr-', 'is-', 'mt-'].some(prefix => opt.code.startsWith(prefix))
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="🌍 Asian Languages">
                    {languageOptions.filter(opt => 
                      ['ja-', 'ko-', 'zh-', 'th-', 'vi-', 'id-', 'ms-', 'fil-', 'ar-', 'he-', 'fa-', 'hi-PK', 'ur-PK', 'bn-BD', 'si-', 'my-', 'km-', 'lo-', 'mn-', 'ka-', 'hy-', 'az-', 'kk-', 'ky-', 'uz-', 'tg-', 'tk-'].some(prefix => opt.code.startsWith(prefix) || opt.code === prefix)
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                </select>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Voice:</span>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border-0 bg-white rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm min-w-[200px]"
                >
                  {(() => {
                    // Filter to only show voices that are actually available and working
                    const availableVoices = voices.filter(voice => 
                      voice.name && voice.name.trim() !== '' && 
                      voice.voiceURI && voice.voiceURI.trim() !== ''
                    );
                    
                    if (availableVoices.length > 0) {
                      return availableVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">System default</option>;
                    }
                  })()}
                </select>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-end mb-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100" 
                  onClick={() => handleSpeakToggle('lesson-text', t.paragraph)}
                >
                  {speakingBlocks['lesson-text'] ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                  {speakingBlocks['lesson-text'] ? t.stop : t.listen}
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{t.paragraph}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">{t.outcomesTitle}</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {t.outcomes.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">{t.toolsTitle}</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  {t.tools.map((line, i) => (<li key={i}>{line}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: PDF Document - MOVED TO RESOURCES SECTION */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">{pdfUi.title}</h3>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> {pdfUi.open}
                  </a>
                </Button>
                <Button asChild size="sm">
                  <a href={pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> {pdfUi.download}
                  </a>
                </Button>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border bg-white">
              {/* PDF Viewer - Like Module 2 */}
              <div className="w-full h-[60vh]">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="Lesson 1 Understanding PDF"
                  frameBorder="0"
                >
                  <p className="p-4 text-gray-600">
                    {baseLang === 'hi' ? 'अ†अªअ•अ¾ अ¬à¥अ°अ¾अ‰अœअ¼अ° PDF अ¨अ¹à¥€अ‚ अ¦अ¿अ–अ¾ अ¸अ•अ¤अ¾à¥¤' : 
                     baseLang === 'mr' ? 'अ¤à¥मअšअ¾ अ¬à¥अ°अ¾अ‰अœअ¼अ° PDF अ¦अ¾अ–अµà¥‚ अ¶अ•अ¤ अ¨अ¾अ¹à¥€.' : 
                     'Your browser does not support PDF viewing.'}
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {baseLang === 'hi' ? 'अ¯अ¹अ¾अ‚ अ•à¥अ²अ¿अ• अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ¯à¥‡अ¥à¥‡ अ•à¥अ²अ¿अ• अ•अ°अ¾' : 'Click here'}
                    </a>
                    {baseLang === 'hi' ? 'PDF अ¦à¥‡अ–अ¨à¥‡ अ•à¥‡ अ²अ¿अ' : baseLang === 'mr' ? 'PDF अªअ¹अ£à¥अ¯अ¾अ¸अ¾अ à¥€' : 'to view the PDF'}
                  </p>
                </iframe>
              </div>
              

            </div>
            <div className="mt-3 text-sm text-gray-500 text-center">
              {baseLang === 'hi' ? 'PDF अ«अ¼अ¾अ‡अ²: Lesson1Understanding_Your_Dream.pdf' : 
               baseLang === 'mr' ? 'PDF अ«अ¾अˆअ²: Lesson1Understanding_Your_Dream.pdf' : 
               'PDF File: Lesson1Understanding_Your_Dream.pdf'}
            </div>
          </div>
        </section>

        {/* TTS Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Text-to-Speech Narration</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              {baseLang === 'hi' ? 'अ¯अ¹ अ­अ¾अ·अ¾ अ•à¥‡अµअ² अ‘अ¡अ¿अ¯à¥‹ अ•à¥‡ अ²अ¿अ अ¹à¥ˆ, अªà¥‚अ°à¥‡ अªà¥‡अœ अ•à¥€ अ­अ¾अ·अ¾ अ¨अ¹à¥€अ‚ अ¬अ¦अ²à¥‡अ—à¥€' : 
               baseLang === 'mr' ? 'अ¹à¥€ अ­अ¾अ·अ¾ अ«अ•à¥अ¤ अ‘अ¡अ¿अ“अ¸अ¾अ à¥€ अ†अ¹à¥‡, अ¸अ‚अªà¥‚अ°à¥अ£ अªà¥ƒअ·à¥अ अ¾अšà¥€ अ­अ¾अ·अ¾ अ¬अ¦अ²अ£अ¾अ° अ¨अ¾अ¹à¥€' : 
               'Listen to the Law Enforcement Training content using your browser\'s built-in text-to-speech feature'}
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Listen to Lesson Content</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={handleTTSPlayPause}
                  className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  {isTTSPlaying ? '⏸️' : '▶️'}
                </button>
                
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full inline-block mr-2"></span>
                    {isTTSPlaying ? `Reading Topic ${currentTTSIndex + 1}: ${lawEnforcementContent[currentTTSIndex]?.title}` : 'Click play to start narration'}
              </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-in-out"
                      style={{ 
                        width: `${((currentTTSIndex + 1) / lawEnforcementContent.length) * 100}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress: {Math.round(((currentTTSIndex + 1) / lawEnforcementContent.length) * 100)}%</span>
                    <span>Topic {currentTTSIndex + 1} of {lawEnforcementContent.length}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleTTSStop}
                  className="text-gray-600 hover:text-gray-800"
                  title="Stop"
                >
                  ⏹️
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
                  High-quality English narration with clear pronunciation
                </p>
                <p className="text-xs text-gray-500">
                  Uses your browser's built-in text-to-speech engine for natural voice reading
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 1.1: Adult Learning - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">🎓</span>
                        </div>
              <div>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Topic 1.1</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Adult Learning in Tactical & Compliance Settings</h2>
                <p className="text-gray-600">Understanding Andragogy in Policing</p>
                      </div>
                        </div>
            {/* Learning Objectives Card */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Learning Objectives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Understand adult learning principles in law enforcement</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Apply andragogy to tactical training scenarios</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Design compliance training for adult learners</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Implement stress-based learning techniques</span>
                    </div>
                  </div>
                </div>

            {/* Key Principles Interactive Cards */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Core Principles of Adult Learning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Self-Directed Learning</h4>
                  <p className="text-sm text-gray-600">Officers control their learning pace and build on existing experience</p>
                    </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Problem-Centered Approach</h4>
                  <p className="text-sm text-gray-600">Use real-world scenarios that connect to actual policing situations</p>
                    </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Experience-Based Learning</h4>
                  <p className="text-sm text-gray-600">Leverage field experience and peer-to-peer learning opportunities</p>
                  </div>
                </div>
            </div>

            {/* Tactical Training Considerations */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Tactical Training Considerations
                </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">High-Stress Learning Environment</h4>
                  <p className="text-sm text-gray-600">Training must prepare officers for real-world pressure and decision-making under stress</p>
                    </div>
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">Muscle Memory Development</h4>
                  <p className="text-sm text-gray-600">Repetitive practice for critical skills that must become automatic responses</p>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">Scenario-Based Training</h4>
                  <p className="text-sm text-gray-600">Training that mimics real conditions and requires split-second decision making</p>
              </div>
            </div>
          </div>

            {/* Best Practices Summary */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Key Takeaways</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Interactive learning with role-playing and simulations</span>
                  </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Peer teaching with experienced officers mentoring newer ones</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Continuous assessment and regular evaluation</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Constructive feedback loops for improvement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PDF Document Section - Between Topic 1.1 and 1.2 */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">📄</span>
                      </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Training Manual</h3>
                  <p className="text-sm text-gray-600">Comprehensive Law Enforcement Training Guide</p>
                  </div>
                </div>
              <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm" className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100">
                  <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> {pdfUi.open}
                  </a>
                </Button>
                <Button asChild size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                  <a href={pdfUrl} download className="flex items-center gap-2">
                    <FileDown className="h-4 w-4" /> {pdfUi.download}
                  </a>
                </Button>
              </div>
                      </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="w-full h-[400px] rounded-lg overflow-hidden border bg-white shadow-sm">
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="Law Enforcement Training Manual"
                  frameBorder="0"
                >
                  <div className="flex items-center justify-center h-full bg-gray-100">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📄</span>
                  </div>
                      <p className="text-gray-600 mb-2">
                        {baseLang === 'hi' ? 'अ†अªअ•अ¾ अ¬à¥अ°अ¾अ‰अœअ¼अ° PDF अ¨अ¹à¥€अ‚ अ¦अ¿अ–अ¾ अ¸अ•अ¤अ¾à¥¤' : 
                         baseLang === 'mr' ? 'अ¤à¥मअšअ¾ अ¬à¥अ°अ¾अ‰अœअ¼अ° PDF अ¦अ¾अ–अµà¥‚ अ¶अ•अ¤ अ¨अ¾अ¹à¥€.' : 
                         'Your browser does not support PDF viewing.'}
                      </p>
                      <a 
                        href={pdfUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {baseLang === 'hi' ? 'अ¯अ¹अ¾अ‚ अ•à¥अ²अ¿अ• अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ¯à¥‡अ¥à¥‡ अ•à¥अ²अ¿अ• अ•अ°अ¾' : 'Click here'}
                      </a>
                      <span className="text-gray-500 ml-2">
                        {baseLang === 'hi' ? 'PDF अ¦à¥‡अ–अ¨à¥‡ अ•à¥‡ अ²अ¿अ' : baseLang === 'mr' ? 'PDF अªअ¹अ£à¥अ¯अ¾अ¸अ¾अ à¥€' : 'to view the PDF'}
                      </span>
                </div>
              </div>
                </iframe>
            </div>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  {baseLang === 'hi' ? 'PDF अ«अ¼अ¾अ‡अ²: Lesson1Understanding_Your_Dream.pdf' : 
                   baseLang === 'mr' ? 'PDF अ«अ¾अˆअ²: Lesson1Understanding_Your_Dream.pdf' : 
                   'PDF File: Lesson1Understanding_Your_Dream.pdf'}
                </p>
                    </div>
                      </div>
                      </div>
        </section>

        {/* Topic 1.2: DOJ & POST Requirements - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">📋</span>
                    </div>
              <div>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Topic 1.2</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">DOJ & POST Training Requirements</h2>
                <p className="text-gray-600">Federal and State Training Standards</p>
                  </div>
            </div>
            
            {/* Federal Requirements Card */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Federal DOJ Training Standards
                </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2">Minimum Standards</h4>
                  <p className="text-sm text-gray-700">40 hours basic training + annual continuing education</p>
                  </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Compliance Areas</h4>
                  <p className="text-sm text-gray-700">Constitutional law, civil rights, use of force protocols</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Specialized Training</h4>
                  <p className="text-sm text-gray-700">Role-specific training for different responsibilities</p>
                  </div>
                </div>
                  </div>

            {/* State POST Requirements */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                State POST Requirements Comparison
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">California POST</h4>
                  <div className="text-2xl font-bold text-yellow-600 mb-1">664</div>
                  <p className="text-sm text-gray-700">hours minimum basic training</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Texas TCOLE</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">696</div>
                  <p className="text-sm text-gray-700">hours for basic peace officer</p>
                  </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Florida CJSTC</h4>
                  <div className="text-2xl font-bold text-green-600 mb-1">770</div>
                  <p className="text-sm text-gray-700">hours for law enforcement</p>
                </div>
              </div>
            </div>
            
            {/* Compliance Checklist */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Training Compliance Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Annual constitutional law updates completed</span>
          </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Civil rights training documentation on file</span>
      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Use of force protocols reviewed and signed</span>
          </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Specialized role training requirements met</span>
        </div>
      </div>
              </div>
            </div>
        </section>

        {/* Topic 1.3: Ethical & Civil Rights - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">⚖️</span>
              </div>
              <div>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Topic 1.3</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Ethical & Civil Rights Foundations</h2>
                <p className="text-gray-600">Use of Force, Miranda, Implicit Bias</p>
                </div>
              </div>

            {/* Constitutional Framework */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Constitutional Framework
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Fourth Amendment</h4>
                  <p className="text-sm text-gray-600">Search and seizure limitations, probable cause requirements</p>
                            </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Fifth Amendment</h4>
                  <p className="text-sm text-gray-600">Miranda rights, self-incrimination protections</p>
                            </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Sixth Amendment</h4>
                  <p className="text-sm text-gray-600">Right to counsel, speedy trial requirements</p>
                          </div>
                        </div>
              </div>

            {/* Use of Force Standards */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Use of Force Standards
              </h3>
                <div className="space-y-4">
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">Graham v. Connor Standard</h4>
                  <p className="text-sm text-gray-600">Objective reasonableness test based on severity of crime, threat level, and resistance</p>
                        </div>
                <div className="bg-gradient-to-r from-gray-50 to-slate-100 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold text-slate-700 mb-2">Force Continuum</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="bg-gray-200 px-2 py-1 rounded">Presence</span>
                    <span>→</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Verbal Commands</span>
                    <span>→</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Empty Hand</span>
                    <span>→</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Less Lethal</span>
                    <span>→</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Deadly Force</span>
                          </div>
                        </div>
                        </div>
                      </div>

            {/* Implicit Bias Recognition */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Implicit Bias Recognition & Mitigation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-800 mb-2">Common Biases</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Racial/ethnic stereotypes</span>
                                  </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Gender assumptions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span>Socioeconomic prejudices</span>
                    </li>
                              </ul>
                    </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Mitigation Strategies</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Self-awareness training</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Cultural competency education</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Community engagement</span>
                    </li>
                  </ul>
                            </div>
                </div>
              </div>

            {/* Ethics Summary */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Ethical Foundation Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Constitutional rights must be respected in all interactions</span>
                        </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Use of force must be objectively reasonable</span>
                        </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Implicit bias awareness prevents discriminatory practices</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Continuous training maintains ethical standards</span>
                    </div>
                </div>
              </div>
                </div>
        </section>

        {/* Topic 1.4: Trauma-informed instruction - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-slate-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-slate-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">🧠</span>
                        </div>
              <div>
                <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">Topic 1.4</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Trauma-informed Instruction</h2>
                <p className="text-gray-600">Supporting First Responders' Mental Health</p>
                    </div>
                  </div>

            {/* Understanding Trauma Types */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-slate-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Understanding Trauma in Law Enforcement
                    </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Direct Trauma</h4>
                  <p className="text-sm text-gray-600">Personal involvement in traumatic events</p>
                        </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Vicarious Trauma</h4>
                  <p className="text-sm text-gray-600">Exposure to others' traumatic experiences</p>
                    </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold text-slate-700 mb-2">Cumulative Trauma</h4>
                  <p className="text-sm text-gray-600">Repeated exposure over time</p>
                  </div>
                </div>
              </div>

            {/* Trauma-Informed Principles */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Trauma-Informed Training Principles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                    <strong className="text-green-800">Safety:</strong> Physical and emotional safety
                      </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                    <strong className="text-blue-800">Trustworthiness:</strong> Transparent communication
                      </div>
                    </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                    <strong className="text-purple-800">Choice:</strong> Participant autonomy
                </div>
                  <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-3 rounded-lg border border-teal-200">
                    <strong className="text-teal-800">Collaboration:</strong> Peer support networks
              </div>
                      </div>
                    </div>
                  </div>

            {/* Support Resources */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Support Resources & Programs
                      </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Peer Support Programs</h4>
                  <p className="text-sm text-gray-700">Fellow officers trained in support and crisis intervention</p>
                    </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Professional Counseling</h4>
                  <p className="text-sm text-gray-700">Licensed mental health professionals specializing in first responder trauma</p>
                      </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">Critical Incident Stress Management</h4>
                  <p className="text-sm text-gray-700">Immediate and ongoing support following traumatic events</p>
                      </div>
                    </div>
                  </div>

            {/* Mental Health Summary */}
            <div className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Mental Health Support Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Recognize different types of trauma exposure</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Apply trauma-informed principles in training</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Access appropriate support resources when needed</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-slate-200">✓</span>
                  <span className="text-sm">Maintain mental health through proactive support</span>
                      </div>
                    </div>
                  </div>
                </div>
        </section>

        {/* Section 5: Risk Assessment Flipping Cards */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              {baseLang === 'hi' ? 'अœà¥‹अ–अ¿म मà¥‚अ²à¥अ¯अ¾अ‚अ•अ¨' : baseLang === 'mr' ? 'अœà¥‹अ–à¥€म मà¥‚अ²à¥अ¯अ¾अ‚अ•अ¨' : 'Risk Assessment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  front: baseLang === 'hi' ? 'अ†अ¯ अ¹अ¾अ¨अ¿' : baseLang === 'mr' ? 'अ‰अ¤à¥अªअ¨à¥अ¨ अ˜अŸ' : 'Income Loss',
                  back: baseLang === 'hi' ? 'अ…अšअ¾अ¨अ• अ¨à¥Œअ•अ°à¥€ अ›à¥‚अŸअ¨अ¾ अ¯अ¾ अ¬à¥€मअ¾अ°à¥€ अ•à¥‡ अ•अ¾अ°अ£ अ†अ¯ अ¬अ‚अ¦ अ¹à¥‹अ¨अ¾' : baseLang === 'mr' ? 'अ…अšअ¾अ¨अ• अ¨à¥‹अ•अ°à¥€ अ—मअ¾अµअ£à¥‡ अ•अ¿अ‚अµअ¾ अ†अœअ¾अ°अ¾मà¥अ³à¥‡ अ‰अ¤à¥अªअ¨à¥अ¨ अ¥अ¾अ‚अ¬अ£à¥‡' : 'Sudden job loss or illness stopping income',
                  color: 'from-red-50 to-pink-50 border-red-200',
                  icon: '💰'
                },
                {
                  front: baseLang === 'hi' ? 'अšअ¿अ•अ¿अ¤à¥अ¸अ¾ अ–अ°à¥अš' : baseLang === 'mr' ? 'अµà¥ˆअ¦à¥अ¯अ•à¥€अ¯ अ–अ°à¥अš' : 'Medical Expenses',
                  back: baseLang === 'hi' ? 'अ…अªà¥अ°अ¤à¥अ¯अ¾अ¶अ¿अ¤ अšअ¿अ•अ¿अ¤à¥अ¸अ¾ अ†अªअ¾अ¤अ•अ¾अ² अ”अ° अ…अ¸à¥अªअ¤अ¾अ² अ•à¥‡ अ¬अ¿अ²' : baseLang === 'mr' ? 'अ…अ¨अªà¥‡अ•à¥अ·अ¿अ¤ अµà¥ˆअ¦à¥अ¯अ•à¥€अ¯ अ†अ£à¥€अ¤अ•अ¾अ² अ†अ£अ¿ अ°à¥अ—à¥अ£अ¾अ²अ¯अ¾अšà¥‡ अ¬अ¿अ²' : 'Unexpected medical emergencies and hospital bills',
                  color: 'from-blue-50 to-cyan-50 border-blue-200',
                  icon: '🏥'
                },
                {
                  front: baseLang === 'hi' ? 'अ¸अ‚अªअ¤à¥अ¤अ¿ अ•à¥अ·अ¤अ¿' : baseLang === 'mr' ? 'मअ¾अ²मअ¤à¥अ¤अ¾ अ¨à¥अ•अ¸अ¾अ¨' : 'Property Damage',
                  back: baseLang === 'hi' ? 'अªà¥अ°अ¾अ•à¥ƒअ¤अ¿अ• अ†अªअ¦अ¾ अ¯अ¾ अ¦à¥अ°à¥अ˜अŸअ¨अ¾ अ¸à¥‡ अ¸अ‚अªअ¤à¥अ¤अ¿ अ•अ¾ अ¨à¥अ•अ¸अ¾अ¨' : baseLang === 'mr' ? 'अ¨à¥ˆअ¸अ°à¥अ—अ¿अ• अ†अªअ¤à¥अ¤à¥€ अ•अ¿अ‚अµअ¾ अ…अªअ˜अ¾अ¤अ¾मà¥अ³à¥‡ मअ¾अ²मअ¤à¥अ¤à¥‡अšà¥‡ अ¨à¥अ•अ¸अ¾अ¨' : 'Property loss from natural disasters or accidents',
                  color: 'from-green-50 to-emerald-50 border-green-200',
                  icon: '🏠'
                },
                {
                  front: baseLang === 'hi' ? 'अ¦अ¾अ¯अ¿अ¤à¥अµ अœà¥‹अ–अ¿म' : baseLang === 'mr' ? 'अœअ¬अ¾अ¬अ¦अ¾अ°à¥€ अœà¥‹अ–à¥€म' : 'Liability Risk',
                  back: baseLang === 'hi' ? 'अ¦à¥‚अ¸अ°à¥‹अ‚ अ•à¥‹ अ¨à¥अ•अ¸अ¾अ¨ अªअ¹à¥अ‚अšअ¾अ¨à¥‡ अªअ° अ•अ¾अ¨à¥‚अ¨à¥€ अ¦अ¾अ¯अ¿अ¤à¥अµ' : baseLang === 'mr' ? 'अ‡अ¤अ°अ¾अ‚अ¨अ¾ अ¨à¥अ•अ¸अ¾अ¨ अªà¥‹अ¹à¥‹अšअµअ²à¥अ¯अ¾अ¸ अ•अ¾अ¯अ¦à¥‡अ¶à¥€अ° अœअ¬अ¾अ¬अ¦अ¾अ°à¥€' : 'Legal liability for causing harm to others',
                  color: 'from-purple-50 to-violet-50 border-purple-200',
                  icon: '⚖️'
                }
              ].map((card, idx) => (
                <div key={idx} className="flip-card">
                  <div className="flip-card-inner">
                    <div className={`flip-card-front ${card.color} border-2 rounded-xl p-6 flex items-center justify-center cursor-pointer`}>
                      <div className="text-center">
                        <div className="text-4xl mb-3">{card.icon}</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.front}</h3>
                        <p className="text-sm text-gray-600">
                          {baseLang === 'hi' ? 'अ¹à¥‹अµअ° अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ¹à¥‹अµà¥अ¹अ° अ•अ°अ¾' : 'Hover to flip'}
                      </p>
                      </div>
                    </div>
                    <div className="flip-card-back bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-3">{card.icon}</div>
                        <p className="text-gray-700 text-center leading-relaxed">{card.back}</p>
                      </div>
                      </div>
                    </div>
                  </div>
              ))}
                </div>
                      </div>
        </section>

        {/* Section 6: Call to Action - REMOVED */}
        <section className="max-w-4xl mx-auto mb-12 hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {baseLang === 'hi' ? 'अ…अªअ¨à¥€ अµअ¿अ¤à¥अ¤à¥€अ¯ अ¸à¥अ°अ•à¥अ·अ¾ अ¶à¥अ°à¥‚ अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ¤à¥मअšà¥€ अ†अ°à¥अ¥अ¿अ• अ¸à¥अ°अ•à¥अ·अ¾ अ¸à¥अ°à¥‚ अ•अ°अ¾' : 'Start Your Financial Protection Journey'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {baseLang === 'hi' ? 'अ†अœ अ¹à¥€ अ…अªअ¨à¥‡ अ¸अªअ¨à¥‹अ‚ अ•à¥€ अ¸à¥अ°अ•à¥अ·अ¾ अ•à¥‡ अ²अ¿अ अ•अ¦म अ‰अ अ¾अअ‚' : baseLang === 'mr' ? 'अ†अœअš अ¤à¥मअšà¥अ¯अ¾ अ¸à¥अµअªà¥अ¨अ¾अ‚अšà¥अ¯अ¾ अ¸à¥अ°अ•à¥अ·à¥‡अ¸अ¾अ à¥€ अªअ¾अŠअ² अ‰अšअ²अ¾अµà¥‡' : 'Take the first step today to protect your dreams'}
            </p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              {baseLang === 'hi' ? 'अ…अ­à¥€ अ¶à¥अ°à¥‚ अ•अ°à¥‡अ‚' : baseLang === 'mr' ? 'अ†अ¤à¥अ¤अ¾ अ¸à¥अ°à¥‚ अ•अ°अ¾' : 'Get Started Now'}
            </button>
                    </div>
        </section>

        {/* Resources Section */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Resources</h2>
            <p className="text-sm text-gray-600 mb-6">
              Additional materials and resources to support your Law Enforcement Training learning journey.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* PDF Document */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    📄 Training Manual
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={pdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" /> {pdfUi.open}
                      </a>
                    </Button>
                    <Button asChild size="sm">
                      <a href={pdfUrl} download className="flex items-center gap-2">
                        <FileDown className="h-4 w-4" /> {pdfUi.download}
                      </a>
                    </Button>
                    </div>
                      </div>
                <p className="text-sm text-blue-700 mb-4">
                  Comprehensive training manual covering all aspects of Law Enforcement Training fundamentals.
                </p>
                <div className="text-xs text-blue-600">
                  {baseLang === 'hi' ? 'PDF अ«अ¼अ¾अ‡अ²: Lesson1Understanding_Your_Dream.pdf' : 
                   baseLang === 'mr' ? 'PDF अ«अ¾अˆअ²: Lesson1Understanding_Your_Dream.pdf' : 
                   'PDF File: Lesson1Understanding_Your_Dream.pdf'}
                    </div>
                      </div>

              {/* Video Resource */}
              <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 flex items-center gap-2 mb-4">
                  🎥 Training Video
                </h3>
                <p className="text-sm text-green-700 mb-4">
                  Watch this comprehensive video guide on Law Enforcement Training best practices and methodologies.
                </p>
                <div className="bg-white rounded-lg overflow-hidden">
                  <iframe
                    width="100%"
                    height="200"
                    src="https://www.youtube.com/embed/akZd7s_Kxms?si=tOk4x9ShMo1YZZMZ"
                    title="Law Enforcement Training Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                    </div>
                  </div>
                </div>

            {/* Additional Resources Placeholder */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <h4 className="text-sm font-medium text-gray-600 mb-2">More Resources Coming Soon</h4>
                <p className="text-xs text-gray-500">
                  We're continuously adding new resources to enhance your learning experience. 
                  Check back regularly for updates!
                </p>
              </div>
            </div>
          </div>
        </section>
                  </div>
    </div>
  );
};

export default LessonMod1Dreams;

