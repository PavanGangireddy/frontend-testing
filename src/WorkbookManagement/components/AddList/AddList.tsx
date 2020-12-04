import React, { Component, ReactNode, ChangeEvent } from 'react'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import TextInput from '../../../Common/components/TextInput'
import PlusIcon from '../../../Common/icons/PlusIcon'
import CloseIcon from '../../../Common/icons/CloseIcon'
import Colors from '../../../Common/themes/Colors'
import { isEmpty, ErrorObject } from '../../../Common/utils/ValidationUtils'
import {
   getAPIErrorMessage,
   isAPIFetching
} from '../../../Common/utils/APIUtils'

import { MAX_LENGTH_OF_LIST_NAME } from '../../constants/UIConstants'

import {
   AddListContainer,
   ButtonsContainer,
   AddListButton,
   AddListButtonText,
   CancelButtonContainer
} from './styledComponents'

// FIXME: Need to fix WithTranslation Props
interface WithTranslation {
   i18n: any
   tReady: any
   t: any
}

interface AddListProps extends WithTranslation {
   // TODO: Need to add type
   listContainerRef: any
   pageId: string
   listId: string
   order: number
   listName: string
   onChangeListName: (listName: string) => void
   // TODO: Need to add type
   onClickAddListButton: any
   onClickCancelButton: (listId: string) => void
   createListAPIStatus: APIStatus | undefined
   createListAPIError: Error | undefined
   getPageDetails: () => void
}

class AddList extends Component<AddListProps> {
   // TODO: Need to add types
   textInputRef
   addNewListDivRef

   constructor(props) {
      super(props)
      this.textInputRef = React.createRef()
      this.addNewListDivRef = React.createRef()
   }

   componentDidMount(): void {
      this.scrollToTheElementIfNotVisible()
      this.textInputRef.current.focus()
   }

   scrollToTheElementIfNotVisible = (): void => {
      // TODO: Need to improve the UX
      const creatingListDiv = this.addNewListDivRef.current
      const creatingListDivOffsetRight =
         window.innerWidth -
         creatingListDiv.offsetWidth -
         creatingListDiv.offsetLeft
      if (creatingListDivOffsetRight < 0) {
         const { listContainerRef } = this.props
         listContainerRef.current.scrollTo(creatingListDiv.offsetLeft, 0)
      }
   }

   setErrorObjectWithMessage = (errorMessage: string): ErrorObject => ({
      errorMessage: errorMessage,
      shouldShowError: true
   })

   removeErrorObject = (): ErrorObject => ({
      errorMessage: '',
      shouldShowError: false
   })

   setTextInputErrorMessage = (errorMessage: string): void => {
      this.textInputRef.current.inputRef.current.setError(errorMessage)
   }

   validateListName = (): ErrorObject => {
      if (this.validateEmptyName().shouldShowError) {
         return this.validateEmptyName()
      }
      return this.removeErrorObject()
   }

   validateEmptyName = (): ErrorObject => {
      const { listName, t } = this.props
      if (isEmpty(listName)) {
         return this.setErrorObjectWithMessage(
            `${t('workbookManagement:homeScreen.listNameShouldNotBeEmpty')}`
         )
      }
      return this.removeErrorObject()
   }

   onChangeListName = (event: ChangeEvent<HTMLInputElement>): void => {
      const { onChangeListName } = this.props
      const {
         target: { value: listName }
      } = event
      onChangeListName(listName)
   }

   onClickCancelButton = (): void => {
      const { listId, onClickCancelButton } = this.props
      onClickCancelButton(listId)
   }

   onClickAddListButton = (e: any): void => {
      e.preventDefault()
      const { t } = this.props
      if (this.validateEmptyName().shouldShowError) {
         this.setTextInputErrorMessage(
            `${t('workbookManagement:homeScreen.listNameShouldNotBeEmpty')}`
         )
      } else {
         const { onClickAddListButton, pageId, listName, order } = this.props
         onClickAddListButton(
            { page_id: pageId, list_name: listName, order: order + 1 },
            this.onSuccessCreatePageList,
            this.onFailureCreatePageList
         )
      }
   }

   onSuccessCreatePageList = (): void => {
      const { getPageDetails } = this.props
      getPageDetails()
   }

   onFailureCreatePageList = (error: Error): void => {
      const errorMessage = getAPIErrorMessage(error)
      this.setTextInputErrorMessage(errorMessage)
   }

   render(): ReactNode {
      const { listName, createListAPIStatus, t } = this.props
      return (
         <AddListContainer
            ref={this.addNewListDivRef}
            as='form'
            onSubmit={this.onClickAddListButton}
         >
            <TextInput
               ref={this.textInputRef}
               value={listName}
               onChange={this.onChangeListName}
               placeholder={t('workbookManagement:homeScreen.enterListName')}
               validate={this.validateListName}
               shouldValidateOnBlur={false}
               testId='listNameInput'
               maxLength={MAX_LENGTH_OF_LIST_NAME}
            />
            <ButtonsContainer>
               <AddListButton
                  isLoading={isAPIFetching(createListAPIStatus)}
                  id='addListAddButton'
                  type='submit'
               >
                  <PlusIcon fill={Colors.white} />
                  <AddListButtonText>
                     {t('workbookManagement:homeScreen.addList')}
                  </AddListButtonText>
               </AddListButton>
               <CancelButtonContainer
                  onClick={this.onClickCancelButton}
                  disabled={isAPIFetching(createListAPIStatus)}
                  isDisabled={isAPIFetching(createListAPIStatus)}
                  data-testid='addListCancelButton'
                  type='reset'
               >
                  <CloseIcon fill={Colors.black} width={16} height={16} />
               </CancelButtonContainer>
            </ButtonsContainer>
         </AddListContainer>
      )
   }
}

export default withTranslation()(AddList)
