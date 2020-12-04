import React, { Component } from 'react'

import { getFirstTwoLettersInUpperCase } from '../../utils/NameUtils'

import { Image, UserName } from './styledComponents'
import { sizes, variants, types } from './constants'

export interface AvatarProps {
   size: string
   variant: string
   url?: string
   type: string
   name: string
   alt?: string
}

class Avatar extends Component<AvatarProps> {
   static defaultProps = {
      url: '',
      alt: ''
   }

   static sizes: any = sizes
   static variants: any = variants
   static types: any = types

   renderImageOrNameInAvatar = (): React.ReactNode => {
      const { url, size, name, variant, type, alt } = this.props
      if (url) {
         return (
            <Image
               src={url}
               alt={alt}
               size={size}
               variant={variant}
               data-testid='image-logo'
            />
         )
      }
      return (
         <UserName size={size} variant={variant} type={type}>
            {name && getFirstTwoLettersInUpperCase(name)}
         </UserName>
      )
   }

   render(): React.ReactNode {
      return <>{this.renderImageOrNameInAvatar()}</>
   }
}

export default Avatar
