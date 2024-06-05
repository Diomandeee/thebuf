import React, { useState, useEffect } from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { motion, AnimatePresence } from 'framer-motion'
export default function PageHome() {
  const fullScreenHandle = useFullScreenHandle()

  const generateImageUrls = (count) => {
    const baseBackUrl =
      'https://res.cloudinary.com/meaning-full-power/image/upload/v1700176272/Lifeislong/card_backs/card_back_'
    const baseFrontUrl =
      'https://res.cloudinary.com/meaning-full-power/image/upload/v1700496325/Lifeislong/card_fronts/card_front_'
    const imagesArray = []
    for (let i = 1; i <= count; i++) {
      imagesArray.push({
        backSrc: `${baseBackUrl}${i}.png`,
        frontSrc: `${baseFrontUrl}${i}.png`,
        width: 12,
        height: 9
      })
    }
    return imagesArray
  }
  const images = generateImageUrls(39)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [hoveredImage, setHoveredImage] = useState(null)
  const imageContainerWidth = 'calc(33.33% - 10px)' // Adjusts for 5px margin on each side

  const handleMouseEnter = (index) => {
    setHoveredImage(index)
  }

  const handleMouseLeave = () => {
    setHoveredImage(null)
  }

  const closeLightbox = () => {
    setViewerIsOpen(false)
  }

  useEffect(() => {
    let interval
    if (viewMode === 'grid') {
      interval = setInterval(() => {
        setCurrentImageIndex(
          (currentIndex) => (currentIndex + 1) % images.length
        )
      }, 15000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [viewMode, images.length])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1080) {
        setViewMode('grid')
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (currentImageIndex - 1 + images.length) % images.length
    )
  }

  const goToNextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length)
  }

  const renderSlideshowView = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex].src}
          alt={`Image ${currentImageIndex}`}
          onClick={() => setViewMode('grid')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            width: '1080px',
            height: '1000px',
            objectFit: 'cover',
            backgroundColor: 'transparent' // Ensure the image has no dark background
          }}
        />
      </AnimatePresence>
    </div>
  )

  // Assuming that Gallery's photos prop accepts an array of objects with at least the src property.
  // Define your custom photo type with additional properties
  interface CustomPhoto {
    src: string // Standard image source (used by Gallery)
    frontSrc: string // Your custom property for the front image
    backSrc: string // Your custom property for the back image
    width: number // Standard width property (used by Gallery)
    height: number // Standard height property (used by Gallery)
    // Add any other properties required by your Gallery component
  }
  const renderGalleryView = () => (
    <>
      <Gallery
        photos={images.map((image) => ({
          ...image,
          src: image.backSrc // Ensure that src is a string as expected by Gallery.
        }))}
        renderImage={({ index, photo }) => {
          // Use the CustomPhoto interface for the photo prop.
          const customPhoto = photo as CustomPhoto

          return (
            <div
              style={{
                transform: hoveredImage === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                margin: '5px',
                display: 'inline-block',
                boxSizing: 'border-box',
                width: imageContainerWidth
              }}
            >
              <img
                src={
                  hoveredImage === index
                    ? customPhoto.frontSrc
                    : customPhoto.src
                }
                alt={`Image ${index}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              />
            </div>
          )
        }}
      />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={images[currentImageIndex].frontSrc}
          nextSrc={images[(currentImageIndex + 1) % images.length].frontSrc}
          prevSrc={
            images[(currentImageIndex - 1 + images.length) % images.length]
              .frontSrc
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPreviousImage}
          onMoveNextRequest={goToNextImage}
        />
      )}
    </>
  )

  return (
    <FullScreen handle={fullScreenHandle}>
      <div
        style={{ textAlign: 'center', marginBottom: '20px', padding: '20px' }}
      >
        <h1 style={{ fontSize: '2.5em' }}>Life is Long</h1>
        <p
          style={{
            fontSize: '1.2em',
            color: '#8b98a9',
            maxWidth: '600px', // Sets the maximum width of the paragraph
            margin: '0 auto', // Centers the paragraph
            lineHeight: '1.6' // Adjusts the line height for better readability
          }}
        >
          Life is long is a multiplayer collectible digital trading card game
          where players build their unique decks of emotional intelligence. This
          includes daily mantras, daily challenges, and meaningful questions
          collectible cards.
        </p>
      </div>
      {/* Slideshow or Gallery View */}
      {viewMode === 'slideshow' ? renderSlideshowView() : renderGalleryView()}
      {/* Navigation Buttons */}
      {fullScreenHandle.active && (
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
          <button onClick={goToPreviousImage}>Previous</button>
          <button onClick={goToNextImage}>Next</button>
        </div>
      )}
      <div style={{ marginTop: '10px' }}></div>
    </FullScreen>
  )
}
