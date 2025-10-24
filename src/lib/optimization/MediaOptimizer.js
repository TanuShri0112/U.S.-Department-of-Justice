// ECPAT update start - Media Optimization Utilities
export class MediaOptimizer {
  static getOptimalVideoQuality(width, height, bandwidth) {
    // Calculate optimal video quality based on screen size and bandwidth
    if (bandwidth < 1000) { // < 1Mbps
      return {
        width: Math.min(640, width),
        height: Math.min(360, height),
        bitrate: '800k',
        quality: 'low'
      };
    } else if (bandwidth < 2500) { // 1-2.5Mbps
      return {
        width: Math.min(854, width),
        height: Math.min(480, height),
        bitrate: '1500k',
        quality: 'medium'
      };
    } else { // > 2.5Mbps
      return {
        width: Math.min(1280, width),
        height: Math.min(720, height),
        bitrate: '2500k',
        quality: 'high'
      };
    }
  }

  static getOptimalImageSize(containerWidth, devicePixelRatio = 1) {
    // Calculate optimal image size based on container width and device pixel ratio
    const targetWidth = containerWidth * devicePixelRatio;
    
    // Common breakpoints for responsive images
    const breakpoints = [320, 480, 640, 768, 1024, 1280, 1440, 1920];
    
    // Find the smallest breakpoint that's larger than our target
    const optimalWidth = breakpoints.find(bp => bp >= targetWidth) || breakpoints[breakpoints.length - 1];
    
    return {
      width: optimalWidth,
      height: Math.round(optimalWidth * (9/16)), // Assuming 16:9 aspect ratio
      quality: 80 // Default quality setting for images
    };
  }

  static generateSrcSet(imagePath, sizes = [320, 480, 640, 768, 1024, 1280]) {
    // Generate srcset attribute for responsive images
    return sizes
      .map(size => `${imagePath}?w=${size} ${size}w`)
      .join(', ');
  }

  static getImageLoadingStrategy(index, viewportDistance) {
    // Determine image loading strategy based on position and viewport
    if (index === 0 || viewportDistance < 1000) {
      return 'eager';
    }
    return 'lazy';
  }

  static shouldPreloadVideo(videoData) {
    const {
      duration,
      position,
      bandwidth,
      userPreferences
    } = videoData;

    // Decision matrix for video preloading
    const shouldPreload = 
      duration < 300 && // Less than 5 minutes
      position === 'visible' && // Currently visible
      bandwidth > 2000 && // Good connection
      userPreferences.autoplay !== false; // User hasn't disabled autoplay

    return shouldPreload;
  }

  static getVideoPreloadStrategy(videoData) {
    if (this.shouldPreloadVideo(videoData)) {
      return {
        preload: 'auto',
        preloadSegments: 2, // Number of segments to preload
        bufferSize: '30', // Buffer size in seconds
      };
    }

    return {
      preload: 'metadata',
      preloadSegments: 0,
      bufferSize: '10',
    };
  }

  static optimizeVideoPlayback(videoElement, options = {}) {
    const defaultOptions = {
      maxBufferLength: 30,
      startLevel: -1, // Auto
      capLevelToPlayerSize: true,
      debug: false
    };

    const config = { ...defaultOptions, ...options };

    return {
      ...config,
      progressive: true, // Enable progressive download
      lowLatencyMode: false,
      enableWorker: true,
      enableSoftwareAES: true,
      manifestLoadingTimeOut: 10000,
      manifestLoadingMaxRetry: 2,
      manifestLoadingRetryDelay: 500,
      levelLoadingTimeOut: 10000,
      levelLoadingMaxRetry: 2,
      levelLoadingRetryDelay: 500
    };
  }

  static createImageIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    };

    const config = { ...defaultOptions, ...options };

    if ('IntersectionObserver' in window) {
      return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, config);
    }

    return null;
  }

  static optimizeImageLoading(imageElement) {
    // Apply best practices for image loading
    imageElement.decoding = 'async';
    imageElement.loading = 'lazy';
    
    if ('fetchpriority' in imageElement) {
      imageElement.fetchpriority = 'auto';
    }

    // Add blur-up loading effect
    imageElement.style.filter = 'blur(20px)';
    imageElement.style.transform = 'scale(1.1)';
    imageElement.style.transition = 'filter 0.3s ease-out, transform 0.3s ease-out';

    imageElement.onload = () => {
      imageElement.style.filter = 'none';
      imageElement.style.transform = 'scale(1)';
    };
  }

  static createProgressiveImage(url, containerElement) {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';

    // Create low-quality placeholder
    const placeholder = document.createElement('img');
    placeholder.src = `${url}?quality=10&w=50`; // Tiny, blurred version
    placeholder.style.position = 'absolute';
    placeholder.style.filter = 'blur(8px)';
    placeholder.style.transform = 'scale(1.1)';
    placeholder.style.width = '100%';
    placeholder.style.height = '100%';
    placeholder.style.objectFit = 'cover';

    // Create high-quality image
    const highQuality = document.createElement('img');
    highQuality.style.opacity = '0';
    highQuality.style.transition = 'opacity 0.3s ease-in';
    highQuality.style.width = '100%';
    highQuality.style.height = '100%';
    highQuality.style.objectFit = 'cover';

    // Load high-quality image
    highQuality.onload = () => {
      highQuality.style.opacity = '1';
      setTimeout(() => {
        placeholder.remove();
      }, 300);
    };

    // Set source with srcset for responsiveness
    const srcset = this.generateSrcSet(url);
    highQuality.srcset = srcset;
    highQuality.src = url;

    wrapper.appendChild(placeholder);
    wrapper.appendChild(highQuality);
    containerElement.appendChild(wrapper);

    return {
      wrapper,
      placeholder,
      highQuality
    };
  }
}

// Export singleton instance
export const mediaOptimizer = new MediaOptimizer();
// ECPAT update end
