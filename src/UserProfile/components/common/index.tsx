import React, { Component, ReactElement, ReactNode } from 'react'

import IbHubsVerticalLogo from '../../../Common/icons/IbHubsVerticalLogo'
import Image from '../../../Common/components/Image'
import colors from '../../../Common/themes/Colors'

import {
   MobileLayoutWrapperContainer,
   LayoutHeader,
   ImageStyles
} from './styledComponents'

interface MobileLayoutWrapperProps {
   headerCSS?: React.CSSProperties
   imageURL?: string
   renderBody: () => ReactElement
   renderFooter?: ReactNode
}

class MobileLayoutWrapper extends Component<MobileLayoutWrapperProps> {
   static defaultProps = {
      headerCSS: '',
      imageURL: '',
      renderFooter: null
   }

   render() {
      const {
         headerCSS,
         imageURL,
         renderBody: RenderBody,
         renderFooter
      } = this.props
      return (
         <MobileLayoutWrapperContainer css={headerCSS}>
            <LayoutHeader css={headerCSS}>
               <IbHubsVerticalLogo
                  textFillColor={colors.darkBlueGrey}
                  width={60}
                  height={60}
               />
            </LayoutHeader>
            {imageURL && (
               <Image
                  src={imageURL}
                  alt='authModuleImage'
                  imageCSS={ImageStyles}
               />
            )}
            <RenderBody />
            {renderFooter}
         </MobileLayoutWrapperContainer>
      )
   }
}

export default MobileLayoutWrapper
