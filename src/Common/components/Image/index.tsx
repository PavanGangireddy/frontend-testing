import * as React from 'react'
import 'styled-components/macro'

import { CLOUDINARY_CONFIGURED_PREFIX } from '../../constants/Cloudinary'

import { ReactImage } from './styledComponents'

interface ImageProps {
   src: string
   configString?: string
   alt: string
   className?: string
   loading?: string
   imageCSS?: any
   onLoad?: () => void
   imageTestId?: string
}

class Image extends React.Component<ImageProps> {
   static defaultProps = {
      configString: 'dpr_auto,w_auto,f_auto,q_auto',
      imageTestId: 'imageTestId'
   }
   render() {
      const {
         src,
         configString,
         alt,
         className,
         loading,
         imageCSS,
         onLoad,
         imageTestId
      } = this.props
      let updatedSrc = src
      const pattern = /^((http|https|www):\/\/)/

      if (pattern.test(src)) {
         updatedSrc = `${CLOUDINARY_CONFIGURED_PREFIX}/image/fetch/${configString}/${src}`
      }
      return (
         <ReactImage
            alt={alt}
            loading={loading}
            className={className}
            src={updatedSrc}
            draggable={false}
            css={imageCSS}
            onLoad={onLoad}
            data-testid={imageTestId}
         />
      )
   }
}

export default Image
