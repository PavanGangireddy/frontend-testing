import React, { Component, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { computed, observable } from 'mobx'
import { withTranslation } from 'react-i18next'

import CloseIcon from '../../../Common/icons/CloseIcon'
import TickIcon from '../../../Common/icons/TickIcon'
import colors from '../../../Common/themes/Colors'

import {
   AssignmentResultContainer,
   ResultHeader,
   ResultTitle,
   ResultCloseButton,
   ScoreLabelContainer,
   ScoreText,
   Section,
   NumberLabel,
   TextLabel,
   IconContainer,
   SecuredScoreText,
   TotalScoreText,
   FlexWrapper,
   SingleChart,
   CircularChart,
   CircularBackground,
   SemiCircle,
   ResultTextContainer
} from './styledComponents'

// FIXME: Need to fix i18next
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: any
}

interface AssignmentResultsSideBarProps extends WithTranslationProps {
   totalScore: number
   securedScore: number
   correctAnswersCount: number
   wrongAnswersCount: number
   onClickCloseSideBarButton: () => void
}

@observer
class AssignmentResultsSideBar extends Component<
   AssignmentResultsSideBarProps
> {
   workbookPageHeader
   @observable workbookPageHeaderHeight
   componentDidMount() {
      this.workbookPageHeader = document.getElementById('workbookPageHeader')
      this.workbookPageHeaderHeight = this.workbookPageHeader?.clientHeight
   }

   @computed
   get resultPercentage(): number {
      const { securedScore, totalScore } = this.props
      if (securedScore >= 0) {
         const percentage = (securedScore / totalScore) * 100
         return percentage / 2
      }
      return 0
   }

   render(): ReactElement {
      const {
         securedScore,
         totalScore,
         correctAnswersCount,
         wrongAnswersCount,
         onClickCloseSideBarButton,
         t
      } = this.props
      return (
         <AssignmentResultContainer
            workbookPageHeaderHeight={this.workbookPageHeaderHeight}
         >
            <ResultHeader>
               <ResultTitle>
                  {t('workbookManagement:assignmentWorkbook.evaluation')}
               </ResultTitle>
               <ResultCloseButton
                  onClick={onClickCloseSideBarButton}
                  data-testid='resultsSideBarCloseButton'
               >
                  <CloseIcon width={19} heigh={20} fill={colors.darkBlueGrey} />
               </ResultCloseButton>
            </ResultHeader>
            <ScoreLabelContainer>
               <ScoreText>
                  {t('workbookManagement:assignmentWorkbook.score')}
               </ScoreText>
            </ScoreLabelContainer>
            <FlexWrapper>
               <SingleChart>
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
               </SingleChart>
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
         </AssignmentResultContainer>
      )
   }
}

export default withTranslation()(AssignmentResultsSideBar)
