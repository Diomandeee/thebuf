import React, { useState, useEffect } from 'react'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageHome() {
  const fullScreenHandle = useFullScreenHandle()
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null)

  const handleMouseEnter = (index) => {
    setHoveredImageIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredImageIndex(null)
  }

  const generateImageUrls = (count) => {
    const baseUrl =
      'https://res.cloudinary.com/meaning-full-power/image/upload/v1700176272/Lifeislong/text_'
    const imagesArray = []
    for (let i = 1; i < count; i++) {
      imagesArray.push({
        src: `${baseUrl}${i}.png`,
        width: 4,
        height: 3
      })
    }
    return imagesArray
  }

  const images = generateImageUrls(40)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')

  const openLightbox = (event, { index }) => {
    setCurrentImageIndex(index)
    setViewerIsOpen(true)
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
      }, 30000)
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

  const imageContainerWidth = 'calc(33.33% - 10px)' // Adjusts for 5px margin on each side

  const renderGalleryView = () => (
    <>
      <Gallery
        photos={images}
        renderImage={({ index, photo }) => {
          // If srcSet or sizes is not a string, it's converted to a valid string.
          const validPhotoProps = {
            ...photo,
            srcSet: Array.isArray(photo.srcSet)
              ? photo.srcSet.join(', ')
              : photo.srcSet,
            sizes: Array.isArray(photo.sizes)
              ? photo.sizes.join(', ')
              : photo.sizes // This line ensures sizes is a string
          }

          return (
            <div
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform:
                  hoveredImageIndex === index ? 'scale(1.1)' : 'scale(1)',
                transition: 'transform 0.3s ease',
                margin: '5px',
                display: 'inline-block',
                boxSizing: 'border-box',
                width: imageContainerWidth
              }}
            >
              <img
                {...validPhotoProps}
                onClick={() => openLightbox(null, { index })}
                alt={`Image ${index}`}
              />
            </div>
          )
        }}
      />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={images[currentImageIndex].src}
          nextSrc={images[(currentImageIndex + 1) % images.length].src}
          prevSrc={
            images[(currentImageIndex - 1 + images.length) % images.length].src
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
        <h1 style={{ fontSize: '2.5em' }}>Meaning Full Collection</h1>
        <p
          style={{
            fontSize: '1.2em',
            color: '#8b98a9',
            maxWidth: '600px', // Sets the maximum width of the paragraph
            margin: '0 auto', // Centers the paragraph
            lineHeight: '1.6' // Adjusts the line height for better readability
          }}
        >
          Meaning Full Collection works as an ultimate motivational boost to
          keep you working by lifting your spirits and spiking up your
          confidence. This collection of Poems, Questions and Essay is all about
          realizing your worth and helping to revive faith in yourself. It is an
          resource for ramping up your capacity to face challenges and
          tribulations with the utmost faith and confidence. .
        </p>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}></div>
      {viewMode === 'slideshow' ? renderSlideshowView() : renderGalleryView()}
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