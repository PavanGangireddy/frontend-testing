import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { APIStatus, API_FETCHING } from '@ib/api-constants'
import { History } from 'history'

import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import Colors from '../../../Common/themes/Colors'
import CloseIcon from '../../../Common/icons/CloseIcon'
import PlusIcon from '../../../Common/icons/PlusIcon'
import FolderIcon from '../../../Common/icons/FolderIcon'
import WorkbookIcon from '../../../Common/icons/WorkbookIcon'
import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import PopoverMenu from '../../../Common/components/PopoverMenu'
import Button from '../../../Common/components/Button'
import BaseInput from '../../../Common/components/BaseInput'
import ProjectIcon from '../../../Common/icons/ProjectIcon'

import {
   FOLDER_NAME_MAX_LENGTH,
   WORKBOOK_NAME_MAX_LENGTH,
   PROJECT
} from '../../constants/UIConstants'
import { goToWorkbookPage } from '../../utils/NavigationUtils.ts'

import {
   PopoverMenuContainer,
   AddTextContainer,
   MenuItemsListContainer,
   MenuItemContainer,
   IconContainer,
   ButtonWrapper,
   ModalBodyContainer,
   StyledIconContainer,
   ModalHeading,
   BaseInputContainer,
   FooterMainContainer,
   CancelButton,
   CancelButtonText,
   CreateButton,
   CreateButtonText
} from './styledComponents'

const FOLDER = 'folder'
const WORKBOOK = 'workbook'

const data = [
   { name: 'New Workbook', type: WORKBOOK },
   { name: 'New folder', type: FOLDER }
]

const projectCreateMenu = [{ name: 'New Project', type: PROJECT }]

const createModalThemes = {
   folder: {
      modalBtnText: 'Create Folder',
      modalHeading: 'Create Folder'
   },
   workbook: {
      modalBtnText: 'Create Workbook',
      modalHeading: 'Create Workbook'
   },
   project: {
      modalBtnText: 'Create Project',
      modalHeading: 'Create Project'
   }
}

interface Props extends RouteComponentProps {
   createFolderAPI: Function
   createWorkbookAPI: Function
   createFolderOrWorkbookAPIStatus?: APIStatus
   createFolderOrWorkbookAPIError?: any
   //TODO: this is not given in RouterProps, need to check and update this
   match: any
   rootFolderId: string
   getWorkbooksAndFoldersAPIStatus: APIStatus
   getRootFolderDetailsAPIStatus: APIStatus
   getWorkbooksAndFoldersAPI: Function
   isSharedWithMeRoute: boolean
   getSharedWorkbooksAndFoldersOfASubFolderAPI: Function
   targetTestId?: string
   isHomeRoute?: boolean
   goToFolder?: () => void
   history: History
}

//TODO: need to get data from i18n
@observer
class AddWorkbookOrFolder extends Component<Props> {
   @observable createType = FOLDER
   @observable folderOrWorkbookName: string

   static defaultProps = {
      targetTestId: 'target',
      isHomeRoute: false
   }

   constructor(props) {
      super(props)
      this.folderOrWorkbookName = ''
   }

   modalRef = React.createRef<BaseModalContainer>()

   openModal = (ref): void => {
      ref.current.openModal()
   }

   closeModal = (ref): void => {
      this.resetFolderOrWorkbookName()
      ref.current.closeModal()
   }

   shouldDisableAddButton = () => {
      const { match } = this.props
      const folderId = match.params.folderId
      if (this.isHomeFolderPage(folderId)) {
         return (
            this.props.getRootFolderDetailsAPIStatus === API_FETCHING ||
            this.props.getWorkbooksAndFoldersAPIStatus === API_FETCHING
         )
      }
      return this.props.getWorkbooksAndFoldersAPIStatus === API_FETCHING
   }

   renderButton = (): React.ReactNode => (
      <ButtonWrapper
         variant={Button.variants.primary}
         onClick={(): void => {}}
         disabled={this.shouldDisableAddButton()}
         testId={'addButton'}
      >
         <PlusIcon fill={Colors.white} />
         <AddTextContainer>{'Create New'}</AddTextContainer>
      </ButtonWrapper>
   )

   onClickMenuItem(type: string): void {
      this.createType = type
      this.openModal(this.modalRef)
   }

   renderIcon = (type: string): React.ReactNode => {
      switch (type) {
         case FOLDER:
            return <FolderIcon />
         case PROJECT:
            return <ProjectIcon />
         default:
            return <WorkbookIcon />
      }
   }

   renderCreateMenuItems = (): React.ReactNode => {
      const { isHomeRoute } = this.props
      return (
         <MenuItemsListContainer>
            {isHomeRoute
               ? projectCreateMenu.map(item => (
                    <MenuItemContainer
                       as='div'
                       key={item.name}
                       onClick={(): void => this.onClickMenuItem(item.type)}
                       data-testid={`addButtonMenuItem`}
                    >
                       <IconContainer>
                          {this.renderIcon(item.type)}
                       </IconContainer>
                       {item.name}
                    </MenuItemContainer>
                 ))
               : data.map(item => (
                    <MenuItemContainer
                       as='div'
                       key={item.name}
                       onClick={(): void => this.onClickMenuItem(item.type)}
                       data-testid={`addButtonMenuItem`}
                    >
                       <IconContainer>
                          {this.renderIcon(item.type)}
                       </IconContainer>
                       {item.name}
                    </MenuItemContainer>
                 ))}
         </MenuItemsListContainer>
      )
   }

   renderCreateModalHeader = (): React.ReactNode => {
      const { modalHeading } = createModalThemes[this.createType.toLowerCase()]
      return <ModalHeading>{modalHeading}</ModalHeading>
   }

