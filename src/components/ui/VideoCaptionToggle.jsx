import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Subtitles, Volume2, Languages, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const VideoCaptionToggle = ({ onCaptionChange, onAudioDescriptionChange }) => {
  const { currentLanguage } = useLanguage();
  const [captionsEnabled, setCaptionsEnabled] = useState(true);
  const [audioDescEnabled, setAudioDescEnabled] = useState(false);
  const [captionLanguage, setCaptionLanguage] = useState('en');

  const handleCaptionToggle = (enabled) => {
    setCaptionsEnabled(enabled);
    if (onCaptionChange) {
      onCaptionChange(enabled, captionLanguage);
    }
  };

  const handleCaptionLanguageChange = (lang) => {
    setCaptionLanguage(lang);
    if (onCaptionChange) {
      onCaptionChange(captionsEnabled, lang);
    }
  };

  const handleAudioDescToggle = () => {
    const newState = !audioDescEnabled;
    setAudioDescEnabled(newState);
    if (onAudioDescriptionChange) {
      onAudioDescriptionChange(newState);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Captions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Subtitles className="h-4 w-4" />
            {captionsEnabled && (
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-1">
                ON
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {currentLanguage === 'en' ? 'Closed Captions' : 'Sous-titres'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={() => handleCaptionToggle(true)}>
            <div className="flex items-center justify-between w-full">
              <span>{currentLanguage === 'en' ? 'Enable Captions' : 'Activer les sous-titres'}</span>
              {captionsEnabled && <Check className="h-4 w-4 text-green-600" />}
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleCaptionToggle(false)}>
            <div className="flex items-center justify-between w-full">
              <span>{currentLanguage === 'en' ? 'Disable Captions' : 'Désactiver les sous-titres'}</span>
              {!captionsEnabled && <Check className="h-4 w-4 text-green-600" />}
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs">
            {currentLanguage === 'en' ? 'Caption Language' : 'Langue des sous-titres'}
          </DropdownMenuLabel>
          
          <DropdownMenuItem onClick={() => handleCaptionLanguageChange('en')}>
            <div className="flex items-center justify-between w-full">
              <span>English</span>
              {captionLanguage === 'en' && <Check className="h-4 w-4 text-blue-600" />}
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={() => handleCaptionLanguageChange('fr')}>
            <div className="flex items-center justify-between w-full">
              <span>Français</span>
              {captionLanguage === 'fr' && <Check className="h-4 w-4 text-blue-600" />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Audio Description Toggle */}
      <Button
        variant={audioDescEnabled ? 'default' : 'outline'}
        size="sm"
        onClick={handleAudioDescToggle}
        className="flex items-center gap-2"
        title={currentLanguage === 'en' ? 'Audio Description' : 'Description audio'}
      >
        <Volume2 className="h-4 w-4" />
        <span className="text-xs">AD</span>
      </Button>
    </div>
  );
};

