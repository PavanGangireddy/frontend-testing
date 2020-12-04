import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import CloseIcon from '../../../../Common/icons/CloseIcon'
import Button from '../../../../Common/components/Button'
import colors from '../../../../Common/themes/Colors'

import {
   MergeHeaderContainer,
   SelectedCardsCount,
   LeftSection,
   CloseButton,
   MergeCardInstruction,
   TextContainer,
   MergeButton
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface MergeHeaderProps extends WithTranslation {
   onClickMergeButton: () => void
   onClickCloseButton: () => void
   selectedCardsCount: number
}

@observer
class MergeHeader extends Component<MergeHeaderProps> {
   render(): ReactNode {
      const {
         selectedCardsCount,
         onClickCloseButton,
         onClickMergeButton,
         t
      } = this.props
      return (
         <MergeHeaderContainer>
            <LeftSection>
               <CloseButton
                  onClick={onClickCloseButton}
                  data-testid='mergeCardsCloseHeaderButton'
               >
                  <CloseIcon
                     width={12}
                     height={12}
                     fill={colors.darkBlueGrey}
                  />
               </CloseButton>
               <TextContainer>
                  <SelectedCardsCount data-testid='selectedCardsCount'>
                     {`${selectedCardsCount} ${t(
                        'workbookManagement:mergeCards.selected'
                     )}`}
                  </SelectedCardsCount>
                  <MergeCardInstruction>
                     {t('workbookManagement:mergeCards.mergeHelpText')}
                  </MergeCardInstruction>
               </TextContainer>
            </LeftSection>
            <MergeButton
               onClick={onClickMergeButton}
               variant={Button.variants.primary}
               id='mergeCardsButton'
               disabled={selectedCardsCount < 2}
            >
               {t('workbookManagement:mergeCards.mergeCards')}
            </MergeButton>
         </MergeHeaderContainer>
      )
   }
}

export default withTranslation()(MergeHeader)
