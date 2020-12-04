import React, { Component, ReactElement } from 'react'
import { withTranslation } from 'react-i18next'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { validateName } from '../../../UserProfile/utils/ValidationUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'
import DeleteIcon from '../../../Common/icons/DeleteIcon'
import { ErrorObjectType } from '../../../Common/stores/types'
import BlackCloseIcon from '../../../Common/icons/BlackCloseIcon'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import PriorityGroup from '../../../Common/components/PriorityGroup'
import ColorPalette from '../../../Common/components/ColorPalette'
import {
   isMobileDevice,
   isTabletDevice
} from '../../../Common/utils/responsiveUtils'
import MoreIcon from '../../../Common/icons/MoreIcon'
import BottomDrawer from '../../../Common/components/BottomDrawer'

import SectionModel from '../../stores/models/SectionModel'
import { SelectedColorObjectType } from '../../stores/types'

import { MAX_CARD_NAME_LENGTH } from '../../constants/UIConstants'
import { inputFieldTypes, priorityList } from './constants'
import {
   AddCardContainer,
   InputBox,
   FormContainer,
   ListMenuContainer,
   PopOverMenuContainer,
   Footer,
   AddCardButton,
   AddCardText,
   CloseButton,
   SubFilterContainer,
   FilterTitle,
   DeleteIconContainer,
   PriorityGroupContainer,
   KebabMenuWrapper,
   MobileKebabMenuListItem
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: any
}

interface AddCardProps extends WithTranslationProps {
   SectionModel: SectionModel
   onCloseAddCard: () => void
   onClickMore: () => void
}

@observer
class AddCard extends Component<AddCardProps> {
   @observable cardName!: string
   @observable isInvalidCardName!: boolean
   @observable cardLabel!: string | null
   @observable cardPriority!: string
   @observable isVisibleMobileKebabMenu!: boolean
   cardRef

   constructor(props) {
      super(props)
      this.initAddCard()
   }

   initAddCard = () => {
      this.cardName = ''
      this.cardLabel = null
      this.isInvalidCardName = true
      this.isVisibleMobileKebabMenu = false
      this.cardRef = React.createRef()
   }

   componentDidMount() {
      this.cardRef.current?.focus()
   }

   onChangeCardLabel = (selectedColorObject: SelectedColorObjectType) => {
      const { backgroundColor } = selectedColorObject
      this.cardLabel = backgroundColor
   }

   onChangeCardPriority = (selectedPriority: string) => {
      this.cardPriority = selectedPriority
   }

   setIsInValidCardName = (value: boolean): void => {
      this.isInvalidCardName = value
   }

   validateCardName = (): ErrorObjectType => validateName(this.cardName)

   @action
   onChangeCardName = (event): void => {
      this.cardName = event.target.value
      this.setIsInValidCardName(this.validateCardName().shouldShowError)
   }

   isReadyToCreateCard = () =>
      !this.cardRef.current?.inputRef.current?.isError()

   getRequestObject = () => {
      const {
         SectionModel: { id }
      } = this.props
      //TODO: need to handle default case for priority
      const label = this.cardLabel ? this.cardLabel : null
      const priority = this.cardPriority ? parseInt(this.cardPriority) : null
      return {
         section_id: id,
         card_title: this.cardName,
         label: label,
         priority: priority,
         due_datetime: null
      }
   }

   onSuccessCardCreation = (): void => {
      const { onCloseAddCard } = this.props
      onCloseAddCard()
   }

   onFailureCardCreation = (error: any): void => {
      const errorMessage = getAPIErrorMessage(error)
      this.cardRef.current?.inputRef.current?.setError(errorMessage)
   }

   onClickAddCard = (event): void => {
      event.preventDefault()
      this.cardRef.current?.validateInput()
      if (this.isReadyToCreateCard()) {
         const {
            SectionModel: { createCardAPI }
         } = this.props
         createCardAPI(
            this.getRequestObject(),
            this.onSuccessCardCreation,
            this.onFailureCardCreation
         )
      }
   }

   onDeletePriority = event => {
      event.stopPropagation()
      this.cardPriority = ''
   }

   listMenuItems = (): React.ReactNode => {
      const {
         props: { t },
         onChangeCardLabel,
         onDeletePriority,
         cardPriority,
         onChangeCardPriority
      } = this
      //TODO: need to handle stop propagation
      return (
         <ListMenuContainer>
            <SubFilterContainer>
               <ColorPalette
                  onChangeSelectedColor={onChangeCardLabel}
                  stopPropagation={true}
               />
            </SubFilterContainer>
            <PriorityGroupContainer>
               <FilterTitle>
                  {t('workbookManagement:cardDetails.priority')}
                  <DeleteIconContainer onClick={onDeletePriority}>
                     <DeleteIcon width={'10px'} height={'10px'} />
                  </DeleteIconContainer>
               </FilterTitle>
               <PriorityGroup
                  priorityList={priorityList}
                  selectedValue={cardPriority}
                  onClickPriorityText={onChangeCardPriority}
                  stopPropagation={true}
               />
            </PriorityGroupContainer>
         </ListMenuContainer>
      )
   }

