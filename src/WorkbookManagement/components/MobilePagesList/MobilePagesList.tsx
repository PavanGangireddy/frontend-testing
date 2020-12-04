import React, { Component, ReactElement, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import { APIStatus } from '@ib/api-constants'

import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'
import PlusIcon from '../../../Common/icons/PlusIcon'
import colors from '../../../Common/themes/Colors'
import { WithTranslation } from '../../../Common/types'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import TickIcon from '../../../Common/icons/TickIcon'

import {
   PagesContainer,
   AddPageButton,
   NormalText,
   PageItem,
   TitleText,
   AddButtonText
} from './styledComponents'

interface MobilePagesListProps extends WithTranslation {
   isVisible: boolean
   closeDrawer: () => void
   pages: Array<{ id: string; name: string }>
   onClickPage: (id: string) => void
   onClickAddPage: (
      onSuccess: (pageId: string) => void,
      onFailure: () => void
   ) => void
   createPageAPIStatus: APIStatus
   shouldDisableActions
   activePageId: string | null
}

@observer
class MobilePagesList extends Component<MobilePagesListProps> {
   onClickPage = (id: string): void => {
      const { onClickPage } = this.props
      onClickPage(id)
   }

   renderPages = (): ReactNode => {
      const { pages, activePageId } = this.props
      return pages.map(page => {
         const { name, id } = page
         return (
            <PageItem key={id} onClick={(): void => this.onClickPage(id)}>
               <NormalText>{name}</NormalText>
               {activePageId === id ? (
                  <TickIcon fill={colors.brightBlue} />
               ) : null}
            </PageItem>
         )
      })
   }

   renderHeaderContent = (): ReactNode => {
      const { t } = this.props
      return (
         <TitleText>{t('workbookManagement:homeScreen.selectPage')}</TitleText>
      )
   }

   onClickAddPageButton = (): void => {
      const { onClickAddPage } = this.props
      onClickAddPage(this.onSuccessCreatePage, this.onFailureCreatePage)
   }

   onSuccessCreatePage = async (pageId: string) => {}

   onFailureCreatePage = (): void => {}

   isUserActionsEnabled = (): boolean => {
      const { shouldDisableActions } = this.props
      return !shouldDisableActions
   }

   renderAddPageButton = observer(() => {
      const { t, createPageAPIStatus } = this.props
      return this.isUserActionsEnabled() ? (
         <AddPageButton
            onClick={this.onClickAddPageButton}
            disabled={isAPIFetching(createPageAPIStatus)}
         >
            <PlusIcon fill={colors.steel} width={16} height={16} />
            <AddButtonText>
               {t('workbookManagement:homeScreen.addPage')}
            </AddButtonText>
         </AddPageButton>
      ) : null
   })

   render(): ReactElement {
      const { isVisible, closeDrawer } = this.props
      const { renderAddPageButton: RenderAddPageButton } = this
      return (
         <BottomDrawerWithHeader
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <PagesContainer>{this.renderPages()}</PagesContainer>
            <RenderAddPageButton />
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(MobilePagesList)
