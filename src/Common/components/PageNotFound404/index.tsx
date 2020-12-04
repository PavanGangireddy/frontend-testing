import React, { ReactNode } from 'react'

// eslint-disable-next-line import/named
import { withTranslation, WithTranslation } from 'react-i18next'

import { HOME_SCREEN_PATH } from '../../constants/NavigationConstants'
import IbHubsVerticalLogoWithTitle from '../../icons/IbHubsVerticalLogoWithTitle'
import { isMobileDevice } from '../../utils/responsiveUtils'

import {
   Container,
   ImageSection,
   HomeButton,
   LogoContainer,
   Wrapper
} from './styledComponents'

class PageNotFound extends React.Component<WithTranslation> {
   renderLogo = (): ReactNode =>
      isMobileDevice ? (
         <LogoContainer>
            <IbHubsVerticalLogoWithTitle />
         </LogoContainer>
      ) : null
   render(): ReactNode {
      const { t } = this.props
      return (
         <Wrapper>
            {this.renderLogo()}
            <Container>
               <ImageSection
                  src='https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/error.svg'
                  alt={t('common:pageNotFound.imageAlt')}
               />
               <HomeButton
                  as='a'
                  href={HOME_SCREEN_PATH}
                  data-testid={'homeButton'}
               >
                  {t('common:pageNotFound.goHome')}
               </HomeButton>
            </Container>
         </Wrapper>
      )
   }
}

export default withTranslation()(PageNotFound)
