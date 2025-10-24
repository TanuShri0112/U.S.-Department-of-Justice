// ECPAT update start - SCORM Integration Layer
import SCORM from 'pipwerks-scorm-api-wrapper';

class ScormWrapper {
  constructor() {
    this.scorm = SCORM;
    this.initialized = false;
  }

  init() {
    if (!this.initialized) {
      this.initialized = this.scorm.init();
      if (this.initialized) {
        // Set initial status
        this.setValue('cmi.core.lesson_status', 'incomplete');
        this.setValue('cmi.core.score.min', '0');
        this.setValue('cmi.core.score.max', '100');
      }
    }
    return this.initialized;
  }

  setValue(key, value) {
    return this.scorm.set(key, value);
  }

  getValue(key) {
    return this.scorm.get(key);
  }

  setProgress(progress) {
    this.setValue('cmi.core.lesson_location', progress.toString());
    if (progress >= 100) {
      this.setValue('cmi.core.lesson_status', 'completed');
    }
  }

  setInteraction(id, type, learnerResponse, result, description) {
    const interactionIndex = this.getValue('cmi.interactions._count');
    const prefix = `cmi.interactions.${interactionIndex}`;
    
    this.setValue(`${prefix}.id`, id);
    this.setValue(`${prefix}.type`, type);
    this.setValue(`${prefix}.learner_response`, learnerResponse);
    this.setValue(`${prefix}.result`, result);
    this.setValue(`${prefix}.description`, description);
  }

  setTimeSpent(timeInSeconds) {
    const formattedTime = this.formatTime(timeInSeconds);
    this.setValue('cmi.core.session_time', formattedTime);
  }

  formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours}:${minutes}:${seconds}`;
  }

  terminate() {
    if (this.initialized) {
      this.scorm.quit();
      this.initialized = false;
    }
  }
}

export const scormWrapper = new ScormWrapper();
// ECPAT update end
