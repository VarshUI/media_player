import React, { useRef, useEffect } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

const VideoJS = ({ options, onReady }) => {
  const playerRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return

    if (!playerRef.current) {
      const videoElement = document.createElement('video-js')
      videoElement.classList.add('vjs-big-play-centered', 'video-js')
      videoRef.current.appendChild(videoElement)

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready')
        onReady && onReady(player)
      }))

      console.log('Video.js player initialized')
      
      // Handle audio debugging
      player.ready(() => {
        console.log('Player ready, muted:', player.muted())
        console.log('Volume level:', player.volume())
        
        // Force audio settings
        player.muted(false);
        player.volume(1.0);
        
        // Debug audio on play
        player.on('play', () => {
          console.log('Playing - Muted:', player.muted(), 'Volume:', player.volume());
          // Try to ensure audio is enabled
          if (player.muted()) {
            player.muted(false);
          }
          if (player.volume() === 0) {
            player.volume(1.0);
          }
        });
        
        // Monitor volume changes
        player.on('volumechange', () => {
          console.log('Volume changed - Muted:', player.muted(), 'Volume:', player.volume());
        });
      })
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [options, onReady])

  return <div ref={videoRef}></div>
}

export default VideoJS