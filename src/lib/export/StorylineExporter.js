// ECPAT update start - Storyline Export Utility
export class StorylineExporter {
  constructor(courseData) {
    this.courseData = courseData;
  }

  generateStorylineJSON() {
    return {
      version: '3.0',
      course: {
        id: this.courseData.id,
        title: this.courseData.title,
        description: this.courseData.description,
        duration: this.courseData.duration,
        slides: this.generateSlides(),
        resources: this.generateResources(),
        variables: this.generateVariables(),
        triggers: this.generateTriggers()
      }
    };
  }

  generateSlides() {
    return this.courseData.content.map((item, index) => {
      return {
        id: `slide_${index + 1}`,
        title: item.title || `Slide ${index + 1}`,
        layout: this.determineLayout(item),
        content: this.formatContent(item),
        timing: {
          autoAdvance: item.autoAdvance || false,
          duration: item.duration || null
        },
        transition: {
          type: 'fade',
          duration: 0.5
        }
      };
    });
  }

  determineLayout(content) {
    if (content.type === 'video') {
      return 'video';
    } else if (content.type === 'image') {
      return 'image_with_text';
    } else if (content.type === 'text') {
      return 'text_only';
    } else {
      return 'blank';
    }
  }

  formatContent(item) {
    switch (item.type) {
      case 'video':
        return {
          type: 'video',
          source: item.url,
          poster: item.thumbnail,
          controls: true,
          autoplay: false,
          textContent: item.caption || ''
        };
      
      case 'image':
        return {
          type: 'image',
          source: item.url,
          alt: item.alt || '',
          textContent: item.caption || '',
          position: item.position || 'center'
        };
      
      case 'text':
        return {
          type: 'text',
          content: item.content,
          formatting: item.formatting || {
            font: 'Arial',
            size: '16px',
            color: '#333333'
          }
        };
      
      default:
        return null;
    }
  }

  generateResources() {
    const resources = [];
    
    // Add media resources
    this.courseData.content.forEach(item => {
      if (item.type === 'video' || item.type === 'image') {
        resources.push({
          id: `resource_${item.id}`,
          type: item.type,
          url: item.url,
          filename: this.getFilenameFromUrl(item.url),
          size: item.size || null,
          mimeType: item.mimeType || this.guessMimeType(item.url)
        });
      }
    });

    // Add additional resources (documents, etc.)
    if (this.courseData.resources) {
      this.courseData.resources.forEach(resource => {
        resources.push({
          id: `resource_${resource.id}`,
          type: resource.type,
          url: resource.url,
          filename: this.getFilenameFromUrl(resource.url),
          size: resource.size || null,
          mimeType: resource.mimeType || this.guessMimeType(resource.url)
        });
      });
    }

    return resources;
  }

  generateVariables() {
    return {
      progress: {
        type: 'number',
        initialValue: 0,
        min: 0,
        max: 100
      },
      slideViewed: {
        type: 'boolean',
        initialValue: false
      },
      timeSpent: {
        type: 'number',
        initialValue: 0
      }
    };
  }

  generateTriggers() {
    return {
      slideComplete: {
        event: 'timeline_complete',
        actions: [
          {
            type: 'set_variable',
            variable: 'slideViewed',
            value: true
          },
          {
            type: 'calculate_progress'
          }
        ]
      },
      trackTime: {
        event: 'every_minute',
        actions: [
          {
            type: 'increment_variable',
            variable: 'timeSpent',
            value: 60
          }
        ]
      }
    };
  }

  getFilenameFromUrl(url) {
    try {
      return url.split('/').pop() || '';
    } catch {
      return '';
    }
  }

  guessMimeType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    return mimeTypes[ext] || 'application/octet-stream';
  }

  async export() {
    const storylineProject = this.generateStorylineJSON();
    
    // Convert to Blob
    const blob = new Blob(
      [JSON.stringify(storylineProject, null, 2)],
      { type: 'application/json' }
    );
    
    return blob;
  }
}
// ECPAT update end
