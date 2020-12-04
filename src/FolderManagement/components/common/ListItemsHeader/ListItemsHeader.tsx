import React, { Component, ReactNode } from 'react'
import { withTranslation } from 'react-i18next'

import {
   ListItemContainer,
   Label,
   NameContainer,
   ModifiedDateContainer,
   MoreContainer,
   OwnerContainer
} from './styledComponents'

// FIXME: Need to fix WithTranslation
interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
   isSharedWithMe: boolean
}

// FIXME: Need to update props
class ListItemsHeader extends Component<WithTranslationProps> {
   renderOwner = (): React.ReactElement | null => {
      const { t, isSharedWithMe } = this.props
      if (isSharedWithMe) {
         return (
            <OwnerContainer>
               <Label>{t('folderManagement:listViewHeaderLabels.owner')}</Label>
            </OwnerContainer>
         )
      }
      return null
   }

   render(): ReactNode {
      const { t } = this.props
      return (
         <ListItemContainer>
            <NameContainer>
               <Label>{t('folderManagement:listViewHeaderLabels.name')}</Label>
            </NameContainer>
            <ModifiedDateContainer>
               <Label>
                  {t('folderManagement:listViewHeaderLabels.lastModified')}
               </Label>
            </ModifiedDateContainer>
            <MoreContainer>
               <Label>{t('folderManagement:listViewHeaderLabels.more')}</Label>
            </MoreContainer>
         </ListItemContainer>
      )
   }
}

export default withTranslation()(ListItemsHeader)
