import React, { Component, Ref } from 'react'
import { APIStatus } from '@ib/api-constants'

import Colors from '../../themes/Colors'
import CloseIcon from '../../icons/CloseIcon'

import BaseModalContainer from '../BaseModalContainer'

import {
   MainContainer,
   StyledIconContainer,
   Heading,
   Divider
} from './styledComponents'
import InputBoxWithSelect from './InputBoxWithSelect'
import { dropdownData } from './constants'
import styles from './styles.module.css'

interface Props {
   onCancel: Function
   innerRef?: Ref<BaseModalContainer>
   folderOrWorkbookID?: string
   shareFolderOrWorkbookAPI: Function
   isFolder?: boolean
   shareFolderOrWorkbookAPIStatus: APIStatus
   name?: string
   onSuccessShareFolderOrWorkbook?: () => void
   isHomeRoute?: boolean
   isPinnedOrStarred?: boolean
}

const SHARE_FOLDER = 'Share Folder'
const SHARE_WORKBOOK = 'Share Workbook'
const SHARE_PROJECT = 'Share Project'

class ShareFolderOrWorkBook extends Component<Props> {
   //TODO: There is some error with withTranslation and ForwardRef need to Fix it
   renderHeader = () => {
      const { isHomeRoute, isFolder, isPinnedOrStarred } = this.props
      return (
         <Heading>
            {isHomeRoute && !isPinnedOrStarred
               ? SHARE_PROJECT
               : isFolder
               ? SHARE_FOLDER
               : SHARE_WORKBOOK}
         </Heading>
      )
   }

   renderContent = () => (
      <InputBoxWithSelect
         dropdownData={dropdownData}
         shareFolderOrWorkbookAPI={this.props.shareFolderOrWorkbookAPI}
         folderOrWorkbookID={this.props.folderOrWorkbookID}
         isFolder={this.props.isFolder}
         closeModal={this.props.onCancel}
         shareFolderOrWorkbookAPIStatus={
            this.props.shareFolderOrWorkbookAPIStatus
         }
         name={this.props.name}
         onSuccessShareFolderOrWorkbook={
            this.props.onSuccessShareFolderOrWorkbook
         }
      />
   )

   render() {
      const { innerRef, onCancel } = this.props
      return (
         <BaseModalContainer
            ref={innerRef}
            hideCloseIcon
            dialogClass={styles.baseModalStyles}
         >
            <MainContainer>
               {this.renderHeader()}
               <Divider />
               {this.renderContent()}
               <StyledIconContainer
                  onClick={onCancel}
                  data-testid='shareFolderOrWorkbookModalCloseButton'
               >
                  <CloseIcon fill={Colors.darkBlueGrey} />
               </StyledIconContainer>
            </MainContainer>
         </BaseModalContainer>
      )
   }
}

export default React.forwardRef<BaseModalContainer, Props>(
   (props, captureModalRef) => (
      <ShareFolderOrWorkBook innerRef={captureModalRef} {...props} />
   )
)
