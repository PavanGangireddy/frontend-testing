import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { APIStatus } from '@ib/api-constants'
import { withRouter } from 'react-router-dom'

import {
   FOLDER,
   WORKBOOK,
   MERGE,
   LIST,
   SECTION,
   CARD
} from '../../constants/UIConstants'

import LoadingWrapper from '../LoadingWrapper'
import MoveFolderChild from '../MoveFolderChild'
import MoveWorkbookChild from '../MoveWorkbookChild'

interface MatchParams {
   folderId: string
   workbookId: string
}

interface MoveResourceBodyWrapperProps {
   onCancel: () => void
   actionType: string
   resourceType: string

   onMergeAPI?: (clickedMergeButton: string, sectionId: string) => void
   onMergeAPIStatus?: APIStatus
   onMergeAPIError?: any

   onMoveFolderResourceAPI: (id: string) => void
   onMoveFolderResourceAPIStatus: APIStatus
   onMoveFolderResourceAPIError?: any

   getWorkbookDetailsAPI?: (id: string) => void
   getWorkbookDetailsAPIStatus: APIStatus
   getWorkbookDetailsAPIError?: any

   getFolderDetailsAPI: (id: string, onSuccess: () => void) => void
   getFolderDetailsAPIStatus: APIStatus
   getFolderDetailsAPIError: any

   folderData: any
   workbookData?: any

   workbookId?: string
   folderId?: string

   rootFolderId: string
   getRootFolderDetailsAPI: (
      onSuccess: (rootFolderId?: string) => void,
      onFailure: () => void
   ) => void
   getRootFolderDetailsAPIStatus: APIStatus
   // TODO: Need to update the type
   getRootFolderDetailsAPIError: any

   // FIXME: Need to fix the issue with React Route types
   match: {
      params: MatchParams
   }

   movingFolderId?: string
   disabledWorkbookId?: string

   clearMoveWorkbooksAndFolders: () => void
   clearWorkbookChildDetails?: () => void
}

@observer
class MoveResourceBodyWrapper extends Component<MoveResourceBodyWrapperProps> {
   @observable isFolder!: boolean
   @observable resourceName!: string
   @observable isGettingRootFolderDetails: boolean
   @observable onFailureFolderId: string
   @observable onFailureWorkbookId: string
   @observable isDisableNavigate: boolean
   pathLength!: number
   isClickedFirstTime!: boolean
   rootFolderId!: string

   constructor(props) {
      super(props)
      this.initIsFolder()
      this.isDisableNavigate = false
      this.isGettingRootFolderDetails = false
      this.onFailureFolderId = ''
      this.onFailureWorkbookId = ''
   }

   initIsFolder = () => {
      const { actionType, resourceType } = this.props
      if (actionType === MERGE || resourceType === LIST)
         this.onChangeIsFolder(false)
      else this.onChangeIsFolder(true)
   }

   initPathLength = () => {
      const {
         folderData: { pathInfo }
      } = this.props
      if (pathInfo) {
         if (pathInfo.length > 0) {
            this.isDisableNavigate = false
            this.pathLength = pathInfo.length
         } else {
            this.isDisableNavigate = true
            this.pathLength = 0
         }
      }
   }

   onChangeIsFolder = (value: boolean) => {
      this.isFolder = value
   }

   componentDidMount(): void {
      const {
         clearMoveWorkbooksAndFolders,
         clearWorkbookChildDetails
      } = this.props
      if (clearWorkbookChildDetails) {
         clearWorkbookChildDetails()
      }
      clearMoveWorkbooksAndFolders()
      this.isClickedFirstTime = true
      this.initPathLength()
      this.doInitialNetworkCall()
   }

   doInitialNetworkCall = async () => {
      const { getRootFolderDetailsAPI } = this.props
      await getRootFolderDetailsAPI(
         this.onSuccessRootFolderDetailsAPI,
         this.onFailureRootFolderDetailsAPI
      )
      this.getFolderDetails(this.rootFolderId)
   }

