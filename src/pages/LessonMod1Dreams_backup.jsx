import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2, Maximize2, Play, Pause, X, Heart, ExternalLink, FileDown } from 'lucide-react';
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
  const textRef = useRef(null);

  // Language options - Only languages with commonly available voices
  const languageOptions = React.useMemo(() => ([
    { code: 'en-US', label: '🇺🇸 English (US)' },
    { code: 'en-GB', label: '🇬🇧 English (UK)' },
    { code: 'en-AU', label: '🇦🇺 English (Australia)' },
    { code: 'en-CA', label: '🇨🇦 English (Canada)' },
    { code: 'hi-IN', label: 'ðŸ‡®ðŸ‡³ à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)' },
    { code: 'mr-IN', label: 'ðŸ‡®ðŸ‡³ à¤®à¤°à¤¾à¤ à¥€ (Marathi)' },
    { code: 'ta-IN', label: 'ðŸ‡®ðŸ‡³ à®¤à®®à®¿à®´à¯ (Tamil)' },
    { code: 'te-IN', label: 'ðŸ‡®ðŸ‡³ à°¤à±†à°²à±à°—à± (Telugu)' },
    { code: 'bn-IN', label: 'ðŸ‡®ðŸ‡³ à¦¬à¦¾à¦‚à¦²à¦¾ (Bengali)' },
    { code: 'gu-IN', label: 'ðŸ‡®ðŸ‡³ àª—à«àªœàª°àª¾àª¤à«€ (Gujarati)' },
    { code: 'kn-IN', label: 'ðŸ‡®ðŸ‡³ à²•à²¨à³à²¨à²¡ (Kannada)' },
    { code: 'ml-IN', label: 'ðŸ‡®ðŸ‡³ à´®à´²à´¯à´¾à´³à´‚ (Malayalam)' },
    { code: 'pa-IN', label: 'ðŸ‡®ðŸ‡³ à¨ªà©°à¨œà¨¾à¨¬à©€ (Punjabi)' },
    { code: 'ur-IN', label: 'ðŸ‡®ðŸ‡³ Ø§Ø±Ø¯Ùˆ (Urdu)' },
    { code: 'fr-FR', label: 'ðŸ‡«ðŸ‡· FranÃ§ais (French)' },
    { code: 'fr-CA', label: 'ðŸ‡¨ðŸ‡¦ FranÃ§ais (Canada)' },
    { code: 'de-DE', label: 'ðŸ‡©ðŸ‡ª Deutsch (German)' },
    { code: 'es-ES', label: 'ðŸ‡ªðŸ‡¸ EspaÃ±ol (Spain)' },
    { code: 'es-MX', label: 'ðŸ‡²ðŸ‡½ EspaÃ±ol (Mexico)' },
    { code: 'it-IT', label: 'ðŸ‡®ðŸ‡¹ Italiano (Italian)' },
    { code: 'pt-PT', label: 'ðŸ‡µðŸ‡¹ PortuguÃªs (Portugal)' },
    { code: 'pt-BR', label: 'ðŸ‡§ðŸ‡· PortuguÃªs (Brazil)' },
    { code: 'nl-NL', label: 'ðŸ‡³ðŸ‡± Nederlands (Dutch)' },
    { code: 'sv-SE', label: 'ðŸ‡¸ðŸ‡ª Svenska (Swedish)' },
    { code: 'no-NO', label: 'ðŸ‡³ðŸ‡´ Norsk (Norwegian)' },
    { code: 'da-DK', label: 'ðŸ‡©ðŸ‡° Dansk (Danish)' },
    { code: 'fi-FI', label: 'ðŸ‡«ðŸ‡® Suomi (Finnish)' },
    { code: 'pl-PL', label: 'ðŸ‡µðŸ‡± Polski (Polish)' },
    { code: 'ru-RU', label: 'ðŸ‡·ðŸ‡º Ð ÑƒÑÑÐºÐ¸Ð¹ (Russian)' },
    { code: 'uk-UA', label: 'ðŸ‡ºðŸ‡¦ Ð£ÐºÑ€Ð°Ñ—Ð½ÑÑŒÐºÐ° (Ukrainian)' },
    { code: 'cs-CZ', label: 'ðŸ‡¨ðŸ‡¿ ÄŒeÅ¡tina (Czech)' },
    { code: 'sk-SK', label: 'ðŸ‡¸ðŸ‡° SlovenÄina (Slovak)' },
    { code: 'hu-HU', label: 'ðŸ‡­ðŸ‡º Magyar (Hungarian)' },
    { code: 'ro-RO', label: 'ðŸ‡·ðŸ‡´ RomÃ¢nÄƒ (Romanian)' },
    { code: 'bg-BG', label: 'ðŸ‡§ðŸ‡¬ Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸ (Bulgarian)' },
    { code: 'hr-HR', label: 'ðŸ‡­ðŸ‡· Hrvatski (Croatian)' },
    { code: 'sl-SI', label: 'ðŸ‡¸ðŸ‡® SlovenÅ¡Äina (Slovenian)' },
    { code: 'et-EE', label: 'ðŸ‡ªðŸ‡ª Eesti (Estonian)' },
    { code: 'lv-LV', label: 'ðŸ‡±ðŸ‡» LatvieÅ¡u (Latvian)' },
    { code: 'lt-LT', label: 'ðŸ‡±ðŸ‡¹ LietuviÅ³ (Lithuanian)' },
    { code: 'el-GR', label: 'ðŸ‡¬ðŸ‡· Î•Î»Î»Î·Î½Î¹ÎºÎ¬ (Greek)' },
    { code: 'tr-TR', label: 'ðŸ‡¹ðŸ‡· TÃ¼rkÃ§e (Turkish)' },
    { code: 'is-IS', label: 'ðŸ‡®ðŸ‡¸ Ãslenska (Icelandic)' },
    { code: 'mt-MT', label: 'ðŸ‡²ðŸ‡¹ Malti (Maltese)' },
    { code: 'ja-JP', label: 'ðŸ‡¯ðŸ‡µ æ—¥æœ¬èªž (Japanese)' },
    { code: 'ko-KR', label: 'ðŸ‡°ðŸ‡· í•œêµ­ì–´ (Korean)' },
    { code: 'zh-CN', label: 'ðŸ‡¨ðŸ‡³ ä¸­æ–‡ (Chinese Simplified)' },
    { code: 'zh-TW', label: 'ðŸ‡¹ðŸ‡¼ ç¹é«”ä¸­æ–‡ (Chinese Traditional)' },
    { code: 'th-TH', label: 'ðŸ‡¹ðŸ‡­ à¹„à¸—à¸¢ (Thai)' },
    { code: 'vi-VN', label: 'ðŸ‡»ðŸ‡³ Tiáº¿ng Viá»‡t (Vietnamese)' },
    { code: 'id-ID', label: 'ðŸ‡®ðŸ‡© Bahasa Indonesia (Indonesian)' },
    { code: 'ms-MY', label: 'ðŸ‡²ðŸ‡¾ Bahasa Melayu (Malay)' },
    { code: 'fil-PH', label: 'ðŸ‡µðŸ‡­ Filipino (Philippines)' },
    { code: 'ar-SA', label: 'ðŸ‡¸ðŸ‡¦ Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© (Arabic)' },
    { code: 'he-IL', label: 'ðŸ‡®ðŸ‡± ×¢×‘×¨×™×ª (Hebrew)' },
    { code: 'fa-IR', label: 'ðŸ‡®ðŸ‡· ÙØ§Ø±Ø³ÛŒ (Persian)' }
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
        backToModules: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤²à¥à¤¸ à¤ªà¤° à¤µà¤¾à¤ªà¤¸ à¤œà¤¾à¤à¤‚',
        module1: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² 1: à¤…à¤ªà¤¨à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤¸à¤®à¤à¤¨à¤¾',
        courseTitle: 'à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥€ à¤°à¤•à¥à¤·à¤¾',
        description: 'à¤œà¤¾à¤¨à¥‡à¤‚ à¤•à¤¿ à¤†à¤ªà¤•à¥‡ à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥‡ à¤­à¤µà¤¿à¤·à¥à¤¯ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¤¾ à¤•à¥à¤¯à¤¾ à¤®à¤¤à¤²à¤¬ à¤¹à¥ˆ',
        complete: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² à¤ªà¥‚à¤°à¤¾ à¤•à¤°à¥‡à¤‚'
      },
      'mr': { 
        backToModules: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤²à¥à¤¸à¤•à¤¡à¥‡ à¤ªà¤°à¤¤ à¤œà¤¾',
        module1: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² 1: à¤¤à¥à¤®à¤šà¥‡ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤¸à¤®à¤œà¥‚à¤¨ à¤˜à¥‡à¤£à¥‡',
        courseTitle: 'à¤¸à¥à¤µà¤ªà¥à¤¨à¤¾à¤‚à¤šà¥‡ à¤¸à¤‚à¤°à¤•à¥à¤·à¤£',
        description: 'à¤¤à¥à¤®à¤šà¥à¤¯à¤¾ à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤šà¥à¤¯à¤¾ à¤­à¤µà¤¿à¤·à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤†à¤°à¥à¤¥à¤¿à¤• à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤®à¥à¤¹à¤£à¤œà¥‡ à¤•à¤¾à¤¯ à¤¹à¥‡ à¤œà¤¾à¤£à¥‚à¤¨ à¤˜à¥à¤¯à¤¾à¤². à¤†à¤®à¥à¤¹à¥€ à¤µà¥à¤¯à¤¾à¤µà¤¹à¤¾à¤°à¤¿à¤• à¤ªà¤¾à¤µà¤²à¥‡ à¤¸à¤¾à¤‚à¤—à¥‚ à¤œà¥à¤¯à¤¾à¤®à¥à¤³à¥‡ à¤¤à¥à¤®à¥à¤¹à¥€ à¤à¤• à¤®à¤œà¤¬à¥‚à¤¤ à¤†à¤°à¥à¤¥à¤¿à¤• à¤ªà¤¾à¤¯à¤¾ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¥‚ à¤¶à¤•à¤¤à¤¾ à¤œà¥‹ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¥‡à¤¤à¤¹à¥€ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤®à¤¾à¤°à¥à¤—à¤¾à¤µà¤° à¤ à¥‡à¤µà¤¤à¥‹.',
        complete: 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² à¤ªà¥‚à¤°à¥à¤£ à¤•à¤°à¤¾'
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
    ? 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² 2 à¤•à¥‹ à¤…à¤¨à¤²à¥‰à¤• à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤‡à¤¸ à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² à¤•à¥‹ à¤ªà¥‚à¤°à¤¾ à¤•à¤°à¥‡à¤‚'
    : 'à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² 2 à¤…à¤¨à¤²à¥‰à¤• à¤•à¤°à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¹à¥‡ à¤®à¥‰à¤¡à¥à¤¯à¥‚à¤² à¤ªà¥‚à¤°à¥à¤£ à¤•à¤°à¤¾';

  const t = React.useMemo(() => {
    if (baseLang === 'hi') {
      return {
        introTitle: 'à¤ªà¤¾à¤  1: à¤…à¤ªà¤¨à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤¸à¤®à¤à¤¨à¤¾',
        introSubtitle: 'à¤œà¤¾à¤¨à¥‡à¤‚ à¤•à¤¿ à¤†à¤ªà¤•à¥‡ à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥‡ à¤­à¤µà¤¿à¤·à¥à¤¯ à¤•à¥‡ à¤²à¤¿à¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¤¾ à¤•à¥à¤¯à¤¾ à¤®à¤¤à¤²à¤¬ à¤¹à¥ˆ',
        learnTitle: 'à¤‡à¤¸ à¤ªà¤¾à¤  à¤®à¥‡à¤‚ à¤†à¤ª à¤•à¥à¤¯à¤¾ à¤¸à¥€à¤–à¥‡à¤‚à¤—à¥‡',
        listen: 'à¤¸à¥à¤¨à¥‡à¤‚',
        stop: 'à¤°à¥‹à¤•à¥‡à¤‚',
        outcomesTitle: 'à¤ªà¤°à¤¿à¤£à¤¾à¤®',
        toolsTitle: 'à¤†à¤ª à¤œà¤¿à¤¨ à¤‰à¤ªà¤•à¤°à¤£à¥‹à¤‚ à¤•à¤¾ à¤‰à¤ªà¤¯à¥‹à¤— à¤•à¤°à¥‡à¤‚à¤—à¥‡',
        paragraph:
          'à¤‡à¤¸ à¤ªà¤¾à¤  à¤®à¥‡à¤‚, à¤†à¤ª à¤…à¤ªà¤¨à¥‡ à¤¸à¤¬à¤¸à¥‡ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¤°à¥‡à¤‚à¤—à¥‡ à¤”à¤° à¤œà¤¾à¤¨à¥‡à¤‚à¤—à¥‡ à¤•à¤¿ à¤‰à¤¨à¥à¤¹à¥‡à¤‚ à¤¶à¥à¤°à¥à¤†à¤¤à¥€ à¤šà¤°à¤£ à¤®à¥‡à¤‚ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤ à¤•à¤°à¤¨à¤¾ à¤•à¥à¤¯à¥‹à¤‚ à¤†à¤µà¤¶à¥à¤¯à¤• à¤¹à¥ˆà¥¤ à¤¹à¤® à¤µà¥à¤¯à¤¾à¤µà¤¹à¤¾à¤°à¤¿à¤• à¤•à¤¦à¤® à¤¬à¤¤à¤¾à¤à¤‚à¤—à¥‡ à¤œà¤¿à¤¸à¤¸à¥‡ à¤†à¤ª à¤à¤• à¤®à¤œà¤¬à¥‚à¤¤ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¨à¥€à¤‚à¤µ à¤¬à¤¨à¤¾ à¤¸à¤•à¥‡à¤‚ à¤œà¥‹ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤ à¤ªà¤°à¤¿à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¥‹à¤‚ à¤®à¥‡à¤‚ à¤­à¥€ à¤†à¤ªà¤•à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤Ÿà¥à¤°à¥ˆà¤• à¤ªà¤° à¤°à¤–à¥‡à¥¤',
        outcomes: ['â€¢ à¤…à¤ªà¤¨à¥‡ à¤²à¤•à¥à¤·à¥à¤¯à¥‹à¤‚ à¤•à¥‹ à¤ªà¤°à¤¿à¤­à¤¾à¤·à¤¿à¤¤ à¤”à¤° à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾ à¤¦à¥‡à¤‚', 'â€¢ à¤ªà¥à¤°à¤®à¥à¤– à¤œà¥‹à¤–à¤¿à¤® à¤”à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¥‹ à¤¸à¤®à¤à¥‡à¤‚', 'â€¢ à¤à¤• à¤¸à¤°à¤² à¤•à¤¾à¤°à¥à¤¯à¤¯à¥‹à¤œà¤¨à¤¾ à¤¬à¤¨à¤¾à¤à¤', 'â€¢ à¤¤à¤¿à¤®à¤¾à¤¹à¥€ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤•à¥à¤¯à¤¾ à¤•à¤°à¥‡à¤‚ à¤œà¤¾à¤¨à¥‡à¤‚'],
        tools: ['â€¢ à¤¡à¥à¤°à¥€à¤® à¤¬à¤¿à¤²à¥à¤¡à¤° à¤šà¥‡à¤•à¤²à¤¿à¤¸à¥à¤Ÿ', 'â€¢ à¤œà¥‹à¤–à¤¿à¤® à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨ à¤ªà¥‰à¤‡à¤‚à¤Ÿà¤°à¥à¤¸', 'â€¢ à¤¸à¥à¤Ÿà¤¾à¤°à¥à¤Ÿà¤° à¤ªà¥à¤°à¥‹à¤Ÿà¥‡à¤•à¥à¤¶à¤¨ à¤®à¤¿à¤•à¥à¤¸', 'â€¢ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤†à¤µà¥ƒà¤¤à¥à¤¤à¤¿ à¤Ÿà¥‡à¤®à¥à¤ªà¤²à¥‡à¤Ÿ'],
        audioSection: 'à¤¸à¥‡à¤•à¥à¤¶à¤¨ 2: à¤‘à¤¡à¤¿à¤¯à¥‹ à¤µà¤¿à¤µà¤°à¤£',
        chooseNarration: 'à¤µà¤°à¥à¤£à¤¨ à¤­à¤¾à¤·à¤¾ à¤šà¥à¤¨à¥‡à¤‚',
        listenToLesson: 'à¤ªà¤¾à¤  à¤¸à¥à¤¨à¥‡à¤‚',
        hoverToFlip: 'à¤«à¥à¤²à¤¿à¤ª à¤•à¤°à¤¨à¥‡ à¤¹à¥‡à¤¤à¥ à¤¹à¥‹à¤µà¤° à¤•à¤°à¥‡à¤‚',
        summary: 'à¤¸à¤¾à¤°à¤¾à¤‚à¤¶',
        studyKeyIdeas: 'à¤®à¥à¤–à¥à¤¯ à¤µà¤¿à¤šà¤¾à¤°à¥‹à¤‚ à¤•à¤¾ à¤…à¤§à¥à¤¯à¤¯à¤¨ à¤•à¤°à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¥à¤µà¤¾à¤‡à¤ª à¤¯à¤¾ à¤¹à¥‹à¤µà¤° à¤•à¤°à¥‡à¤‚',
      };
    }
    if (baseLang === 'mr') {
      return {
        introTitle: 'à¤ªà¤¾à¤  1: à¤¤à¥à¤®à¤šà¥‡ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤¸à¤®à¤œà¥‚à¤¨ à¤˜à¥‡à¤£à¥‡',
        introSubtitle: 'à¤¤à¥à¤®à¤šà¥à¤¯à¤¾ à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤šà¥à¤¯à¤¾ à¤­à¤µà¤¿à¤·à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤†à¤°à¥à¤¥à¤¿à¤• à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤®à¥à¤¹à¤£à¤œà¥‡ à¤•à¤¾à¤¯ à¤¹à¥‡ à¤œà¤¾à¤£à¥‚à¤¨ à¤˜à¥à¤¯à¤¾à¤². à¤†à¤®à¥à¤¹à¥€ à¤µà¥à¤¯à¤¾à¤µà¤¹à¤¾à¤°à¤¿à¤• à¤ªà¤¾à¤µà¤²à¥‡ à¤¸à¤¾à¤‚à¤—à¥‚ à¤œà¥à¤¯à¤¾à¤®à¥à¤³à¥‡ à¤¤à¥à¤®à¥à¤¹à¥€ à¤à¤• à¤®à¤œà¤¬à¥‚à¤¤ à¤†à¤°à¥à¤¥à¤¿à¤• à¤ªà¤¾à¤¯à¤¾ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¥‚ à¤¶à¤•à¤¤à¤¾ à¤œà¥‹ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¥‡à¤¤à¤¹à¥€ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤®à¤¾à¤°à¥à¤—à¤¾à¤µà¤° à¤ à¥‡à¤µà¤¤à¥‹.',
        learnTitle: 'à¤¯à¤¾ à¤§à¤¡à¥à¤¯à¤¾à¤¤ à¤¤à¥à¤®à¥à¤¹à¥€ à¤•à¤¾à¤¯ à¤¶à¤¿à¤•à¤¾à¤²',
        listen: 'à¤à¤•à¤¾',
        stop: 'à¤¥à¤¾à¤‚à¤¬à¤µà¤¾',
        outcomesTitle: 'à¤ªà¤°à¤¿à¤£à¤¾à¤®',
        toolsTitle: 'à¤¤à¥à¤®à¥à¤¹à¥€ à¤µà¤¾à¤ªà¤°à¤£à¤¾à¤°à¥€ à¤¸à¤¾à¤§à¤¨à¥‡',
        paragraph:
          'à¤¯à¤¾ à¤§à¤¡à¥à¤¯à¤¾à¤¤, à¤¤à¥à¤®à¥à¤¹à¥€ à¤¤à¥à¤®à¤šà¥€ à¤¸à¤°à¥à¤µà¤¾à¤¤ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥€ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¤°à¤¾à¤² à¤†à¤£à¤¿ à¤¤à¥à¤¯à¤¾à¤‚à¤¨à¤¾ à¤²à¤µà¤•à¤° à¤¸à¤‚à¤°à¤•à¥à¤·à¤¿à¤¤ à¤•à¤°à¤£à¥‡ à¤•à¤¾ à¤†à¤µà¤¶à¥à¤¯à¤• à¤†à¤¹à¥‡ à¤¹à¥‡ à¤œà¤¾à¤£à¥‚à¤¨ à¤˜à¥à¤¯à¤¾à¤². à¤†à¤®à¥à¤¹à¥€ à¤µà¥à¤¯à¤¾à¤µà¤¹à¤¾à¤°à¤¿à¤• à¤ªà¤¾à¤µà¤²à¥‡ à¤¸à¤¾à¤‚à¤—à¥‚ à¤œà¥à¤¯à¤¾à¤®à¥à¤³à¥‡ à¤¤à¥à¤®à¥à¤¹à¥€ à¤à¤• à¤®à¤œà¤¬à¥‚à¤¤ à¤†à¤°à¥à¤¥à¤¿à¤• à¤ªà¤¾à¤¯à¤¾ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¥‚ à¤¶à¤•à¤¤à¤¾ à¤œà¥‹ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¥‡à¤¤à¤¹à¥€ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤®à¤¾à¤°à¥à¤—à¤¾à¤µà¤° à¤ à¥‡à¤µà¤¤à¥‹.',
        outcomes: ['â€¢ à¤§à¥à¤¯à¥‡à¤¯à¥‡ à¤ªà¤°à¤¿à¤­à¤¾à¤·à¤¿à¤¤ à¤•à¤°à¤¾ à¤†à¤£à¤¿ à¤ªà¥à¤°à¤¾à¤§à¤¾à¤¨à¥à¤¯ à¤¦à¥à¤¯à¤¾', 'â€¢ à¤ªà¥à¤°à¤®à¥à¤– à¤§à¥‹à¤•à¥‡ à¤†à¤£à¤¿ à¤¸à¤‚à¤°à¤•à¥à¤·à¤£ à¤¸à¤®à¤œà¤¾', 'â€¢ à¤¸à¤¾à¤§à¥€ à¤•à¥ƒà¤¤à¥€ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¤¾', 'â€¢ à¤¤à¤¿à¤®à¤¾à¤¹à¥€ à¤ªà¥à¤¨à¤°à¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤•à¤¾à¤¯ à¤•à¤°à¤¾à¤¯à¤šà¥‡ à¤¤à¥‡ à¤œà¤¾à¤£à¥‚à¤¨ à¤˜à¥à¤¯à¤¾'],
        tools: ['â€¢ à¤¡à¥à¤°à¥€à¤® à¤¬à¤¿à¤²à¥à¤¡à¤° à¤šà¥‡à¤•à¤²à¤¿à¤¸à¥à¤Ÿ', 'â€¢ à¤œà¥‹à¤–à¥€à¤® à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨ à¤ªà¥‰à¤ˆà¤‚à¤Ÿà¤°à¥à¤¸', 'â€¢ à¤¸à¥à¤Ÿà¤¾à¤°à¥à¤Ÿà¤° à¤ªà¥à¤°à¥‹à¤Ÿà¥‡à¤•à¥à¤¶à¤¨ à¤®à¤¿à¤•à¥à¤¸', 'â€¢ à¤ªà¥à¤¨à¤°à¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤µà¤¾à¤°à¤‚à¤µà¤¾à¤°à¤¤à¤¾ à¤Ÿà¥‡à¤®à¥à¤ªà¤²à¥‡à¤Ÿ'],
        audioSection: 'à¤µà¤¿à¤­à¤¾à¤— 2: à¤‘à¤¡à¤¿à¤“ à¤¨à¤¿à¤µà¥‡à¤¦à¤¨',
        chooseNarration: 'à¤¨à¤¿à¤µà¥‡à¤¦à¤¨ à¤­à¤¾à¤·à¤¾ à¤¨à¤¿à¤µà¤¡à¤¾',
        listenToLesson: 'à¤ªà¤¾à¤  à¤à¤•à¤¾',
        hoverToFlip: 'à¤«à¥à¤²à¤¿à¤ªà¤¸à¤¾à¤ à¥€ à¤¹à¥‹à¤µà¤° à¤•à¤°à¤¾',
        summary: 'à¤¸à¤¾à¤°à¤¾à¤‚à¤¶',
        studyKeyIdeas: 'à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥à¤¯à¤¾ à¤•à¤²à¥à¤ªà¤¨à¤¾ à¤…à¤­à¥à¤¯à¤¾à¤¸à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¥à¤µà¤¾à¤‡à¤ª à¤•à¤¿à¤‚à¤µà¤¾ à¤¹à¥‹à¤µà¤° à¤•à¤°à¤¾',
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
      audioSection: 'Section 2: Audio Narration',
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
          title: 'à¤†à¤ªà¤•à¥‡ à¤¸à¤ªà¤¨à¥‡ à¤•à¥à¤¯à¤¾ à¤¹à¥ˆà¤‚?',
          front: ['à¤®à¥à¤–à¥à¤¯ à¤œà¥€à¤µà¤¨ à¤²à¤•à¥à¤·à¥à¤¯à¥‹à¤‚ à¤•à¥€ à¤ªà¤¹à¤šà¤¾à¤¨', 'à¤²à¤˜à¥/à¤¦à¥€à¤°à¥à¤˜à¤•à¤¾à¤²à¤¿à¤• à¤†à¤•à¤¾à¤‚à¤•à¥à¤·à¤¾à¤à¤‚ à¤¸à¥‚à¤šà¥€à¤¬à¤¦à¥à¤§ à¤•à¤°à¥‡à¤‚', 'à¤ªà¥à¤°à¤­à¤¾à¤µ à¤”à¤° à¤¸à¤®à¤¯à¤°à¥‡à¤–à¤¾ à¤•à¥‡ à¤†à¤§à¤¾à¤° à¤ªà¤° à¤ªà¥à¤°à¤¾à¤¥à¤®à¤¿à¤•à¤¤à¤¾'],
          back: 'à¤…à¤ªà¤¨à¥‡ à¤”à¤° à¤…à¤ªà¤¨à¥‡ à¤ªà¤°à¤¿à¤µà¤¾à¤° à¤•à¥‡ à¤²à¤¿à¤ à¤¸à¤¬à¤¸à¥‡ à¤®à¤¹à¤¤à¥à¤µà¤ªà¥‚à¤°à¥à¤£ à¤²à¤•à¥à¤·à¥à¤¯à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¤°à¥‡à¤‚à¥¤',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¥à¤¯à¥‹à¤‚ à¤šà¤¾à¤¹à¤¿à¤',
          front: ['à¤œà¥‹à¤–à¤¿à¤® à¤¸à¤®à¤à¥‡à¤‚: à¤†à¤¯ à¤¹à¤¾à¤¨à¤¿, à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤–à¤°à¥à¤š', 'à¤¬à¥€à¤®à¤¾ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¤¾ à¤•à¥ˆà¤¸à¥‡ à¤˜à¤Ÿà¤¾à¤¤à¤¾ à¤¹à¥ˆ', 'à¤ªà¥à¤°à¥‹à¤à¤•à¥à¤Ÿà¤¿à¤µ à¤¯à¥‹à¤œà¤¨à¤¾ à¤¸à¥‡ à¤¦à¥ƒà¤¢à¤¼à¤¤à¤¾ à¤¬à¤¨à¤¾à¤à¤‚'],
          back: 'à¤…à¤¨à¤ªà¥‡à¤•à¥à¤·à¤¿à¤¤ à¤˜à¤Ÿà¤¨à¤¾à¤“à¤‚ à¤¸à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥€ à¤°à¤•à¥à¤·à¤¾ à¤¹à¥‡à¤¤à¥ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤†à¤µà¤¶à¥à¤¯à¤• à¤¹à¥ˆà¥¤',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'à¤®à¤œà¤¬à¥‚à¤¤ à¤¨à¥€à¤‚à¤µ à¤¬à¤¨à¤¾à¤à¤‚',
          front: ['à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤®à¤¾à¤‡à¤²à¤¸à¥à¤Ÿà¥‹à¤¨', 'à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤²à¥€à¤¨ à¤¬à¤šà¤¤ à¤µ à¤¬à¥‡à¤¸à¤¿à¤• à¤ªà¥à¤°à¥‹à¤Ÿà¥‡à¤•à¥à¤¶à¤¨', 'à¤¨à¤¿à¤¯à¤®à¤¿à¤¤ à¤¸à¤®à¥€à¤•à¥à¤·à¤¾ à¤µ à¤¸à¥à¤§à¤¾à¤°'],
          back: 'à¤¸à¤°à¤², à¤Ÿà¤¿à¤•à¤¾à¤Š à¤†à¤§à¤¾à¤° à¤†à¤ªà¤•à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥‹ à¤Ÿà¥à¤°à¥ˆà¤• à¤ªà¤° à¤°à¤–à¤¤à¤¾ à¤¹à¥ˆà¥¤',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    if (baseLang === 'mr') {
      return [
        {
          title: 'à¦¤à¥à¤®à¤šà¥€ à¤¸à¥à¤µà¦ªà¥à¤¨à¥‡ à¤•à¤¾à¤¯ à¤†à¤¹à¥‡à¤¤?',
          front: ['à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥€ à¤œà¥€à¤µà¤¨à¤§à¥à¤¯à¥‡à¤¯à¥‡ à¤“à¤³à¤–à¤¾', 'à¤²à¤˜à¥/à¤¦à¥€à¤°à¥à¤˜à¤•à¤¾à¤²à¥€à¤¨ à¤†à¤•à¤¾à¤‚à¤•à¥à¤·à¤¾ à¤¯à¤¾à¤¦à¥€ à¤•à¤°à¤¾', 'à¤ªà¤°à¤¿à¤£à¤¾à¤® à¤µ à¤•à¤¾à¤²à¤°à¥‡à¤·à¥‡à¤¨à¥à¤¸à¤¾à¤° à¤ªà¥à¤°à¤¾à¤§à¤¾à¤¨à¥à¤¯'],
          back: 'à¤¸à¥à¤µà¤¤à¤ƒà¤¸à¤¾à¤ à¥€ à¤µ à¤•à¥à¤Ÿà¥à¤‚à¤¬à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¤°à¥à¤µà¤¾à¤¤ à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥€ à¤§à¥à¤¯à¥‡à¤¯à¥‡ à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤•à¤°à¤¾.',
          color: 'from-pink-50 to-rose-50 border-pink-100',
        },
        {
          title: 'à¤¸à¥à¤µà¤ªà¥à¤¨à¤¾à¤‚à¤¨à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¤¾ à¤†à¤µà¤¶à¥à¤¯à¤•',
          front: ['à¤œà¥‹à¤–à¥€à¤® à¤¸à¤®à¤œà¥‚à¤¨ à¤˜à¥à¤¯à¤¾: à¤‰à¤¤à¥à¤ªà¤¨à¥à¤¨ à¤˜à¤Ÿ, à¤µà¥ˆà¤¦à¥à¤¯à¤•à¥€à¤¯ à¤–à¤°à¥à¤š', 'à¤µà¤¿à¤®à¤¾ à¤…à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤à¤¤à¤¾ à¤•à¤¶à¥€ à¤•à¤®à¥€ à¤•à¤°à¤¤à¥‹', 'à¤¸à¤•à¥à¤°à¤¿à¤¯ à¤¨à¤¿à¤¯à¥‹à¤œà¤¨à¤¾à¤¨à¥‡ à¤²à¤µà¤šà¤¿à¤•à¤¤à¤¾'],
          back: 'à¤…à¤¨à¤ªà¥‡à¤•à¥à¤·à¤¿à¤¤ à¤˜à¤Ÿà¤¨à¤¾à¤‚à¤ªà¤¾à¤¸à¥‚à¤¨ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤µà¤¾à¤šà¤µà¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¤‚à¤°à¤•à¥à¤·à¤£ à¤—à¤°à¤œà¥‡à¤šà¥‡ à¤†à¤¹à¥‡.',
          color: 'from-blue-50 to-indigo-50 border-blue-100',
        },
        {
          title: 'à¤®à¤œà¤¬à¥‚à¤¤ à¤ªà¤¾à¤¯à¤¾ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¤¾',
          front: ['à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤†à¤°à¥à¤¥à¤¿à¤• à¤®à¥ˆà¤²à¤¾à¤šà¥‡ à¤¦à¤—à¤¡', 'à¤†à¤£à¥€à¤¬à¤¾à¤£à¥€ à¤¬à¤šà¤¤ à¤µ à¤®à¥‚à¤²à¤­à¥‚à¤¤ à¤¸à¤‚à¤°à¤•à¥à¤·à¤£', 'à¤¨à¤¿à¤¯à¤®à¤¿à¤¤ à¤ªà¥à¤¨à¤°à¤¾à¤µà¤²à¥‹à¤•à¤¨ à¤µ à¤¸à¥à¤§à¤¾à¤°à¤£à¤¾'],
          back: 'à¤¸à¥‹à¤ªà¥€, à¤Ÿà¤¿à¤•à¤¾à¤Š à¤ªà¤¾à¤¯à¤¾à¤­à¤°à¤£à¥€ à¤¸à¥à¤µà¤ªà¥à¤¨à¥‡ à¤®à¤¾à¤°à¥à¤—à¤¾à¤µà¤° à¤ à¥‡à¤µà¤¤à¥‡.',
          color: 'from-green-50 to-emerald-50 border-green-100',
        },
      ];
    }
    return [
      {
        title: 'What Are Your Dreams?',
        front: ['Identify key life goals', 'List short/long-term aspirations', 'Prioritize by impact and timeline'],
        back: 'Clarify the most important goals for you and your family.',
        color: 'from-pink-50 to-rose-50 border-pink-100',
      },
      {
        title: 'Why Dreams Need Protection',
        front: ['Understand risks: income loss, medical', 'How insurance reduces uncertainty', 'Resilience through proactive planning'],
        back: 'Protection keeps your plans intact when life is uncertain.',
        color: 'from-blue-50 to-indigo-50 border-blue-100',
      },
      {
        title: 'Build a Strong Foundation',
        front: ['Set clear milestones', 'Emergency savings and protection', 'Review and adjust regularly'],
        back: 'A simple, durable base keeps dreams on track.',
        color: 'from-green-50 to-emerald-50 border-green-100',
      },
    ];
  }, [baseLang]);

  const pdfUi = React.useMemo(() => {
    if (baseLang === 'hi') return { title: 'à¤ªà¥€à¤¡à¥€à¤à¤« à¤¦à¤¸à¥à¤¤à¤¾à¤µà¥‡à¤œ', open: 'à¤–à¥‹à¤²à¥‡à¤‚', download: 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡' };
    if (baseLang === 'mr') return { title: 'PDF à¤¦à¤¸à¥à¤¤à¤à¤µà¤œ', open: 'à¤‰à¤˜à¤¡à¤¾', download: 'à¤¡à¤¾à¤‰à¤¨à¤²à¥‹à¤¡' };
    return { title: 'PDF Document', open: 'Open', download: 'Download' };
  }, [baseLang]);
  const pdfUrl = '/assets/Us-department-of-justice.pdf';

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
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
                            <p className="text-xs text-gray-500 mt-4">{baseLang === 'hi' ? 'à¤«à¥à¤²à¤¿à¤ª à¤•à¤°à¤¨à¥‡ à¤¹à¥‡à¤¤à¥ à¤¹à¥‹à¤µà¤° à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤«à¥à¤²à¤¿à¤ªà¤¸à¤¾à¤ à¥€ à¤¹à¥‹à¤µà¤° à¤•à¤°à¤¾' : 'Hover to flip'}</p>
                          </div>
                          {/* Back */}
                          <div className={`absolute inset-0 bg-white border rounded-xl p-6 shadow-sm [transform:rotateY(180deg)] [backface-visibility:hidden]`}>
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{baseLang === 'hi' ? 'à¤¸à¤¾à¤°à¤¾à¤‚à¤¶' : baseLang === 'mr' ? 'à¤¸à¤¾à¤°à¤¾à¤‚à¤¶' : 'Summary'}</h4>
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
            <p className="text-sm text-gray-500 text-center mt-4">{baseLang === 'hi' ? 'à¤®à¥à¤–à¥à¤¯ à¤µà¤¿à¤šà¤¾à¤°à¥‹à¤‚ à¤•à¤¾ à¤…à¤§à¥à¤¯à¤¯à¤¨ à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥à¤¯à¤¾ à¤•à¤²à¥à¤ªà¤¨à¤¾ à¤…à¤­à¥à¤¯à¤¾à¤¸à¤¾' : 'Study key ideas'}</p>
          </div>

          {/* Section Description with TTS and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{t.learnTitle}</h2>
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    // Stop any currently playing audio when language changes
                    const synth = window.speechSynthesis;
                    if (synth) {
                      synth.cancel();
                      setSpeakingBlocks({});
                    }
                    setSelectedLang(e.target.value);
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <optgroup label="ðŸŒ English Variants">
                    {languageOptions.filter(opt => opt.code.startsWith('en-')).map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.label}</option>
                  ))}
                  </optgroup>
                  <optgroup label="ðŸ‡®ðŸ‡³ Indian Languages">
                    {languageOptions.filter(opt => opt.code.includes('-IN')).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="ðŸ‡ªðŸ‡º European Languages">
                    {languageOptions.filter(opt => 
                      ['fr-', 'de-', 'es-', 'it-', 'pt-', 'nl-', 'sv-', 'no-', 'da-', 'fi-', 'pl-', 'ru-', 'uk-', 'cs-', 'sk-', 'hu-', 'ro-', 'bg-', 'hr-', 'sl-', 'et-', 'lv-', 'lt-', 'el-', 'tr-', 'is-', 'mt-'].some(prefix => opt.code.startsWith(prefix))
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                  <optgroup label="ðŸŒ Asian Languages">
                    {languageOptions.filter(opt => 
                      ['ja-', 'ko-', 'zh-', 'th-', 'vi-', 'id-', 'ms-', 'fil-', 'ar-', 'he-', 'fa-', 'hi-PK', 'ur-PK', 'bn-BD', 'si-', 'my-', 'km-', 'lo-', 'mn-', 'ka-', 'hy-', 'az-', 'kk-', 'ky-', 'uz-', 'tg-', 'tk-'].some(prefix => opt.code.startsWith(prefix) || opt.code === prefix)
                    ).map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </optgroup>
                </select>
                <select
                  value={selectedVoiceURI}
                  onChange={(e) => { const synth = window.speechSynthesis; if (synth) { synth.cancel(); setSpeakingBlocks({}); } setSelectedVoiceURI(e.target.value); }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {(() => {
                    // Enhanced voice filtering with fallback strategies
                    const findBestVoices = (targetLang) => {
                      const baseLanguage = targetLang.substring(0, 2);
                      
                      // Strategy 1: Exact language code match
                      let exactMatches = voices.filter(voice => voice.lang === targetLang);
                      
                      // Strategy 2: Case-insensitive exact match
                      if (exactMatches.length === 0) {
                        exactMatches = voices.filter(voice => 
                          voice.lang.toLowerCase() === targetLang.toLowerCase()
                        );
                      }
                      
                      // Strategy 3: Base language match
                      const baseMatches = voices.filter(voice => 
                        voice.lang.startsWith(baseLanguage + '-') || 
                        voice.lang === baseLanguage ||
                        voice.lang.includes(baseLanguage)
                      );
                      
                      // Strategy 4: Language family matching
                      const languageFamilyMap = {
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
                        'en': ['en', 'eng', 'english']
                      };
                      
                      const familyCodes = languageFamilyMap[baseLanguage] || [baseLanguage];
                      const familyMatches = voices.filter(voice => 
                        familyCodes.some(code => 
                          voice.lang.toLowerCase().includes(code.toLowerCase())
                        )
                      );
                      
                      // Combine all matches and remove duplicates
                      const allMatches = [...exactMatches, ...baseMatches, ...familyMatches];
                      const uniqueMatches = allMatches.filter((voice, index, self) => 
                        index === self.findIndex(v => v.name === voice.name)
                    );
                      
                      return uniqueMatches;
                    };
                    
                    const bestVoices = findBestVoices(selectedLang);
                    
                    if (bestVoices.length > 0) {
                      return bestVoices.map(voice => (
                        <option key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} ({voice.lang})
                        </option>
                      ));
                    } else {
                      return <option value="">No suitable voice found</option>;
                    }
                  })()}
                  {voices.length === 0 && <option value="">System default</option>}
                </select>
                <Button onClick={handleFullScreen} variant="outline" size="icon" className="p-2">
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

        {/* Section 2: PDF Document */}
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
                    {baseLang === 'hi' ? 'à¤†à¤ªà¤•à¤¾ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° PDF à¤¨à¤¹à¥€à¤‚ à¤¦à¤¿à¤–à¤¾ à¤¸à¤•à¤¤à¤¾à¥¤' : 
                     baseLang === 'mr' ? 'à¤¤à¥à¤®à¤šà¤¾ à¤¬à¥à¤°à¤¾à¤‰à¤œà¤¼à¤° PDF à¤¦à¤¾à¤–à¤µà¥‚ à¤¶à¤•à¤¤ à¤¨à¤¾à¤¹à¥€.' : 
                     'Your browser does not support PDF viewing.'}
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline ml-2"
                    >
                      {baseLang === 'hi' ? 'à¤¯à¤¹à¤¾à¤‚ à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤¯à¥‡à¤¥à¥‡ à¤•à¥à¤²à¤¿à¤• à¤•à¤°à¤¾' : 'Click here'}
                    </a>
                    {baseLang === 'hi' ? 'PDF à¤¦à¥‡à¤–à¤¨à¥‡ à¤•à¥‡ à¤²à¤¿à¤' : baseLang === 'mr' ? 'PDF à¤ªà¤¹à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€' : 'to view the PDF'}
                  </p>
                </iframe>
              </div>
              

            </div>
            <div className="mt-3 text-sm text-gray-500 text-center">
              {baseLang === 'hi' ? 'PDF à¤«à¤¼à¤¾à¤‡à¤²: Us-department-of-justice.pdf' : 
               baseLang === 'mr' ? 'PDF à¤«à¤¾à¤ˆà¤²: Us-department-of-justice.pdf' : 
               'PDF File: Us-department-of-justice.pdf'}
            </div>
          </div>
        </section>

        {/* Section 3: Audio Narration (Translated) */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t.audioSection}</h2>
            <p className="text-sm text-gray-600 text-center mb-4">
              {baseLang === 'hi' ? 'à¤¯à¤¹ à¤­à¤¾à¤·à¤¾ à¤•à¥‡à¤µà¤² à¤‘à¤¡à¤¿à¤¯à¥‹ à¤•à¥‡ à¤²à¤¿à¤ à¤¹à¥ˆ, à¤ªà¥‚à¤°à¥‡ à¤ªà¥‡à¤œ à¤•à¥€ à¤­à¤¾à¤·à¤¾ à¤¨à¤¹à¥€à¤‚ à¤¬à¤¦à¤²à¥‡à¤—à¥€' : 
               baseLang === 'mr' ? 'à¤¹à¥€ à¤­à¤¾à¤·à¤¾ à¤«à¤•à¥à¤¤ à¤‘à¤¡à¤¿à¤“à¤¸à¤¾à¤ à¥€ à¤†à¤¹à¥‡, à¤¸à¤‚à¤ªà¥‚à¤°à¥à¤£ à¤ªà¥ƒà¤·à¥à¤ à¤¾à¤šà¥€ à¤­à¤¾à¤·à¤¾ à¤¬à¤¦à¤²à¤£à¤¾à¤° à¤¨à¤¾à¤¹à¥€' : 
               'This language is only for audio, it will not change the language of the entire page'}
            </p>
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-3">{t.chooseNarration}</label>
                <select
                  value={audioLang}
                  onChange={(e) => setAudioLang(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="en-US">ðŸ‡ºðŸ‡¸ English</option>
                  <option value="hi-IN">ðŸ‡®ðŸ‡³ Hindi</option>
                  <option value="mr-IN">ðŸ‡®ðŸ‡³ Marathi</option>
                </select>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.listenToLesson}</h3>
                <div className="bg-white rounded-lg p-4 shadow-md">
                  {/* Language-specific audio players */}
                  {audioLang === 'en-US' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/English.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'hi-IN' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/hindi.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  {audioLang === 'mr-IN' && (
                    <audio controls className="w-full" preload="metadata">
                      <source src="/ma.mp3" type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {audioLang === 'hi-IN' ? 'à¤¹à¤¿à¤‚à¤¦à¥€ à¤‘à¤¡à¤¿à¤¯à¥‹ à¤«à¤¼à¤¾à¤‡à¤²: /hindi.mp3' : 
                     audioLang === 'mr-IN' ? 'à¤®à¤°à¤¾à¤ à¥€ à¤‘à¤¡à¤¿à¤“ à¤«à¤¾à¤ˆà¤²: /ma.mp3' : 
                     'English audio file: /English.mp3'}
                  </div>

                  <div className="mt-3 text-sm text-gray-600">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {audioLang === 'en-US' && 'High-quality English narration with clear pronunciation'}
                      {audioLang === 'hi-IN' && 'à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤‰à¤šà¥à¤šà¤¾à¤°à¤£ à¤•à¥‡ à¤¸à¤¾à¤¥ à¤‰à¤šà¥à¤š à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾ à¤µà¤¾à¤²à¥€ à¤¹à¤¿à¤‚à¤¦à¥€ à¤•à¤¥à¤¾'}
                      {audioLang === 'mr-IN' && 'à¤¸à¥à¤ªà¤·à¥à¤Ÿ à¤‰à¤šà¥à¤šà¤¾à¤°à¤£à¤¾à¤¸à¤¹ à¤‰à¤šà¥à¤š à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¥‡à¤šà¥€ à¤®à¤°à¤¾à¤ à¥€ à¤•à¤¥à¤¾'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 1.1: Adult Learning - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">ðŸŽ“</span>
                        </div>
              <div>
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Topic 1.1</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Adult Learning in Tactical & Compliance Settings</h2>
                <p className="text-gray-600">Understanding Andragogy in Policing</p>
                      </div>
                        </div>
            {/* Learning Objectives Card */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Learning Objectives
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Understand adult learning principles in law enforcement</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Apply andragogy to tactical training scenarios</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Design compliance training for adult learners</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Implement stress-based learning techniques</span>
                    </div>
                  </div>
                </div>

            {/* Key Principles Interactive Cards */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Core Principles of Adult Learning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Self-Directed Learning</h4>
                  <p className="text-sm text-gray-700">Officers control their learning pace and build on existing experience</p>
                    </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Problem-Centered Approach</h4>
                  <p className="text-sm text-gray-700">Use real-world scenarios that connect to actual policing situations</p>
                    </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">Experience-Based Learning</h4>
                  <p className="text-sm text-gray-700">Leverage field experience and peer-to-peer learning opportunities</p>
                  </div>
                </div>
            </div>

            {/* Tactical Training Considerations */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</span>
                Tactical Training Considerations
                </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">High-Stress Learning Environment</h4>
                  <p className="text-sm text-gray-700">Training must prepare officers for real-world pressure and decision-making under stress</p>
                    </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800 mb-2">Muscle Memory Development</h4>
                  <p className="text-sm text-gray-700">Repetitive practice for critical skills that must become automatic responses</p>
                </div>
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 mb-2">Scenario-Based Training</h4>
                  <p className="text-sm text-gray-700">Training that mimics real conditions and requires split-second decision making</p>
              </div>
            </div>
          </div>

            {/* Best Practices Summary */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Key Takeaways</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-blue-200">âœ“</span>
                  <span className="text-sm">Interactive learning with role-playing and simulations</span>
                  </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-200">âœ“</span>
                  <span className="text-sm">Peer teaching with experienced officers mentoring newer ones</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-200">âœ“</span>
                  <span className="text-sm">Continuous assessment and regular evaluation</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-blue-200">âœ“</span>
                  <span className="text-sm">Constructive feedback loops for improvement</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topic 1.2: DOJ & POST Requirements - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">âš–ï¸</span>
                      </div>
              <div>
                <span className="text-sm font-medium text-purple-600 bg-purple-100 px-3 py-1 rounded-full">Topic 1.2</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">DOJ & POST Training Requirements</h2>
                <p className="text-gray-600">Federal and State Training Standards</p>
                  </div>
                </div>

            {/* Federal Requirements Card */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Training Compliance Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-purple-200">âœ“</span>
                  <span className="text-sm">Annual constitutional law updates completed</span>
                  </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-200">âœ“</span>
                  <span className="text-sm">Civil rights training documentation on file</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-200">âœ“</span>
                  <span className="text-sm">Use of force protocols reviewed and signed</span>
                  </div>
                <div className="flex items-start space-x-3">
                  <span className="text-purple-200">âœ“</span>
                  <span className="text-sm">Specialized role training requirements met</span>
                </div>
                  </div>
                </div>
                  </div>
        </section>

        {/* Topic 1.3: Ethical & Civil Rights - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-red-50 to-orange-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">ðŸ›¡ï¸</span>
                </div>
              <div>
                <span className="text-sm font-medium text-red-600 bg-red-100 px-3 py-1 rounded-full">Topic 1.3</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Ethical & Civil Rights Foundations</h2>
                <p className="text-gray-600">Use of Force, Miranda, Implicit Bias</p>
              </div>
            </div>

            {/* Constitutional Framework */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Constitutional Framework
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800 mb-2">Fourth Amendment</h4>
                  <p className="text-sm text-gray-700">Search and seizure limitations, probable cause requirements</p>
          </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">Fifth Amendment</h4>
                  <p className="text-sm text-gray-700">Miranda rights, self-incrimination protections</p>
      </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">Sixth Amendment</h4>
                  <p className="text-sm text-gray-700">Right to counsel, speedy trial requirements</p>
          </div>
        </div>
      </div>

            {/* Use of Force Standards */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</span>
                Use of Force Standards
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Graham v. Connor Standard</h4>
                  <p className="text-sm text-gray-700">Objective reasonableness test based on severity of crime, threat level, and resistance</p>
              </div>
                <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">Force Continuum</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <span className="bg-gray-200 px-2 py-1 rounded">Presence</span>
                    <span>â†’</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Verbal Commands</span>
                    <span>â†’</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Empty Hand</span>
                    <span>â†’</span>
                    <span className="bg-gray-200 px-2 py-1 rounded">Less Lethal</span>
                    <span>â†’</span>
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
            <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Ethical Foundation Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-red-200">âœ“</span>
                  <span className="text-sm">Constitutional rights must be respected in all interactions</span>
                        </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-200">âœ“</span>
                  <span className="text-sm">Use of force must be objectively reasonable</span>
                          </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-200">âœ“</span>
                  <span className="text-sm">Implicit bias awareness prevents discriminatory practices</span>
                        </div>
                <div className="flex items-start space-x-3">
                  <span className="text-red-200">âœ“</span>
                  <span className="text-sm">Continuous training maintains ethical standards</span>
                        </div>
                      </div>
                    </div>
                </div>
        </section>

        {/* Topic 1.4: Trauma-informed instruction - Complete Lesson */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-100 rounded-2xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white">ðŸ’™</span>
                        </div>
              <div>
                <span className="text-sm font-medium text-teal-600 bg-teal-100 px-3 py-1 rounded-full">Topic 1.4</span>
                <h2 className="text-2xl font-bold text-gray-900 mt-1">Trauma-informed Instruction</h2>
                <p className="text-gray-600">Supporting First Responders' Mental Health</p>
                </div>
              </div>

            {/* Understanding Trauma Types */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</span>
                Understanding Trauma in Law Enforcement
                    </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-800 mb-2">Direct Trauma</h4>
                  <p className="text-sm text-gray-700">Personal involvement in traumatic events</p>
                        </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">Vicarious Trauma</h4>
                  <p className="text-sm text-gray-700">Exposure to others' traumatic experiences</p>
                    </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">Cumulative Trauma</h4>
                  <p className="text-sm text-gray-700">Repeated exposure over time</p>
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
            <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Mental Health Support Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <span className="text-teal-200">âœ“</span>
                  <span className="text-sm">Recognize different types of trauma exposure</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal-200">âœ“</span>
                  <span className="text-sm">Apply trauma-informed principles in training</span>
                    </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal-200">âœ“</span>
                  <span className="text-sm">Access appropriate support resources when needed</span>
                      </div>
                <div className="flex items-start space-x-3">
                  <span className="text-teal-200">âœ“</span>
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
              {baseLang === 'hi' ? 'à¤œà¥‹à¤–à¤¿à¤® à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨' : baseLang === 'mr' ? 'à¤œà¥‹à¤–à¥€à¤® à¤®à¥‚à¤²à¥à¤¯à¤¾à¤‚à¤•à¤¨' : 'Risk Assessment'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  front: baseLang === 'hi' ? 'à¤†à¤¯ à¤¹à¤¾à¤¨à¤¿' : baseLang === 'mr' ? 'à¤‰à¤¤à¥à¤ªà¤¨à¥à¤¨ à¤˜à¤Ÿ' : 'Income Loss',
                  back: baseLang === 'hi' ? 'à¤…à¤šà¤¾à¤¨à¤• à¤¨à¥Œà¤•à¤°à¥€ à¤›à¥‚à¤Ÿà¤¨à¤¾ à¤¯à¤¾ à¤¬à¥€à¤®à¤¾à¤°à¥€ à¤•à¥‡ à¤•à¤¾à¤°à¤£ à¤†à¤¯ à¤¬à¤‚à¤¦ à¤¹à¥‹à¤¨à¤¾' : baseLang === 'mr' ? 'à¤…à¤šà¤¾à¤¨à¤• à¤¨à¥‹à¤•à¤°à¥€ à¤—à¤®à¤¾à¤µà¤£à¥‡ à¤•à¤¿à¤‚à¤µà¤¾ à¤†à¤œà¤¾à¤°à¤¾à¤®à¥à¤³à¥‡ à¤‰à¤¤à¥à¤ªà¤¨à¥à¤¨ à¤¥à¤¾à¤‚à¤¬à¤£à¥‡' : 'Sudden job loss or illness stopping income',
                  color: 'from-red-50 to-pink-50 border-red-200'
                },
                {
                  front: baseLang === 'hi' ? 'à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤–à¤°à¥à¤š' : baseLang === 'mr' ? 'à¤µà¥ˆà¤¦à¥à¤¯à¤•à¥€à¤¯ à¤–à¤°à¥à¤š' : 'Medical Expenses',
                  back: baseLang === 'hi' ? 'à¤…à¤ªà¥à¤°à¤¤à¥à¤¯à¤¾à¤¶à¤¿à¤¤ à¤šà¤¿à¤•à¤¿à¤¤à¥à¤¸à¤¾ à¤†à¤ªà¤¾à¤¤à¤•à¤¾à¤² à¤”à¤° à¤…à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤•à¥‡ à¤¬à¤¿à¤²' : baseLang === 'mr' ? 'à¤…à¤¨à¤ªà¥‡à¤•à¥à¤·à¤¿à¤¤ à¤µà¥ˆà¤¦à¥à¤¯à¤•à¥€à¤¯ à¤†à¤£à¥€à¤¤à¤•à¤¾à¤² à¤†à¤£à¤¿ à¤°à¥à¤—à¥à¤£à¤¾à¤²à¤¯à¤¾à¤šà¥‡ à¤¬à¤¿à¤²' : 'Unexpected medical emergencies and hospital bills',
                  color: 'from-blue-50 to-cyan-50 border-blue-200'
                },
                {
                  front: baseLang === 'hi' ? 'à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿ à¤•à¥à¤·à¤¤à¤¿' : baseLang === 'mr' ? 'à¤®à¤¾à¤²à¤®à¤¤à¥à¤¤à¤¾ à¤¨à¥à¤•à¤¸à¤¾à¤¨' : 'Property Damage',
                  back: baseLang === 'hi' ? 'à¤ªà¥à¤°à¤¾à¤•à¥ƒà¤¤à¤¿à¤• à¤†à¤ªà¤¦à¤¾ à¤¯à¤¾ à¤¦à¥à¤°à¥à¤˜à¤Ÿà¤¨à¤¾ à¤¸à¥‡ à¤¸à¤‚à¤ªà¤¤à¥à¤¤à¤¿ à¤•à¤¾ à¤¨à¥à¤•à¤¸à¤¾à¤¨' : baseLang === 'mr' ? 'à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤†à¤ªà¤¤à¥à¤¤à¥€ à¤•à¤¿à¤‚à¤µà¤¾ à¤…à¤ªà¤˜à¤¾à¤¤à¤¾à¤®à¥à¤³à¥‡ à¤®à¤¾à¤²à¤®à¤¤à¥à¤¤à¥‡à¤šà¥‡ à¤¨à¥à¤•à¤¸à¤¾à¤¨' : 'Property loss from natural disasters or accidents',
                  color: 'from-green-50 to-emerald-50 border-green-200'
                },
                {
                  front: baseLang === 'hi' ? 'à¤¦à¤¾à¤¯à¤¿à¤¤à¥à¤µ à¤œà¥‹à¤–à¤¿à¤®' : baseLang === 'mr' ? 'à¤œà¤¬à¤¾à¤¬à¤¦à¤¾à¤°à¥€ à¤œà¥‹à¤–à¥€à¤®' : 'Liability Risk',
                  back: baseLang === 'hi' ? 'à¤¦à¥‚à¤¸à¤°à¥‹à¤‚ à¤•à¥‹ à¤¨à¥à¤•à¤¸à¤¾à¤¨ à¤ªà¤¹à¥à¤‚à¤šà¤¾à¤¨à¥‡ à¤ªà¤° à¤•à¤¾à¤¨à¥‚à¤¨à¥€ à¤¦à¤¾à¤¯à¤¿à¤¤à¥à¤µ' : baseLang === 'mr' ? 'à¤‡à¤¤à¤°à¤¾à¤‚à¤¨à¤¾ à¤¨à¥à¤•à¤¸à¤¾à¤¨ à¤ªà¥‹à¤¹à¥‹à¤šà¤µà¤²à¥à¤¯à¤¾à¤¸ à¤•à¤¾à¤¯à¤¦à¥‡à¤¶à¥€à¤° à¤œà¤¬à¤¾à¤¬à¤¦à¤¾à¤°à¥€' : 'Legal liability for causing harm to others',
                  color: 'from-purple-50 to-violet-50 border-purple-200'
                }
              ].map((card, idx) => (
                <div key={idx} className="flip-card">
                  <div className="flip-card-inner">
                    <div className={`flip-card-front ${card.color} border-2 rounded-xl p-6 flex items-center justify-center cursor-pointer`}>
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{card.front}</h3>
                        <p className="text-sm text-gray-600">
                          {baseLang === 'hi' ? 'à¤¹à¥‹à¤µà¤° à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤¹à¥‹à¤µà¥à¤¹à¤° à¤•à¤°à¤¾' : 'Hover to flip'}
                      </p>
                    </div>
                      </div>
                    <div className="flip-card-back bg-white border-2 border-gray-200 rounded-xl p-6 flex items-center justify-center">
                      <p className="text-gray-700 text-center">{card.back}</p>
                    </div>
                      </div>
                    </div>
              ))}
                      </div>
          </div>
        </section>

        {/* Section 6: Call to Action */}
        <section className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              {baseLang === 'hi' ? 'à¤…à¤ªà¤¨à¥€ à¤µà¤¿à¤¤à¥à¤¤à¥€à¤¯ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤¤à¥à¤®à¤šà¥€ à¤†à¤°à¥à¤¥à¤¿à¤• à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤¸à¥à¤°à¥‚ à¤•à¤°à¤¾' : 'Start Your Financial Protection Journey'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {baseLang === 'hi' ? 'à¤†à¤œ à¤¹à¥€ à¤…à¤ªà¤¨à¥‡ à¤¸à¤ªà¤¨à¥‹à¤‚ à¤•à¥€ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤•à¥‡ à¤²à¤¿à¤ à¤•à¤¦à¤® à¤‰à¤ à¤¾à¤à¤‚' : baseLang === 'mr' ? 'à¤†à¤œà¤š à¤¤à¥à¤®à¤šà¥à¤¯à¤¾ à¤¸à¥à¤µà¤ªà¥à¤¨à¤¾à¤‚à¤šà¥à¤¯à¤¾ à¤¸à¥à¤°à¤•à¥à¤·à¥‡à¤¸à¤¾à¤ à¥€ à¤ªà¤¾à¤Šà¤² à¤‰à¤šà¤²à¤¾à¤µà¥‡' : 'Take the first step today to protect your dreams'}
            </p>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              {baseLang === 'hi' ? 'à¤…à¤­à¥€ à¤¶à¥à¤°à¥‚ à¤•à¤°à¥‡à¤‚' : baseLang === 'mr' ? 'à¤†à¤¤à¥à¤¤à¤¾ à¤¸à¥à¤°à¥‚ à¤•à¤°à¤¾' : 'Get Started Now'}
            </button>
                    </div>
        </section>
                  </div>
    </div>
  );
};

export default LessonMod1Dreams;
