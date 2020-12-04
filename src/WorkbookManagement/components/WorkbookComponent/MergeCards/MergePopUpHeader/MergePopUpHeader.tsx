import React, { Component, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import CloseIcon from '../../../../../Common/icons/CloseIcon'
import colors from '../../../../../Common/themes/Colors'
import { isMobileDevice } from '../../../../../Common/utils/responsiveUtils'

import {
   Container,
   TitleText,
   TitleWithCloseIcon,
   CloseButton
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface MergePopUpHeaderProps extends WithTranslation {
   onClickCloseButton: () => void
   renderCard: ReactNode
}

@observer
class MergePopUpHeader extends Component<MergePopUpHeaderProps> {
   renderCloseButton = (): ReactNode => {
      const { onClickCloseButton } = this.props
      return !isMobileDevice ? (
         <CloseButton
            onClick={onClickCloseButton}
            data-testid='mergeCardsPopUpHeaderCloseButton'
         >
            <CloseIcon fill={colors.darkBlueGrey} width={12} height={12} />
         </CloseButton>
      ) : null
   }

   render(): ReactNode {
      const { renderCard, t } = this.props
      return (
         <Container>
            <TitleWithCloseIcon>
               <TitleText>
                  {t('workbookManagement:mergeCards.mergePopUpTitle')}
               </TitleText>
               {this.renderCloseButton()}
            </TitleWithCloseIcon>
            {renderCard}
         </Container>
      )
   }
}

export default withTranslation()(MergePopUpHeader)
