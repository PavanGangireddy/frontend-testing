import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observer, inject } from 'mobx-react'

import Colors from '../../themes/Colors'
import ChromeIcon from '../../icons/ChromeIcon'
import CloseIcon from '../../icons/CloseIcon'
import { setCookie } from '../../utils/StorageUtils'
import ChromeBannerUIStore from '../../stores/ChromeBannerUIStore'

import { isMobileDevice } from '../../utils/responsiveUtils'
import {
   VIEW_IN_CHROME_BANNER_COOKIE_NAME,
   VIEW_IN_CHROME_BANNER_COOKIE_VALUE
} from '../../constants/UIConstants'

import IconContainer from '../IconContainer'

import {
   BannerContainer,
   BannerText,
   BannerLeftSection,
   BannerRightSection,
   closeIconContainer
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface InjectedProps extends WithTranslationProps {
   chromeBannerUIStore: ChromeBannerUIStore
}

@inject('chromeBannerUIStore')
@observer
class ChromeBanner extends Component<WithTranslationProps> {
   getInjectedProps = (): InjectedProps => this.props as InjectedProps

   getChromeBannerUIStore = () => this.getInjectedProps().chromeBannerUIStore

   closeChromeBanner = () => {
      const { closeChromeBanner } = this.getChromeBannerUIStore()
      setCookie(
         VIEW_IN_CHROME_BANNER_COOKIE_NAME,
         VIEW_IN_CHROME_BANNER_COOKIE_VALUE
      )
      closeChromeBanner()
   }

   getSizeOfIcon = (): number => {
      if (isMobileDevice) {
         return 24
      }
      return 48
   }

   renderBannerBasedOnUserConsent = (): ReactNode => {
      const { t } = this.props
      const {
         shouldDisplayViewInChromeMessageBanner
      } = this.getChromeBannerUIStore()
      if (shouldDisplayViewInChromeMessageBanner) {
         return (
            <BannerContainer>
               <BannerLeftSection>
                  <BannerText>
                     {t(
                        'common:chromeBanner.forBestExperienceViewInLatestVersionOfChrome'
                     )}
                  </BannerText>
                  <ChromeIcon
                     width={this.getSizeOfIcon()}
                     height={this.getSizeOfIcon()}
                  />
               </BannerLeftSection>

               <BannerRightSection>
                  <IconContainer
                     onClick={this.closeChromeBanner}
                     containerCSS={closeIconContainer}
                  >
                     <CloseIcon
                        width={12}
                        height={12}
                        fill={Colors.ceruleanTwo}
                     />
                  </IconContainer>
               </BannerRightSection>
            </BannerContainer>
         )
      }
      return null
   }

   render(): ReactNode {
      return this.renderBannerBasedOnUserConsent()
   }
}

export default withTranslation('translation')(ChromeBanner)