   onCloseAddCard = () => {
      const {
         initAddCard,
         props: { onCloseAddCard }
      } = this
      initAddCard()
      onCloseAddCard()
   }

   onKeyPressCardName = (event: any): void => {
      if (event.charCode === 13) this.onClickAddCard(event)
   }

   openAddCardMobileKebabMenu = (): void => {
      this.isVisibleMobileKebabMenu = true
   }

   closeAddCardMobileKebabMenu = (): void => {
      this.isVisibleMobileKebabMenu = false
   }

   renderAddCardKebabMenuDrawer = (): ReactElement => {
      const {
         closeAddCardMobileKebabMenu,
         isVisibleMobileKebabMenu,
         props: { t },
         onChangeCardLabel,
         onDeletePriority,
         cardPriority,
         onChangeCardPriority
      } = this
      return (
         <BottomDrawer
            closeDrawer={closeAddCardMobileKebabMenu}
            isVisible={isVisibleMobileKebabMenu}
         >
            <KebabMenuWrapper>
               <MobileKebabMenuListItem>
                  <ColorPalette
                     onChangeSelectedColor={onChangeCardLabel}
                     stopPropagation={true}
                  />
               </MobileKebabMenuListItem>
               <MobileKebabMenuListItem>
                  <PriorityGroupContainer>
                     <FilterTitle>
                        {t('workbookManagement:cardDetails.priority')}
                        <DeleteIconContainer onClick={onDeletePriority}>
                           <DeleteIcon width={'10px'} height={'10px'} />
                        </DeleteIconContainer>
                     </FilterTitle>
                     <PriorityGroup
                        priorityList={priorityList}
                        selectedValue={cardPriority}
                        onClickPriorityText={onChangeCardPriority}
                        stopPropagation={true}
                     />
                  </PriorityGroupContainer>
               </MobileKebabMenuListItem>
            </KebabMenuWrapper>
         </BottomDrawer>
      )
   }

   popoverStyle = {
      position: 'absolute',
      top: 'unset',
      right: '8px'
   }
   render(): React.ReactNode {
      const {
         props: {
            t,
            onCloseAddCard,
            SectionModel: { createCardAPIStatus }
         },
         renderAddCardKebabMenuDrawer,
         openAddCardMobileKebabMenu
      } = this
      return (
         <AddCardContainer>
            <PopOverMenuContainer>
               {isMobileDevice ? (
                  <MoreIcon
                     onClick={
                        !isAPIFetching(createCardAPIStatus) &&
                        openAddCardMobileKebabMenu
                     }
                  />
               ) : (
                  <PopoverMenu
                     renderPopoverContent={
                        !isAPIFetching(createCardAPIStatus) &&
                        this.listMenuItems()
                     }
                     openStyle={isTabletDevice ? this.popoverStyle : {}}
                  />
               )}
            </PopOverMenuContainer>
            <InputBox
               testId={'cardNameInput'}
               ref={this.cardRef}
               defaultValue={this.cardName}
               onChange={this.onChangeCardName}
               onKeyPress={this.onKeyPressCardName}
               type={inputFieldTypes.text}
               validate={this.validateCardName}
               shouldValidateOnBlur={false}
               maxLength={MAX_CARD_NAME_LENGTH}
               disabled={isAPIFetching(createCardAPIStatus)}
            />
            <Footer>
               <FormContainer onSubmit={this.onClickAddCard}>
                  <AddCardButton
                     isLoading={isAPIFetching(createCardAPIStatus)}
                     type={inputFieldTypes.submit}
                     id='addCardAddButton'
                     disabled={isAPIFetching(createCardAPIStatus)}
                  >
                     <AddCardText>
                        {t('workbookManagement:addCard.addCard')}
                     </AddCardText>
                  </AddCardButton>
                  <CloseButton
                     onClick={onCloseAddCard}
                     disabled={isAPIFetching(createCardAPIStatus)}
                     id='addCardCloseButton'
                  >
                     <BlackCloseIcon />
                  </CloseButton>
               </FormContainer>
            </Footer>
            {isMobileDevice && renderAddCardKebabMenuDrawer()}
         </AddCardContainer>
      )
   }
}

export default withTranslation()(AddCard)
