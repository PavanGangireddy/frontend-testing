import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'

import {
   AchievementsInfoCardWrapper,
   AchievementsInfoCardContainer,
   AchievementsInfoTitle,
   AchievementInfoContainer,
   AchievementItem,
   AchievementInfo
} from './styledComponents'

interface AchievementsInfoCardProps extends WithTranslation {} // eslint-disable-line

class AchievementsInfoCard extends Component<AchievementsInfoCardProps> {
   render() {
      const { t } = this.props
      return (
         <AchievementsInfoCardWrapper>
            <AchievementsInfoCardContainer>
               <AchievementsInfoTitle>
                  {t(
                     'folderManagement:sideNavbar.achieveLearningPointsToUnlockFeatures'
                  )}
               </AchievementsInfoTitle>
               <AchievementInfoContainer>
                  <AchievementItem>
                     <AchievementInfo>
                        {t('folderManagement:sideNavbar.mergeCard')}
                     </AchievementInfo>
                     <AchievementInfo>500pts</AchievementInfo>
                  </AchievementItem>
                  <AchievementItem>
                     <AchievementInfo>
                        {t('folderManagement:sideNavbar.versioning')}
                     </AchievementInfo>
                     <AchievementInfo>200pts</AchievementInfo>
                  </AchievementItem>
                  <AchievementItem>
                     <AchievementInfo>
                        {t('folderManagement:sideNavbar.collaboration')}
                     </AchievementInfo>
                     <AchievementInfo>100pts</AchievementInfo>
                  </AchievementItem>
                  <AchievementItem>
                     <AchievementInfo>
                        {t('folderManagement:sideNavbar.groupActivity')}
                     </AchievementInfo>
                     <AchievementInfo>80pts</AchievementInfo>
                  </AchievementItem>
               </AchievementInfoContainer>
            </AchievementsInfoCardContainer>
         </AchievementsInfoCardWrapper>
      )
   }
}

export default withTranslation()(AchievementsInfoCard)
