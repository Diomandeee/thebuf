import React, { useState } from 'react'
import Page from '@shared/Page'
import { useRouter } from 'next/router'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once

export default function PageHome() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [viewerIsOpen, setViewerIsOpen] = useState(false)

  const images = [
    {
      src: 'https://live.staticflickr.com/65535/53320991215_519fffabf2_b.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53319656962_4bf2319887_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320991135_58e39e9cd2_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320763613_b063d6de96_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },

    {
      src: 'https://live.staticflickr.com/65535/53320877379_534dc48df2_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320524216_3fc4085bff_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320877394_38f3526590_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320763453_afbe6034fd_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320877259_aaae43776a_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320524106_78cfa5f4ee_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320763338_c7f4793537_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320763343_57edfe2179_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320524481_6c560bb969_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53320763588_cd9dd3df96_z.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53321837853_539877d532_h.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53321957034_b644ef51fa_h.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53321605906_03a6cdd25b_h.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    },
    {
      src: 'https://live.staticflickr.com/65535/53322080375_38590d3f18_h.jpg',
      width: 320,
      height: 174,
      caption: 'After Rain (Jeshu John - designerspics.com)'
    }
  ]

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index)
    setViewerIsOpen(true)
  }

  const closeLightbox = () => {
    setCurrentImage(0)
    setViewerIsOpen(false)
  }

  return (
    <Page uri={router.route}>
      <Gallery photos={images} onClick={openLightbox} />
      {viewerIsOpen && (
        <Lightbox
          mainSrc={images[currentImage].src}
          nextSrc={images[(currentImage + 1) % images.length].src}
          prevSrc={
            images[(currentImage + images.length - 1) % images.length].src
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setCurrentImage((currentImage + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setCurrentImage((currentImage + 1) % images.length)
          }
        />
      )}
    </Page>
  )
}
