import React, { Component, ReactElement, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import Image from '../../../Common/components/Image'

import {
   Container,
   ImageContainer,
   MessageContainer,
   MessageDescription,
   MessageHeader
} from './styledComponents'

class EmptyStarredFolderAndFiles extends Component<WithTranslation> {
   renderMobileImage = (): ReactNode =>
      isMobileDevice ? (
         <ImageContainer>
            <Image
               alt='Empty Starred Folders and Files Image'
               src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bb43439b-8ab2-4d23-b257-ac2dbb608573.png'
            />
         </ImageContainer>
      ) : null

   renderTabletAndDesktopImage = (): ReactNode =>
      !isMobileDevice ? (
         <ImageContainer>
            <Image
               alt='Empty Starred Folders and Files Image'
               src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/bb43439b-8ab2-4d23-b257-ac2dbb608573.png'
            />
         </ImageContainer>
      ) : null

   render(): ReactElement {
      const { t } = this.props
      return (
         <Container>
            {this.renderMobileImage()}
            <MessageContainer>
               <MessageHeader>
                  {t(
                     'folderManagement:home.emptyStarredFoldersAndFilesMessageHeader'
                  )}
               </MessageHeader>
               <MessageDescription>
                  {t(
                     'folderManagement:home.emptyStarredFoldersAndFilesMessageDescription'
                  )}
               </MessageDescription>
            </MessageContainer>
            {this.renderTabletAndDesktopImage()}
         </Container>
      )
   }
}

export default withTranslation()(EmptyStarredFolderAndFiles)
