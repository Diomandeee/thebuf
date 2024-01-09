import React, { useState, useEffect } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
// Define your media array here
const MEDIA_LIST = [
  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1704125231/473fb09a-67e1-4cf3-af45-7313ce71d83f_looped_su3bqy.mp4',
    type: 'video',
    title: 'Ethereal Sky Garden',
    link: 'https://civitai.com/models/246060/ethereal-sky-garden'
  },
  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1704727160/ss/image_1.mp4',
    type: 'video',
    title: 'Floating Sky Island',
    link: 'https://civitai.com/models/245718/floating-sky-island'
  },
  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1702344094/ss/image_7.mp4',
    type: 'video',
    title: 'Forest Glade',
    link: 'https://civitai.com/models/247621/forest-glade'
  },
  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1704727007/ss/image_3.mp4',
    type: 'video',
    title: 'Moonlit Beach',
    link: 'https://civitai.com/models/247323/moonlit-beach'
  },
  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1702344094/ss/image_4.mp4',
    type: 'video',
    title: 'Mystical Sanctuary',
    link: 'https://civitai.com/models/247539/mystical-sanctuary.'
  },

  {
    src: 'https://res.cloudinary.com/meaning-full-power/video/upload/v1702344094/ss/image_6.mp4',
    type: 'video',
    title: 'Tranquil Lakeside Retreat',
    link: 'https://civitai.com/models/249124/tranquil-lakeside-retreat'
  }
]

export default function PageHome() {
  const fullScreenHandle = useFullScreenHandle()
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [viewMode, setViewMode] = useState('grid')

  const generateMediaUrls = () => {
    return MEDIA_LIST.map((media) => ({
      src: media.src,
      type: media.type
    }))
  }

  const media = generateMediaUrls()

  useEffect(() => {
    let interval
    if (viewMode === 'grid') {
      interval = setInterval(() => {
        setCurrentMediaIndex(
          (currentIndex) => (currentIndex + 1) % media.length
        )
      }, 30000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [viewMode, media.length])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setViewMode('grid')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToPreviousMedia = () => {
    setCurrentMediaIndex((currentMediaIndex - 1 + media.length) % media.length)
  }

  const goToNextMedia = () => {
    setCurrentMediaIndex((currentMediaIndex + 1) % media.length)
  }
  const renderGalleryView = () => (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around'
        }}
      >
        {media.map((item, index) => (
          <div
            key={index}
            style={{
              width: '400px',
              margin: '10px',
              marginBottom: '40px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
              transition: '0.3s',
              borderRadius: '5px',
              overflow: 'hidden'
            }}
          >
            <video width="100%" height="auto" controls>
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div style={{ padding: '10px', textAlign: 'center' }}>
              {' '}
              {/* Add textAlign: 'center' here */}
              <h4>{MEDIA_LIST[index].title}</h4>
              <a
                href={MEDIA_LIST[index].link}
                style={{ color: '#8b98a9', textDecoration: 'none' }}
              >
                View on Civitai
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        style={{ textAlign: 'center', marginBottom: '20px', padding: '20px' }}
      >
        <h1 style={{ fontSize: '2.5em' }}>Serenity Soother</h1>
        <p
          style={{
            fontSize: '1.2em',
            color: '#8b98a9',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}
        >
          Welcome to Serenity Soother. Dive into a world where each script and
          image is a stepping stone towards inner peace and self-realization
        </p>
      </div>
      <div style={{ textAlign: 'center' }}></div>
      {viewMode === 'slideshow' ? (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <video
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
            src={media[currentMediaIndex].src}
            autoPlay
            controls
            loop
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0 20px'
            }}
          >
            <button onClick={goToPreviousMedia}>Previous</button>
            <button onClick={goToNextMedia}>Next</button>
          </div>
        </div>
      ) : (
        renderGalleryView()
      )}
      {fullScreenHandle.active && (
        <div
          style={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px'
          }}
        >
          <button onClick={goToPreviousMedia}>Previous</button>
          <button onClick={goToNextMedia}>Next</button>
        </div>
      )}
      <div style={{ marginTop: '10px' }}></div>
    </FullScreen>
  )
}
