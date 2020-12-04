import React, { Component, ReactElement, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'
import { observer } from 'mobx-react'

import { APIStatus } from '@ib/api-constants'

import BottomDrawerWithHeader from '../../../Common/components/BottomDrawerWithHeader'
import { WithTranslation } from '../../../Common/types'
import TextArea from '../../../Common/components/TextArea'
import { isAPIFetching } from '../../../Common/utils/APIUtils'

import {
   PAGE_OBJECTIVE_PLACEHOLDER,
   MAX_LENGTH_OF_PAGE_OBJECTIVE
} from '../../constants/UIConstants'

import {
   TitleText,
   EditObjectiveContainer,
   SaveButton
} from './styledComponents'

interface PageObjectiveEditProps extends WithTranslation {
   isVisible: boolean
   closeDrawer: () => void
   pageObjective: string
   updatePageObjectiveStatus: APIStatus
   onClickSaveButton: (objective: string) => void
   onChangePageObjective: (event) => void
}

@observer
class PageObjectiveEdit extends Component<PageObjectiveEditProps> {
   renderHeaderContent = (): ReactNode => {
      const { t } = this.props
      return (
         <TitleText>
            {t('workbookManagement:homeScreen.editObjective')}
         </TitleText>
      )
   }

   updateObjective = (event): void => {
      event.preventDefault()
      const { onClickSaveButton, pageObjective } = this.props
      onClickSaveButton(pageObjective)
   }

   render(): ReactElement {
      const {
         isVisible,
         closeDrawer,
         t,
         updatePageObjectiveStatus,
         pageObjective,
         onChangePageObjective
      } = this.props
      return (
         <BottomDrawerWithHeader
            isVisible={isVisible}
            closeDrawer={closeDrawer}
            headerContent={this.renderHeaderContent()}
         >
            <EditObjectiveContainer onSubmit={this.updateObjective}>
               <TextArea
                  value={pageObjective}
                  onChange={onChangePageObjective}
                  placeholder={PAGE_OBJECTIVE_PLACEHOLDER}
                  textAreaTestId='pageTitleTextArea'
                  contentTestId='pageTitleContent'
                  textInputStyles={{
                     height: '108px',
                     minHeight: '15px',
                     padding: '12px 16px'
                  }}
                  maxLength={MAX_LENGTH_OF_PAGE_OBJECTIVE}
               />
               <SaveButton
                  type='submit'
                  disabled={isAPIFetching(updatePageObjectiveStatus)}
                  isLoading={isAPIFetching(updatePageObjectiveStatus)}
               >
                  {t('workbookManagement:homeScreen.save')}
               </SaveButton>
            </EditObjectiveContainer>
         </BottomDrawerWithHeader>
      )
   }
}

export default withTranslation()(PageObjectiveEdit)
