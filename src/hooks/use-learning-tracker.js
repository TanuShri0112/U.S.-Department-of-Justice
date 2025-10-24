// ECPAT update start - Learning Progress Tracking Hook
import { useEffect, useCallback } from 'react';
import { scormWrapper } from '@/lib/scorm/ScormWrapper';
import { xapiWrapper } from '@/lib/xapi/XApiWrapper';

export function useLearningTracker({ 
  courseId, 
  moduleName, 
  xapiConfig = null 
}) {
  useEffect(() => {
    // Initialize SCORM
    scormWrapper.init();

    // Initialize xAPI if config provided
    if (xapiConfig) {
      xapiWrapper.init({
        ...xapiConfig,
        courseId
      });
      xapiWrapper.startedCourse();
    }

    return () => {
      scormWrapper.terminate();
    };
  }, [courseId, xapiConfig]);

  const trackProgress = useCallback((progress) => {
    // Update SCORM progress
    scormWrapper.setProgress(progress);

    // Update xAPI progress if available
    if (xapiConfig) {
      if (progress >= 100) {
        xapiWrapper.completedCourse(progress);
      }
    }
  }, [xapiConfig]);

  const trackInteraction = useCallback((interactionId, type, response) => {
    // Track in SCORM
    scormWrapper.setInteraction(interactionId, type, response, 'neutral', `${moduleName} interaction`);

    // Track in xAPI if available
    if (xapiConfig) {
      xapiWrapper.trackInteraction(interactionId, type, response);
    }
  }, [moduleName, xapiConfig]);

  const trackTimeSpent = useCallback((timeInSeconds) => {
    // Track in SCORM
    scormWrapper.setTimeSpent(timeInSeconds);

    // Track in xAPI if available
    if (xapiConfig) {
      xapiWrapper.trackDuration(timeInSeconds);
    }
  }, [xapiConfig]);

  return {
    trackProgress,
    trackInteraction,
    trackTimeSpent
  };
}
// ECPAT update end
