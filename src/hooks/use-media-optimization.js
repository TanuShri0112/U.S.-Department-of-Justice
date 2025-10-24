// ECPAT update start - Media Optimization Hook
import { useEffect, useRef, useState, useCallback } from 'react';
import { MediaOptimizer } from '@/lib/optimization/MediaOptimizer';

export function useMediaOptimization({
  type = 'image', // 'image' or 'video'
  src,
  containerRef,
  options = {}
}) {
  const [optimizedSrc, setOptimizedSrc] = useState(src);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef(null);
  const mediaRef = useRef(null);

  const getContainerSize = useCallback(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();
      return width;
    }
    return window.innerWidth;
  }, [containerRef]);

  const optimizeImage = useCallback(async () => {
    try {
      const containerWidth = getContainerSize();
      const devicePixelRatio = window.devicePixelRatio || 1;
      
      const { width, quality } = MediaOptimizer.getOptimalImageSize(
        containerWidth,
        devicePixelRatio
      );

      // Generate optimized image URL
      const optimizedUrl = new URL(src);
      optimizedUrl.searchParams.set('w', width);
      optimizedUrl.searchParams.set('q', quality);

      setOptimizedSrc(optimizedUrl.toString());
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [src, getContainerSize]);

  const optimizeVideo = useCallback(async () => {
    try {
      const containerWidth = getContainerSize();
      
      // Estimate bandwidth (in a real app, you'd want to use a proper bandwidth detection)
      const bandwidth = navigator.connection?.downlink * 1000 || 2500;

      const { width, height, quality } = MediaOptimizer.getOptimalVideoQuality(
        containerWidth,
        containerWidth * (9/16), // Assuming 16:9 aspect ratio
        bandwidth
      );

      // Generate optimized video URL
      const optimizedUrl = new URL(src);
      optimizedUrl.searchParams.set('w', width);
      optimizedUrl.searchParams.set('h', height);
      optimizedUrl.searchParams.set('q', quality);

      setOptimizedSrc(optimizedUrl.toString());
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [src, getContainerSize]);

  // Handle intersection observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    const handleIntersection = async (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        if (type === 'image') {
          await optimizeImage();
        } else {
          await optimizeVideo();
        }
        observerRef.current?.disconnect();
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '50px',
      threshold: 0.1
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [type, optimizeImage, optimizeVideo, containerRef]);

  // Handle video optimization configuration
  useEffect(() => {
    if (type === 'video' && mediaRef.current) {
      const videoElement = mediaRef.current;
      
      // Apply video optimization settings
      const playbackConfig = MediaOptimizer.optimizeVideoPlayback(videoElement, options);
      
      // Apply configuration to video element
      Object.entries(playbackConfig).forEach(([key, value]) => {
        if (key in videoElement) {
          videoElement[key] = value;
        }
      });

      // Handle adaptive quality
      videoElement.addEventListener('loadedmetadata', () => {
        const bandwidth = navigator.connection?.downlink * 1000 || 2500;
        const { quality } = MediaOptimizer.getOptimalVideoQuality(
          videoElement.videoWidth,
          videoElement.videoHeight,
          bandwidth
        );
        
        // Update video quality if needed
        if (quality !== videoElement.dataset.quality) {
          videoElement.dataset.quality = quality;
          optimizeVideo();
        }
      });
    }
  }, [type, options, optimizeVideo]);

  // Handle responsive images
  useEffect(() => {
    if (type === 'image' && mediaRef.current) {
      const imageElement = mediaRef.current;
      
      // Generate srcset for responsive images
      const srcset = MediaOptimizer.generateSrcSet(src);
      imageElement.srcset = srcset;
      
      // Apply image loading optimizations
      MediaOptimizer.optimizeImageLoading(imageElement);
    }
  }, [type, src]);

  // Handle cleanup
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return {
    optimizedSrc,
    loading,
    error,
    mediaRef
  };
}
// ECPAT update end
