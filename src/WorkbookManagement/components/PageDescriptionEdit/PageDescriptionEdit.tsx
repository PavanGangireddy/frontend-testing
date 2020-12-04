import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import { APIStatus } from '@ib/api-constants'

import TextArea from '../../../Common/components/TextArea'
import { isAPIFetching } from '../../../Common/utils/APIUtils'
import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'
import { WithTranslation } from '../../../Common/types'

import { PAGE_DESCRIPTION_PLACEHOLDER } from '../../constants/UIConstants'

import {
   TitleText,
   EditDescriptionContainer,
   SaveButton
} from './styledComponents'

interface PageDescriptionEditProps extends WithTranslation {
   isVisible: boolean
   closeDrawer: () => void
   pageDescription: string
   updatePageDescriptionStatus: APIStatus
   onClickSaveButton: (objective: string) => void
   onChangePageDescription: (event) => void
}

@observer
class PageDescriptionEdit extends Component<PageDescriptionEditProps> {
   renderHeaderContent = (): ReactNode => {
      const { t } = this.props
      return (
         <TitleText>
            {t('workbookManagement:homeScreen.editDescription')}
         </TitleText>
      )
   }

   updateObjective = (event): void => {
      event.preventDefault()
      const { onClickSaveButton, pageDescription } = this.props
      onClickSaveButton(pageDescription)
   }

   getPageDescription = (): string => {
      const { pageDescription } = this.props
      return pageDescription
         ? pageDescription.split('<br />').join('\n')
         : pageDescription
   }

   render(): ReactElement {
      const {
         isVisible,
         closeDrawer,
         t,
         updatePageDescriptionStatus,
         onChangePageDescription
      } = this.props
      return (
         <BottomDrawerWithHeader
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <EditDescriptionContainer onSubmit={this.updateObjective}>
               <TextArea
                  value={this.getPageDescription()}
                  onChange={onChangePageDescription}
                  placeholder={PAGE_DESCRIPTION_PLACEHOLDER}
                  textAreaTestId='pageDescriptionTextArea'
                  contentTestId='pageDescriptionContent'
                  textInputStyles={{
                     height: '236px',
                     minHeight: '15px',
                     padding: '12px 16px'
                  }}
               />
               <SaveButton
                  type='submit'
                  disabled={isAPIFetching(updatePageDescriptionStatus)}
                  isLoading={isAPIFetching(updatePageDescriptionStatus)}
               >
                  {t('workbookManagement:homeScreen.save')}
               </SaveButton>
            </EditDescriptionContainer>
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(PageDescriptionEdit)
