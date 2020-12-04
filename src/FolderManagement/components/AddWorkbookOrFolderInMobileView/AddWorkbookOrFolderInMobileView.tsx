import React, { Component, ReactNode } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { APIStatus, API_FETCHING } from '@ib/api-constants'
import { withTranslation } from 'react-i18next'
import { History } from 'history'

import {
   showFailureBottomCenterToast,
   showSuccessBottomCenterToast
} from '../../../Common/utils/ToastUtils'
import FolderIcon from '../../../Common/icons/FolderIcon'
import WorkbookIcon from '../../../Common/icons/WorkbookIcon'
import BaseInput from '../../../Common/components/BaseInput'
import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'
import FloatingButton from '../../../Common/components/FloatingButton'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import ProjectIcon from '../../../Common/icons/ProjectIcon'

import {
   FOLDER_NAME_MAX_LENGTH,
   WORKBOOK_NAME_MAX_LENGTH,
   FOLDER,
   createWorkbookOrFolderdata,
   createModalThemes,
   PROJECT,
   createProjectData
} from '../../constants/UIConstants'
import { goToWorkbookPage } from '../../utils/NavigationUtils.ts'

import {
   MenuItemsListContainer,
   MenuItemContainer,
   IconWrapper,
   ModalHeading,
   BaseInputContainer,
   FooterMainContainer,
   CancelButton,
   CancelButtonText,
   CreateButton,
   CreateButtonText,
   ModalBodyContainer,
   DrawerHeaderContainerCSS,
   InputCSS
} from './styledComponents'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
interface Props extends RouteComponentProps, WithTranslationProps {
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
   goToFolder?: (id: string) => void
   newlyCreatedFolderId?: string
   history: History
}

//TODO: need to get data from i18n
@observer
class AddWorkbookOrFolderInMobileView extends Component<Props> {
   @observable createType = FOLDER
   @observable folderOrWorkbookName: string
   @observable isVisibleMenuContainber: boolean
   @observable isVisibleCreateWorkbookOrFolder: boolean

   static defaultProps = {
      targetTestId: 'target',
      isHomeRoute: false
   }

   constructor(props) {
      super(props)
      this.folderOrWorkbookName = ''
      this.isVisibleMenuContainber = false
      this.isVisibleCreateWorkbookOrFolder = false
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

   onClickMenuItem(type: string): void {
      this.createType = type
      this.onClickCreateWorkbookOrFolder()
      this.onClickCloseMenuContainer()
   }

   renderIcon = (type: string): React.ReactNode => {
      switch (type) {
         case PROJECT:
            return <ProjectIcon width={32} height={32} />
         case FOLDER:
            return <FolderIcon width={32} height={32} />
         default:
            return <WorkbookIcon width={24} height={32} />
      }
   }

   renderCreateMenuItems = (): React.ReactNode => {
      const { isHomeRoute } = this.props
      return (
         <MenuItemsListContainer>
            {isHomeRoute
               ? createProjectData.map(item => (
                    <MenuItemContainer
                       as='div'
                       key={item.name}
                       onClick={(): void => this.onClickMenuItem(item.type)}
                       data-testid={`addButtonMenuItem`}
                    >
                       <IconWrapper>{this.renderIcon(item.type)}</IconWrapper>
                       {item.name}
                    </MenuItemContainer>
                 ))
               : createWorkbookOrFolderdata.map(item => (
                    <MenuItemContainer
                       as='div'
                       key={item.name}
                       onClick={(): void => this.onClickMenuItem(item.type)}
                       data-testid={`addButtonMenuItem`}
                    >
                       <IconWrapper>{this.renderIcon(item.type)}</IconWrapper>
                       {item.name}
                    </MenuItemContainer>
                 ))}
         </MenuItemsListContainer>
      )
   }

   renderMenuContainerHeader = (): ReactNode => {
      const { t } = this.props
      return <ModalHeading>{t(`folderManagement:home.createNew`)}</ModalHeading>
   }

   renderCreateDrawerHeader = (): React.ReactNode => {
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
         t,
         isHomeRoute,
         goToFolder,
         newlyCreatedFolderId,
         history
      } = this.props
      this.resetFolderOrWorkbookName()
      showSuccessBottomCenterToast(
         `${t('folderManagement:home.createWorkbookOrFolderSucceesMessage')}`
      )
      if (isSharedWithMeRoute) {
         getSharedWorkbooksAndFoldersOfASubFolderAPI(folderId)
      } else {
         if (isHomeRoute && goToFolder) {
            if (newlyCreatedFolderId !== undefined) {
               goToFolder(newlyCreatedFolderId)
            }
         } else {
            if (workbookId) {
               goToWorkbookPage(history, folderId, workbookId)
            } else {
               getWorkbooksAndFoldersAPI(folderId)
            }
         }
      }
      this.onClickCloseCreateWorkbookOrFolderDrawer()
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

   renderInput = (): React.ReactNode => (
      <BaseInputContainer>
         <BaseInput
            placeholder={`Enter ${this.createType.toLowerCase()} name`}
            value={this.folderOrWorkbookName}
            onChange={this.onFolderOrWorkbookNameChange}
            validate={this.validateInput}
            maxLength={this.getInputMaxLength()}
            inputCSS={InputCSS}
         />
      </BaseInputContainer>
   )

   renderModalFooter = (): React.ReactNode => (
      <FooterMainContainer>
         <CancelButton
            onClick={(): void =>
               this.onClickCloseCreateWorkbookOrFolderDrawer()
            }
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

   renderCreateFolderOrWorkbookPopup = (): React.ReactNode => (
      <>
         <ModalBodyContainer onSubmit={this.onCreate}>
            {this.renderInput()}
            {this.renderModalFooter()}
         </ModalBodyContainer>
      </>
   )

   onClickCloseCreateWorkbookOrFolderDrawer = (): void => {
      this.isVisibleCreateWorkbookOrFolder = false
      this.folderOrWorkbookName = ''
   }

   onClickCloseMenuContainer = (): void => {
      this.isVisibleMenuContainber = false
   }

   onClickCreateWorkbookOrFolder = (): void => {
      this.isVisibleCreateWorkbookOrFolder = true
   }

   onClickAddButton = (): void => {
      this.isVisibleMenuContainber = true
   }

   render(): React.ReactNode {
      const {
         getWorkbooksAndFoldersAPIStatus,
         getRootFolderDetailsAPIStatus
      } = this.props
      return (
         <>
            <FloatingButton
               onClick={this.onClickAddButton}
               disabled={isAPIFetching(
                  getWorkbooksAndFoldersAPIStatus,
                  getRootFolderDetailsAPIStatus
               )}
            />
            <BottomDrawerWithHeader
               isVisible={this.isVisibleMenuContainber}
               closeDrawer={this.onClickCloseMenuContainer}
               headerContent={this.renderMenuContainerHeader()}
               drawerHeaderContainerCSS={DrawerHeaderContainerCSS}
            >
               {this.renderCreateMenuItems()}
            </BottomDrawerWithHeader>
            <BottomDrawerWithHeader
               isVisible={this.isVisibleCreateWorkbookOrFolder}
               closeDrawer={this.onClickCloseCreateWorkbookOrFolderDrawer}
               headerContent={this.renderCreateDrawerHeader()}
            >
               {this.renderCreateFolderOrWorkbookPopup()}
            </BottomDrawerWithHeader>
         </>
      )
   }
}

export default withRouter(withTranslation()(AddWorkbookOrFolderInMobileView))
