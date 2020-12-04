import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import IbHubsVerticalLogoWithTitle from '../../../Common/icons/IbHubsVerticalLogoWithTitle'
import SuccessIcon from '../../../Common/icons/SuccessIcon'
import TopQuoteIcon from '../../../Common/icons/TopQuoteIcon'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import {
   LogoContainer,
   QuoteContainer,
   TopQuotesIconContainer,
   QuoteText,
   QuoteLine,
   BottomQuotesIconContainer,
   CardContainer,
   HeadingLabel
} from '../common/styledComponents'
import MobileLayoutWrapper from '../common'

import {
   VerifyEmailContainer,
   RightSection,
   LeftSection,
   MainContainer,
   SuccessIconWrapper,
   SuccessMessage,
   LoginButton,
   QuoteSection,
   LoginButtonText,
   ImageContainer,
   ImageWrapper,
   MobileLayoutHeaderCSS
} from './styledComponents'

//FIXME: need to fix this issue in i18next
interface WithTranslationProps {
   i18n: any
   tReady: boolean
   t: any
}

interface VerifyEmailSuccessFormProps extends WithTranslationProps {
   goToLoginPage: (history: History) => void
}

class VerifyEmailSuccessForm extends Component<VerifyEmailSuccessFormProps> {
   renderMailSuccessData = observer(
      (): ReactElement => {
         const { t, goToLoginPage } = this.props
         return (
            <MainContainer>
               <CardContainer>
                  <SuccessIconWrapper>
                     <SuccessIcon width={60} height={60} />
                  </SuccessIconWrapper>
                  <HeadingLabel>
                     {t('userProfile:verifyEmailForm.congratulations')}
                  </HeadingLabel>
                  <SuccessMessage>
                     {t('userProfile:verifyEmailForm.verifySuccessMessage')}
                  </SuccessMessage>
                  <LoginButton
                     onClick={goToLoginPage}
                     data-testid={'redirectToLoginButton'}
                  >
                     <LoginButtonText>
                        {t('userProfile:verifyEmailForm.loginPage')}
                     </LoginButtonText>
                  </LoginButton>
               </CardContainer>
            </MainContainer>
         )
      }
   )

   render(): React.ReactNode {
      const { renderMailSuccessData: RenderMailSuccessData } = this
      const { t } = this.props
      return (
         <>
            {isMobileDevice ? (
               <MobileLayoutWrapper
                  renderBody={RenderMailSuccessData}
                  headerCSS={MobileLayoutHeaderCSS}
               />
            ) : (
               <VerifyEmailContainer>
                  <LeftSection>
                     <LogoContainer>
                        <IbHubsVerticalLogoWithTitle />
                     </LogoContainer>
                     <RenderMailSuccessData />
                  </LeftSection>
                  <RightSection>
                     <QuoteSection>
                        <QuoteContainer>
                           <QuoteLine>
                              <TopQuotesIconContainer>
                                 <TopQuoteIcon />
                              </TopQuotesIconContainer>
                              <QuoteText>
                                 {t('userProfile:quoteLineOne')}
                              </QuoteText>
                           </QuoteLine>
                           <QuoteLine>
                              <QuoteText>
                                 {t('userProfile:quoteLineTwo')}
                              </QuoteText>
                              <BottomQuotesIconContainer>
                                 <TopQuoteIcon />
                              </BottomQuotesIconContainer>
                           </QuoteLine>
                        </QuoteContainer>
                     </QuoteSection>
                     <ImageWrapper>
                        <ImageContainer
                           //FIXME: need to get link from S3 bucket and add it to common/images folder
                           src={
                              'https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/a18c9940-5cf7-432d-8050-e9ce92d74fb1.svg'
                           }
                           alt={t(
                              'userProfile:linkExpiredForm.productiveImage'
                           )}
                        />
                     </ImageWrapper>
                  </RightSection>
               </VerifyEmailContainer>
            )}
         </>
      )
   }
}

export default withTranslation()(VerifyEmailSuccessForm)
