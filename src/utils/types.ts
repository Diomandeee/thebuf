/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number
  height: string
  width: string
  publicId: string
  format: string
  blurDataUrl?: string
  category?: string
  cluster_label?: any
  context?: any
}

export interface SharedModalProps {
  index: number
  images?: ImageProps[]
  currentPhoto?: ImageProps
  changePhotoId: (newVal: number) => void
  closeModal: () => void
  navigation: boolean
  direction?: number
}
