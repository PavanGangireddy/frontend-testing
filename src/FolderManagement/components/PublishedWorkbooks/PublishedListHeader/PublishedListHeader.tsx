import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../../Common/types'

import {
   ListHeaderContainer,
   NameContainer,
   Label,
   BaseColumnContainer
} from './styledComponents'

class PublishedListHeader extends Component<WithTranslation> {
   prefixForT = 'folderManagement:publishDashboard.'

   render(): ReactNode {
      const {
         props: { t },
         prefixForT
      } = this
      return (
         <ListHeaderContainer>
            <NameContainer>
               <Label>{t(`${prefixForT}nameOfWorkbook`)}</Label>
            </NameContainer>
            <BaseColumnContainer>
               <Label>{t(`${prefixForT}publishedDateAndTime`)}</Label>
            </BaseColumnContainer>
            <BaseColumnContainer>
               <Label>{t(`${prefixForT}totalSelectedUsers`)}</Label>
            </BaseColumnContainer>
            <BaseColumnContainer>
               <Label>{t(`${prefixForT}publishedUsers`)}</Label>
            </BaseColumnContainer>
         </ListHeaderContainer>
      )
   }
}

export default withTranslation()(PublishedListHeader)
