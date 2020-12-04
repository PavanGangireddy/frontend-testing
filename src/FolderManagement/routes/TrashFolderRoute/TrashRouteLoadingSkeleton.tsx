import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { WorkbooksAndFoldersContainer } from '../../components/WorkbooksAndFolders/styledComponents'
import { Title } from '../../components/common/WorkbooksAndFoldersFilterBar/styledComponents'
import { Workbooks } from '../../components/Learnings/styledComponents'
import HomeLoadingSkeleton from '../../../Common/components/HomeLoadingSkeleton/HomeLoadingSkeleton'
import UnStarredFolderSkeleton from '../../components/common/FolderGridItem/UnStarredFolderSkeleton'

interface WithTranslationProps {
   i18n: any
   tReady: any
   t: any
}

class TrashRouteLoadingSkeleton extends Component<WithTranslationProps> {
   render() {
      const { t } = this.props
      return (
         <WorkbooksAndFoldersContainer data-testid={'loader'}>
            <Title>{t('folderManagement:trash:trash')}</Title>
            <Workbooks>
               <HomeLoadingSkeleton
                  skeletongridItem={<UnStarredFolderSkeleton />}
               />
            </Workbooks>
         </WorkbooksAndFoldersContainer>
      )
   }
}

export default withTranslation()(TrashRouteLoadingSkeleton)
