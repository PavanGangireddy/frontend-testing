import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import FolderIcon from '../../../Common/icons/FolderIcon'
import PlusIcon from '../../../Common/icons/PlusIcon'
import WorkbookIcon from '../../../Common/icons/WorkbookIcon'
import Colors from '../../../Common/themes/Colors'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'

import { createOptions, NORMAL } from '../../constants/UIConstants'

import {
   NoDataViewContainer,
   NoDataMessage,
   CardsContainer,
   AddButton,
   Break,
   AddButtonText,
   CardContainer,
   NoDataViewImage,
   MessageAndCardsContainer,
   NodataHeading
} from './styledComponents'

//FIXME:write WithTranslationProps
interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

interface NoDataViewProps extends WithTranslationProps {
   onClickAddFolder: (type: string) => void
   onClickAddWorkbook: (type: string) => void
   shouldShowNoDataMessage?: boolean
   isHomeRoute?: boolean
   type: string
}

class NoDataView extends Component<NoDataViewProps> {
   static defaultProps = {
      shouldShowNoDataMessage: true,
      isHomeRoute: false
   }
   onClickAddFolder = (): void => {
      const { onClickAddFolder } = this.props
      onClickAddFolder(createOptions.folder)
   }

   onClickAddWorkbook = (): void => {
      const { onClickAddWorkbook } = this.props
      onClickAddWorkbook(createOptions.workbook)
   }

   getNoDataMessageHeading = (): string => {
      const { t } = this.props
      return t('folderManagement:noDataView.emptyProjectMessage')
   }

   renderNoDataMessage = (): ReactNode => {
      const { shouldShowNoDataMessage, type } = this.props
      if (shouldShowNoDataMessage && type !== NORMAL) {
         return (
            <NoDataMessage data-testid={'startYourJournyByCreating'}>
               <NodataHeading
                  dangerouslySetInnerHTML={{
                     __html: this.getNoDataMessageHeading()
                  }}
               />
               <Break />{' '}
            </NoDataMessage>
         )
      }
      return null
   }

   getWidthAndHeight = () => {
      if (isMobileDevice) {
         return 32
      }
      return 64
   }

   renderNoDataImageOrNull = (): ReactNode => {
      const { t, type } = this.props

      if (isMobileDevice || type === NORMAL) {
         return null
      }
      return (
         <NoDataViewImage
            data-testid='noDataViewImage'
            src={
               'https://bss-backend-media-static.s3.ap-south-1.amazonaws.com/front-end/media/empty-folder.svg'
            }
            alt={t('folderManagement:noDataView.noDataViewImage')}
         />
      )
   }
   getNewWorkbookCardText = (): string => {
      if (isMobileDevice) {
         return 'folderManagement:noDataView.newWorkbook'
      }
      return 'folderManagement:noDataView.addNewWorkbook'
   }

   getNewFolderCardText = (): string => {
      if (isMobileDevice) {
         return 'folderManagement:noDataView.newFolder'
      }
      return 'folderManagement:noDataView.addNewFolder'
   }

   render(): ReactNode {
      const { t, isHomeRoute } = this.props
      return isHomeRoute ? null : (
         <NoDataViewContainer>
            <MessageAndCardsContainer>
               {this.renderNoDataMessage()}
               <CardsContainer>
                  <CardContainer
                     onClick={this.onClickAddFolder}
                     data-testid={'addNewFolder'}
                  >
                     <FolderIcon
                        width={this.getWidthAndHeight()}
                        height={this.getWidthAndHeight()}
                     />
                     <AddButton>
                        <PlusIcon fill={Colors.steel} width={16} height={16} />
                        <AddButtonText>
                           {t(this.getNewFolderCardText())}
                        </AddButtonText>
                     </AddButton>
                  </CardContainer>
                  <CardContainer
                     onClick={this.onClickAddWorkbook}
                     data-testid={'addNewWorkbook'}
                  >
                     <WorkbookIcon
                        width={this.getWidthAndHeight()}
                        height={this.getWidthAndHeight()}
                     />
                     <AddButton>
                        <PlusIcon fill={Colors.steel} width={16} height={16} />
                        <AddButtonText>
                           {t(this.getNewWorkbookCardText())}
                        </AddButtonText>
                     </AddButton>
                  </CardContainer>
               </CardsContainer>
            </MessageAndCardsContainer>
            {this.renderNoDataImageOrNull()}
         </NoDataViewContainer>
      )
   }
}

export default withTranslation('translation', { withRef: true })(NoDataView)
