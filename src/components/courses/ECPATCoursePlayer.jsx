// ECPAT update start - Modern Course Player Component
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLearningTracker } from '@/hooks/use-learning-tracker';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Info,
  Image as ImageIcon,
  FileText,
  Clock
} from 'lucide-react';

export function ECPATCoursePlayer({
  courseId,
  moduleName,
  content,
  xapiConfig = null
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const timeRef = useRef(null);
  
  const { trackProgress, trackInteraction, trackTimeSpent } = useLearningTracker({
    courseId,
    moduleName,
    xapiConfig
  });

  // Timer for tracking time spent
  useEffect(() => {
    if (isPlaying) {
      timeRef.current = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    } else if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, [isPlaying]);

  // Report time spent every minute
  useEffect(() => {
    if (timeSpent > 0 && timeSpent % 60 === 0) {
      trackTimeSpent(timeSpent);
    }
  }, [timeSpent, trackTimeSpent]);

  const progress = ((currentSlide + 1) / content.length) * 100;

  useEffect(() => {
    trackProgress(progress);
  }, [progress, trackProgress]);

  const handleNext = () => {
    if (currentSlide < content.length - 1) {
      setCurrentSlide(prev => prev + 1);
      trackInteraction('navigation', 'next', `Moved to slide ${currentSlide + 2}`);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
      trackInteraction('navigation', 'previous', `Moved to slide ${currentSlide}`);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    trackInteraction('playback', isPlaying ? 'pause' : 'play', isPlaying ? 'Paused content' : 'Started playing');
  };

  const renderContent = (slide) => {
    switch (slide.type) {
      case 'video':
        return (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video
              src={slide.url}
              controls
              className="w-full h-full object-cover"
              onPlay={() => trackInteraction('video', 'play', slide.title)}
              onPause={() => trackInteraction('video', 'pause', slide.title)}
            />
          </div>
        );
      
      case 'image':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-video rounded-lg overflow-hidden"
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
              onClick={() => trackInteraction('image', 'view', slide.title)}
            />
          </motion.div>
        );
      
      case 'text':
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: slide.content }}
            onClick={() => trackInteraction('text', 'read', slide.title)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{moduleName}</h2>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>{Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex items-center space-x-4">
        <Progress value={progress} className="flex-1" />
        <span className="text-sm font-medium">
          {currentSlide + 1} / {content.length}
        </span>
      </div>

      {/* Content area */}
      <Card className="p-6">
        <ScrollArea className="h-[600px]">
          <AnimatePresence mode="wait">
            {content[currentSlide] && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent(content[currentSlide])}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </Card>

      {/* Navigation controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          variant="outline"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentSlide === content.length - 1}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
// ECPAT update end