   getWorkbookDetails = (workbookId: string): void => {
      const { getWorkbookDetailsAPI } = this.props
      if (getWorkbookDetailsAPI) {
         getWorkbookDetailsAPI(workbookId)
      }
      this.onChangeIsFolder(false)
   }

   retryGetWorkbookDetails = () => {
      this.getWorkbookDetails(this.onFailureWorkbookId)
   }

   onSuccessAPI = (): void => {
      if (this.isClickedFirstTime) {
         this.isClickedFirstTime = false
         this.initPathLength()
         this.pathLength -= 1
      }
   }

   getFolderDetails = (folderId: string) => {
      const { getFolderDetailsAPI } = this.props
      getFolderDetailsAPI(folderId, this.onSuccessAPI)
      this.onChangeIsFolder(true)
   }

   retryGetFolderDetails = () => {
      this.getFolderDetails(this.onFailureFolderId)
   }

   getResourceData = () => {
      const {
         folderData: { pathInfo },
         rootFolderId
      } = this.props
      if (pathInfo) {
         if (pathInfo.length > 0) {
            const length = pathInfo.length
            const { name, id, type } = pathInfo[length - 1]
            return { folderName: name, id, type }
         }
         return { folderName: 'Projects', id: rootFolderId }
      }
      if (rootFolderId) {
         return { folderName: 'Projects', id: rootFolderId }
      }
   }

   onClickFolder = folderId => {
      this.isDisableNavigate = false
      this.getFolderDetails(folderId)
      this.pathLength += 1
   }

   setResourceName = (resourceName: string) => {
      this.resourceName = resourceName
   }

   onSuccessRootFolderDetailsAPI = rootFolderId => {
      this.rootFolderId = rootFolderId
      this.isGettingRootFolderDetails = false
      this.isDisableNavigate = true
   }

   onChangeFailureFolderId = folderId => {
      this.onFailureFolderId = folderId
   }

   get isWorkbookChild(): boolean {
      const { resourceType } = this.props
      return (
         resourceType === LIST ||
         resourceType === SECTION ||
         resourceType === CARD
      )
   }

   getParentFolderId = () => {
      const {
         match: {
            params: { folderId }
         },
         folderData: { pathInfo },
         rootFolderId
      } = this.props
      if (this.isClickedFirstTime && this.isWorkbookChild) {
         this.pathLength -= 1
         this.onChangeFailureFolderId(folderId)
         return folderId
      }
      if (pathInfo) {
         if (this.pathLength === 0) {
            this.pathLength -= 1
            this.onChangeFailureFolderId(rootFolderId)
            return rootFolderId
         }
         if (!this.isWorkbookChild && this.isClickedFirstTime) {
            this.pathLength -= 2
         } else {
            this.pathLength -= 1
         }
         return pathInfo[this.pathLength].id
      }
      this.onChangeFailureFolderId(folderId)
      return folderId
   }

   onFailureRootFolderDetailsAPI = () => {
      this.isGettingRootFolderDetails = true
   }

   onClickBack = async () => {
      if (this.pathLength !== -1) {
         const parentFolderId = this.getParentFolderId()
         if (parentFolderId) {
            this.getFolderDetails(parentFolderId)
         } else {
            const { getRootFolderDetailsAPI } = this.props
            await getRootFolderDetailsAPI(
               this.onSuccessRootFolderDetailsAPI,
               this.onFailureRootFolderDetailsAPI
            )
            this.getFolderDetails(this.rootFolderId)
         }
         this.isDisableNavigate = this.pathLength === -1
      }
   }

   retryGetRootFolderDetails = async () => {
      const { getRootFolderDetailsAPI } = this.props
      await getRootFolderDetailsAPI(
         this.onSuccessRootFolderDetailsAPI,
         this.onFailureRootFolderDetailsAPI
      )
      this.getFolderDetails(this.rootFolderId)
   }

   isFolderWorkbookMove = (): boolean => {
      const { resourceType } = this.props
      return resourceType === FOLDER || resourceType === WORKBOOK
   }

