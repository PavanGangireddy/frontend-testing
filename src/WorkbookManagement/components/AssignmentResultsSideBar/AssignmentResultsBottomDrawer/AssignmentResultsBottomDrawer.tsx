import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { computed } from 'mobx'
import { withTranslation } from 'react-i18next'

import BottomDrawerWithHeader from '../../../../Common/components/BottomDrawerWithHeader'

import CloseIcon from '../../../../Common/icons/CloseIcon'
import TickIcon from '../../../../Common/icons/TickIcon'
import colors from '../../../../Common/themes/Colors'

import {
   ResultTitle,
   Section,
   NumberLabel,
   TextLabel,
   IconContainer,
   SecuredScoreText,
   TotalScoreText,
   FlexWrapper,
   CircularChart,
   CircularBackground,
   SemiCircle,
   ResultTextContainer,
   ScoreText,
   MobileSingleChart
} from '../styledComponents'

// FIXME: Need to fix i18next
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: any
}

interface AssignmentResultsBottomDrawerProps extends WithTranslationProps {
   isVisible: boolean
   closeDrawer: () => void

   totalScore: number
   securedScore: number
   correctAnswersCount: number
   wrongAnswersCount: number
}

@observer
class AssignmentResultsBottomDrawer extends Component<
   AssignmentResultsBottomDrawerProps
> {
   @computed
   get resultPercentage(): number {
      const { securedScore, totalScore } = this.props
      if (securedScore >= 0) {
         const percentage = (securedScore / totalScore) * 100
         return percentage / 2
      }
      return 0
   }

   renderHeader = () => {
      const { t } = this.props
      return (
         <ResultTitle>
            {t('workbookManagement:assignmentWorkbook.evaluation')}
         </ResultTitle>
      )
   }

   renderChildren = () => {
      const {
         securedScore,
         totalScore,
         correctAnswersCount,
         wrongAnswersCount,
         t
      } = this.props
      return (
         <>
            <ScoreText>
               {t('workbookManagement:assignmentWorkbook.score')}
            </ScoreText>

            <FlexWrapper>
               <MobileSingleChart>
                  <CircularChart viewBox='0 0 36 36'>
                     <CircularBackground d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831' />
                     <SemiCircle
                        strokeDasharray={`${this.resultPercentage}, 100`}
                        d='M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831'
                     />
                  </CircularChart>
                  <ResultTextContainer>
                     <SecuredScoreText>{securedScore}</SecuredScoreText>
                     <TotalScoreText> / {totalScore}</TotalScoreText>
                  </ResultTextContainer>
               </MobileSingleChart>
            </FlexWrapper>
            <Section>
               <IconContainer>
                  <TickIcon width={16} height={16} fill={colors.greenishTeal} />
               </IconContainer>
               <NumberLabel>{correctAnswersCount}</NumberLabel>
               <TextLabel>
                  {t('workbookManagement:assignmentWorkbook.correctAnswers')}
               </TextLabel>
            </Section>
            <Section>
               <IconContainer>
                  <CloseIcon width={16} height={16} fill={colors.neonRed} />
               </IconContainer>
               <NumberLabel>{wrongAnswersCount}</NumberLabel>
               <TextLabel>
                  {t('workbookManagement:assignmentWorkbook.wrongAnswers')}
               </TextLabel>
            </Section>
         </>
      )
   }

   render() {
      const { isVisible, closeDrawer } = this.props
      return (
         <BottomDrawerWithHeader
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeader()}
         >
            {this.renderChildren()}
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(AssignmentResultsBottomDrawer)
