import React, { Component, ReactElement, ReactNode } from 'react'
import { observer } from 'mobx-react'
import { APIStatus } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'

import MobileNavBar from '../../../../Common/components/MobileNavBar'
import ArrowLeftIcon from '../../../../Common/icons/ArrowLeftIcon'
import MoreIcon from '../../../../Common/icons/MoreIcon'
import colors from '../../../../Common/themes/Colors'
import MoveToIcon from '../../../../Common/icons/MoveToIcon'
import DeleteIcon from '../../../../Common/icons/DeleteIcon'
import { WithTranslation } from '../../../../Common/types'
import { isAPIFetching } from '../../../../Common/utils/APIUtils'
import { getTextColor } from '../../../../Common/utils/ColorUtils'
import BaseModalContainer from '../../../../Common/components/BaseModalContainer'
import BottomDrawerModal from '../../../../Common/components/BottomDrawer/BottomDrawerModal'
import MobileBottomDeleteDrawerModal from '../../../../Common/components/MobileBottomCustomDrawer/MobileBottomDeleteDrawerModal'

import {
   LeftEnhancerContainer,
   RightEnhancerContainer,
   ListMenuContainer,
   ListMenuItem,
   CardTitleText,
   ListMenuText,
   MoveCardButton,
   MoveCardButtonText
} from './styledComponents'

interface MobileCardDetailsHeaderProps extends WithTranslation {
   onClickBack: () => void
   NavBarContainerCSS: any
   renderEditableTextInput: () => ReactElement
   cardTitle: string
   openMoveCardModal: () => void
   onDeleteCard: () => void
   deleteCardAPIStatus: APIStatus
   shouldDisableActions?: boolean
   onClickMoveCard: () => void
   cardLabelTextColor: string | null
}

@observer
class MobileCardDetailsHeader extends Component<MobileCardDetailsHeaderProps> {
   cardActionsDrawerRef
   cardDeleteDrawerRef

   constructor(props) {
      super(props)
      this.cardActionsDrawerRef = React.createRef<BaseModalContainer>()
      this.cardDeleteDrawerRef = React.createRef<BaseModalContainer>()
   }

   openDrawer = (): void => {
      this.cardActionsDrawerRef.current?.openModal()
   }

   closeDrawer = (): void => {
      this.cardActionsDrawerRef.current?.closeModal()
   }

   openDeleteDrawer = (): void => {
      this.closeDrawer()
      this.cardDeleteDrawerRef.current?.openModal()
   }

   closeDeleteDrawer = (): void => {
      this.cardDeleteDrawerRef.current?.closeModal()
   }

   getIconColor = () => {
      const {
         NavBarContainerCSS: { background }
      } = this.props
      return background === colors.white
         ? colors.darkBlueGrey
         : getTextColor(background)
   }

   renderLeftEnhancer = (): ReactNode => {
      const {
         props: { onClickBack },
         getIconColor
      } = this
      return (
         <LeftEnhancerContainer>
            <ArrowLeftIcon
               width={24}
               height={24}
               onClick={onClickBack}
               fill={getIconColor()}
            />
         </LeftEnhancerContainer>
      )
   }

   renderRightEnhancer = (): ReactElement => {
      const {
         openDrawer,
         getIconColor,
         props: { shouldDisableActions, onClickMoveCard, t, cardLabelTextColor }
      } = this
      return (
         <>
            {!shouldDisableActions && (
               <RightEnhancerContainer>
                  <MoveCardButton
                     onClick={onClickMoveCard}
                     cardLabelTextColor={cardLabelTextColor}
                  >
                     <MoveCardButtonText
                        cardLabelTextColor={cardLabelTextColor}
                     >
                        {t('workbookManagement:homeScreen.moveMenuItemText')}
                     </MoveCardButtonText>
                  </MoveCardButton>
                  <MoreIcon fillColor={getIconColor()} onClick={openDrawer} />
               </RightEnhancerContainer>
            )}
         </>
      )
   }

   renderDrawerHeader = (): ReactNode => {
      const { cardTitle } = this.props
      return <CardTitleText>{cardTitle}</CardTitleText>
   }

   openMoveCardModal = (): void => {
      const {
         props: { openMoveCardModal, onClickBack },
         closeDrawer
      } = this
      closeDrawer()
      onClickBack()
      openMoveCardModal()
   }

   renderBottomDrawer = (): ReactElement => {
      const {
         cardActionsDrawerRef,
         closeDrawer,
         openMoveCardModal,
         openDeleteDrawer,
         props: { t }
      } = this
      return (
         <BottomDrawerModal
            innerRef={cardActionsDrawerRef}
            closeDrawer={closeDrawer}
            haveHeader={false}
         >
            <ListMenuContainer>
               <ListMenuItem as='div' onClick={openMoveCardModal}>
                  <MoveToIcon />
                  <ListMenuText>
                     {t('workbookManagement:cardDetails.moveCard')}
                  </ListMenuText>
               </ListMenuItem>
               <ListMenuItem as='div' onClick={openDeleteDrawer}>
                  <DeleteIcon />
                  <ListMenuText>
                     {t('workbookManagement:cardDetails.delete')}
                  </ListMenuText>
               </ListMenuItem>
            </ListMenuContainer>
         </BottomDrawerModal>
      )
   }

   onDeleteCard = (): void => {
      const {
         closeDeleteDrawer,
         props: { onDeleteCard }
      } = this
      closeDeleteDrawer()
      onDeleteCard()
   }

   renderDeleteDrawer = (): ReactElement => {
      const {
         closeDeleteDrawer,
         cardDeleteDrawerRef,
         renderDrawerHeader,
         onDeleteCard,
         props: { deleteCardAPIStatus }
      } = this
      return (
         <MobileBottomDeleteDrawerModal
            innerRef={cardDeleteDrawerRef}
            headerContent={renderDrawerHeader()}
            closeDrawer={closeDeleteDrawer}
            type={'Card'}
            onClickDeleteButton={onDeleteCard}
            isDeleteButtonLoading={isAPIFetching(deleteCardAPIStatus)}
            isCancelButtonDisabled={isAPIFetching(deleteCardAPIStatus)}
            isDeleteButtonDisabled={isAPIFetching(deleteCardAPIStatus)}
         />
      )
   }

   render(): ReactElement {
      const {
         renderLeftEnhancer,
         renderRightEnhancer,
         props: { NavBarContainerCSS, renderEditableTextInput },
         renderDeleteDrawer,
         renderBottomDrawer
      } = this
      return (
         <>
            <MobileNavBar
               NavBarStyle={NavBarContainerCSS}
               renderLeftEnhancer={renderLeftEnhancer()}
               renderBody={renderEditableTextInput}
               renderRightEnhancer={renderRightEnhancer()}
            />
            {renderBottomDrawer()}
            {renderDeleteDrawer()}
         </>
      )
   }
}

export default withTranslation()(MobileCardDetailsHeader)
