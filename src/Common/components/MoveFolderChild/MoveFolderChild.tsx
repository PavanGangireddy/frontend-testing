import React, { Component, ReactNode } from 'react'
import { APIStatus } from '@ib/api-constants'
import { observer } from 'mobx-react'

import ActiveFolderInfoItem from '../../../FolderManagement/stores/models/ActiveFolderInfoItem'
import {
   PROJECT,
   NORMAL
} from '../../../FolderManagement/constants/UIConstants'

import { WORKBOOK, FOLDER } from '../../constants/UIConstants'
import WorkbookIcon from '../../icons/WorkbookIcon'
import StarredFolderIcon from '../../icons/StarredFolderIcon'
import NormalFolderIcon from '../../icons/NormalFolderIcon'
import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import { isAPIFetching } from '../../utils/APIUtils'
import ProjectIcon from '../../icons/ProjectIcon'
import FolderIcon from '../../icons/FolderIcon'
import StarredWorkbookIcon from '../../icons/StarredWorkbookIcon'
import IDMFolderIcon from '../../icons/IDMFolderIcon'
import IDMWorkbookIcon from '../../icons/IDMWorkbookIcon'

import Button from '../Button'

import {
   ResourcesListContainer,
   ResourceContainer,
   GoBackButton,
   ResourceName,
   ResourceIconContainer,
   WorkbookAndFoldersList,
   ListItem,
   MoveFolderChildFooter,
   CancelButton,
   SuccessButton,
   CancelButtonText
} from './styledComponents'

interface MoveFolderChildProps {
   onCancel: () => void
   type: string
   resourceData: any
   activeFolderInfo: ActiveFolderInfoItem
   onClickFolder: (folderId: string) => void
   onClickWorkbook?: (workbookId: string) => void
   isFolderWorkbookMove: boolean
   onClickBack: () => void
   onClickMoveHere: (folderId: string) => void
   apiStatus: APIStatus
   disabledId?: string
   isDisableNavigate: boolean
   disabledWorkbookId?: string
}

@observer
class MoveFolderChild extends Component<MoveFolderChildProps> {
   renderBackButton = (): ReactNode => {
      const { isDisableNavigate, onClickBack } = this.props

      if (isDisableNavigate) {
         return null
      }
      return (
         <GoBackButton
            onClick={onClickBack}
            disabled={isDisableNavigate}
            data-testid='moveBackButton'
         >
            <ArrowLeftIcon />
         </GoBackButton>
      )
   }
   renderResource = () => {
      const { resourceData } = this.props
      return (
         <ResourceContainer>
            {this.renderBackButton()}
            <ResourceIconContainer>
               {resourceData.type === NORMAL ? <FolderIcon /> : <ProjectIcon />}
            </ResourceIconContainer>
            <ResourceName>{resourceData.folderName}</ResourceName>
         </ResourceContainer>
      )
   }

   isDisabledCheck = (id: string): boolean => {
      const { disabledId } = this.props
      return disabledId === id
   }

   isWorkbookDisabled = (workbookId: string): boolean => {
      const { disabledWorkbookId } = this.props
      if (disabledWorkbookId) {
         if (workbookId === disabledWorkbookId) {
            return true
         }
      }
      return false
   }

   renderWorkbooks = (): ReactNode => {
      const {
         activeFolderInfo: { workbooks },
         onClickWorkbook
      } = this.props
      return workbooks.map(eachWorkbook => {
         const { id } = eachWorkbook
         const isWorkbookDisabled = this.isWorkbookDisabled(id)
         return (
            <ListItem
               key={eachWorkbook.id}
               onClick={
                  onClickWorkbook && !isWorkbookDisabled
                     ? (): void => onClickWorkbook(id)
                     : null
               }
               isDisabled={isWorkbookDisabled}
               data-testid={'moveWorkbook'}
            >
               <ResourceIconContainer>
                  {eachWorkbook.isPublishedByUs ? (
                     <IDMWorkbookIcon />
                  ) : eachWorkbook.isPinned ? (
                     <StarredWorkbookIcon />
                  ) : (
                     <WorkbookIcon />
                  )}
               </ResourceIconContainer>
               <ResourceName>{eachWorkbook.name}</ResourceName>
            </ListItem>
         )
      })
   }

   renderFolders = (): ReactNode => {
      const {
         activeFolderInfo: { folders },
         onClickFolder
      } = this.props
      return folders.map(eachFolder => {
         const isDisabled = this.isDisabledCheck(eachFolder.id)
         return (
            <ListItem
               key={eachFolder.id}
               onClick={
                  !isDisabled ? (): void => onClickFolder(eachFolder.id) : null
               }
               isDisabled={isDisabled}
               data-testid={'moveFolder'}
            >
               <ResourceIconContainer>
                  {eachFolder.type === PROJECT ? (
                     <ProjectIcon />
                  ) : eachFolder.isPublishedByUs ? (
                     <IDMFolderIcon />
                  ) : eachFolder.isStarred ? (
                     <StarredFolderIcon />
                  ) : (
                     <NormalFolderIcon />
                  )}
               </ResourceIconContainer>
               <ResourceName>{eachFolder.name}</ResourceName>
            </ListItem>
         )
      })
   }

   renderActiveFolderInfo = () => {
      const { isFolderWorkbookMove } = this.props
      return (
         <WorkbookAndFoldersList>
            {this.renderFolders()}
            {!isFolderWorkbookMove && this.renderWorkbooks()}
         </WorkbookAndFoldersList>
      )
   }

   onClickMoveHere = () => {
      const {
         onClickMoveHere,
         resourceData: { id }
      } = this.props
      onClickMoveHere(id)
   }

   renderFooter = observer((): any => {
      const { onCancel, apiStatus, type } = this.props
      if (type === WORKBOOK || type === FOLDER) {
         return (
            <MoveFolderChildFooter>
               <CancelButton
                  onClick={onCancel}
                  disabled={isAPIFetching(apiStatus)}
                  data-testid={'moveFolderChildCancelButton'}
               >
                  <CancelButtonText size={Button.sizes.large}>
                     Cancel
                  </CancelButtonText>
               </CancelButton>
               <SuccessButton
                  onClick={this.onClickMoveHere}
                  isLoading={isAPIFetching(apiStatus)}
                  disabled={isAPIFetching(apiStatus)}
                  data-testid={'moveFolderChildSubmitButton'}
               >
                  Move here
               </SuccessButton>
            </MoveFolderChildFooter>
         )
      }
   })

   render(): ReactNode {
      const { renderFooter: RenderFooter } = this
      return (
         <ResourcesListContainer>
            {this.renderResource()}
            {this.renderActiveFolderInfo()}
            <RenderFooter />
         </ResourcesListContainer>
      )
   }
}

export default MoveFolderChild