   onClickWorkbook = workbookId => {
      this.onFailureWorkbookId = workbookId
      this.getWorkbookDetails(workbookId)
      this.pathLength += 1
   }

   renderSuccessUI = observer(() => {
      const {
         onCancel,
         folderData,
         onMoveFolderResourceAPI,
         onMoveFolderResourceAPIStatus,
         resourceType,
         movingFolderId,
         disabledWorkbookId
      } = this.props
      return (
         <MoveFolderChild
            onCancel={onCancel}
            type={resourceType}
            resourceData={this.getResourceData()}
            activeFolderInfo={folderData}
            onClickFolder={this.onClickFolder}
            onClickWorkbook={this.onClickWorkbook}
            isFolderWorkbookMove={this.isFolderWorkbookMove()}
            onClickBack={this.onClickBack}
            onClickMoveHere={onMoveFolderResourceAPI}
            apiStatus={onMoveFolderResourceAPIStatus}
            isDisableNavigate={this.isDisableNavigate}
            disabledId={movingFolderId}
            disabledWorkbookId={disabledWorkbookId}
         />
      )
   })

   getWorkbookTitle = () => {
      const { workbookData } = this.props
      if (workbookData) return workbookData.name
   }

   isCardsMerging = () => {
      const { actionType } = this.props
      return actionType === MERGE
   }

   renderWorkbookSuccessUI = () => {
      const {
         onCancel,
         workbookData,
         resourceType,
         onMoveFolderResourceAPI,
         onMoveFolderResourceAPIStatus,
         onMergeAPI,
         onMergeAPIStatus
      } = this.props
      if (this.isCardsMerging())
         return (
            <MoveWorkbookChild
               workbookId={this.onFailureWorkbookId}
               workbookTitle={this.getWorkbookTitle()}
               workbookChildDetails={workbookData}
               isMergingCards={this.isCardsMerging()}
               moveSourceType={resourceType}
               onClickBackButton={this.onClickBack}
               onClickMergeButton={onMergeAPI}
               mergeButtonStatus={onMergeAPIStatus}
            />
         )
      return (
         <MoveWorkbookChild
            workbookId={this.onFailureWorkbookId}
            workbookTitle={this.getWorkbookTitle()}
            workbookChildDetails={workbookData}
            isMergingCards={this.isCardsMerging()}
            moveSourceType={resourceType}
            onClickBackButton={this.onClickBack}
            onClickMoveHereButton={onMoveFolderResourceAPI}
            onClickCancelButton={onCancel}
            moveHereButtonStatus={onMoveFolderResourceAPIStatus}
         />
      )
   }

   render() {
      const {
         getFolderDetailsAPIStatus,
         getFolderDetailsAPIError,
         getWorkbookDetailsAPIStatus,
         getWorkbookDetailsAPIError,
         getRootFolderDetailsAPIStatus,
         getRootFolderDetailsAPIError
      } = this.props
      const apiStatus = this.isGettingRootFolderDetails
         ? getRootFolderDetailsAPIStatus
         : getFolderDetailsAPIStatus
      const apiError = this.isGettingRootFolderDetails
         ? getRootFolderDetailsAPIError
         : getFolderDetailsAPIError
      const onRetry = this.isGettingRootFolderDetails
         ? this.retryGetRootFolderDetails
         : this.retryGetFolderDetails
      if (this.isFolder)
         return (
            <LoadingWrapper
               apiStatus={apiStatus}
               apiError={apiError}
               renderSuccessUI={this.renderSuccessUI}
               onRetry={onRetry}
               containerStyle={{ height: '100%' }}
               loaderTestId={'foldersLoader'}
            />
         )
      return (
         <LoadingWrapper
            apiStatus={getWorkbookDetailsAPIStatus}
            apiError={getWorkbookDetailsAPIError}
            renderSuccessUI={this.renderWorkbookSuccessUI}
            onRetry={this.retryGetWorkbookDetails}
            containerStyle={{ height: '100%' }}
            loaderTestId={'workbooksLoader'}
         />
      )
   }
}

export default withRouter(MoveResourceBodyWrapper)