   onFolderOrWorkbookNameChange = (e): void => {
      this.folderOrWorkbookName = e.target.value
   }

   validateInput = () => {
      if (this.isFolderOrWorkbookNameEmpty()) {
         return { shouldShowError: true, errorMessage: 'Required' }
      }
      return {
         shouldShowError: false,
         errorMessage: ''
      }
   }

   isFolder = (): boolean => this.createType === FOLDER

   isProject = (): boolean => this.createType === PROJECT

   getInputMaxLength = (): number => {
      if (this.isFolder() || this.isProject()) {
         return FOLDER_NAME_MAX_LENGTH
      }
      return WORKBOOK_NAME_MAX_LENGTH
   }

   renderInput = (): React.ReactNode => (
      <BaseInputContainer>
         <BaseInput
            placeholder={`Enter ${this.createType.toLowerCase()} name`}
            value={this.folderOrWorkbookName}
            onChange={this.onFolderOrWorkbookNameChange}
            validate={this.validateInput}
            maxLength={this.getInputMaxLength()}
         />
      </BaseInputContainer>
   )

   isRootFolderDataFetching = () =>
      this.props.getWorkbooksAndFoldersAPIStatus === API_FETCHING

   isHomeFolderPage = folderId => folderId === undefined

   getFolderID = () => {
      const { match, rootFolderId } = this.props
      const folderId = match.params.folderId
      if (this.isHomeFolderPage(folderId)) {
         return rootFolderId
      }
      return folderId
   }

   resetFolderOrWorkbookName = (): void => {
      this.folderOrWorkbookName = ''
   }

   onCreationSuccess = (folderId: string, workbookId: string | null): void => {
      const {
         getWorkbooksAndFoldersAPI,
         isSharedWithMeRoute,
         getSharedWorkbooksAndFoldersOfASubFolderAPI,
         isHomeRoute,
         goToFolder,
         history
      } = this.props
      this.resetFolderOrWorkbookName()
      showSuccessBottomCenterToast('Created Successfully!')
      this.closeModal(this.modalRef)
      if (isSharedWithMeRoute) {
         getSharedWorkbooksAndFoldersOfASubFolderAPI(folderId)
      } else {
         if (isHomeRoute) {
            if (goToFolder) {
               goToFolder()
            }
         } else {
            if (workbookId) {
               goToWorkbookPage(history, folderId, workbookId)
            } else {
               getWorkbooksAndFoldersAPI(folderId)
            }
         }
      }
   }

   onCreationFailure = (): void => {
      const { createFolderOrWorkbookAPIError } = this.props
      this.resetFolderOrWorkbookName()
      showFailureBottomCenterToast(createFolderOrWorkbookAPIError)
   }

   onCreate = (e): void => {
      e.preventDefault()
      const { createFolderAPI, createWorkbookAPI } = this.props
      const folderId = this.getFolderID()
      let requestObject
      if (this.createType === FOLDER || this.createType === PROJECT) {
         requestObject = {
            parent_folder_id: folderId,
            folder_name: this.folderOrWorkbookName
         }
         createFolderAPI(
            requestObject,
            () => this.onCreationSuccess(folderId, null),
            this.onCreationFailure
         )
         return
      }
      requestObject = {
         folder_id: folderId,
         workbook_name: this.folderOrWorkbookName
      }
      createWorkbookAPI(
         requestObject,
         (workbookId: string) => this.onCreationSuccess(folderId, workbookId),
         this.onCreationFailure
      )
      return
   }

   isFolderOrWorkbookNameEmpty = () => this.folderOrWorkbookName === ''

   isCreateFolderOrWorkbookAPIStatusFetching = () =>
      this.props.createFolderOrWorkbookAPIStatus === API_FETCHING

   renderModalFooter = (): React.ReactNode => (
      <FooterMainContainer>
         <CancelButton
            onClick={(): void => this.closeModal(this.modalRef)}
            variant={CancelButton.variants.secondary}
            disabled={this.isCreateFolderOrWorkbookAPIStatusFetching()}
            id={'cancelButton'}
            type={'reset'}
         >
            <CancelButtonText>{'Cancel'}</CancelButtonText>
         </CancelButton>
         <CreateButton
            type={'submit'}
            variant='primary'
            disabled={
               this.isCreateFolderOrWorkbookAPIStatusFetching() ||
               this.isFolderOrWorkbookNameEmpty()
            }
            isLoading={this.isCreateFolderOrWorkbookAPIStatusFetching()}
            id={'createButton'}
         >
            <CreateButtonText>{'Create'}</CreateButtonText>
         </CreateButton>
      </FooterMainContainer>
   )

   //TODO: on click outside close need to clear state of input
   renderCreateFolderOrWorkbookPopup = (): React.ReactNode => (
      <BaseModalContainer ref={this.modalRef} hideCloseIcon>
         <ModalBodyContainer onSubmit={this.onCreate}>
            {this.renderCreateModalHeader()}
            {this.renderInput()}
            {this.renderModalFooter()}
         </ModalBodyContainer>
         <StyledIconContainer
            onClick={(): void => this.closeModal(this.modalRef)}
         >
            <CloseIcon fill={Colors.darkBlueGrey} />
         </StyledIconContainer>
      </BaseModalContainer>
   )

   render(): React.ReactNode {
      const { targetTestId } = this.props
      return (
         <>
            <PopoverMenuContainer>
               <PopoverMenu
                  renderPopoverTrigger={this.renderButton()}
                  renderPopoverContent={this.renderCreateMenuItems()}
                  placement='bottomRight'
                  targetTestId={targetTestId}
               />
            </PopoverMenuContainer>
            {this.renderCreateFolderOrWorkbookPopup()}
         </>
      )
   }
}

export default withRouter(AddWorkbookOrFolder)
