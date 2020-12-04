import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../../Common/types'
import ProjectLockIcon from '../../../../Common/icons/ProjectLockIcon'
import colors from '../../../../Common/themes/Colors'
import { isMobileDevice } from '../../../../Common/utils/responsiveUtils'

import {
   PersonalProjectsContentContainer,
   PersonalProjectsTitle,
   PersonalProjectInfo,
   SubContentDivision,
   ContentDivision,
   TitleContainer
} from './styledComponents'

interface PersonalProjectsContentProps extends WithTranslation {} // eslint-disable-line

class PersonalProjectsContent extends Component<PersonalProjectsContentProps> {
   renderProjectLockIcon = () => <ProjectLockIcon fill={colors.blueThree} />

   render() {
      const {
         props: { t },
         renderProjectLockIcon
      } = this
      return (
         <PersonalProjectsContentContainer>
            <TitleContainer>
               <PersonalProjectsTitle>
                  {t('folderManagement:personalProjects.personalProjectsTitle')}
               </PersonalProjectsTitle>
               {isMobileDevice && renderProjectLockIcon()}
            </TitleContainer>
            <ContentDivision>
               {!isMobileDevice && renderProjectLockIcon()}
               <SubContentDivision>
                  <PersonalProjectInfo>
                     {t(
                        'folderManagement:personalProjects.thisFeatureIsLockedForYou'
                     )}
                  </PersonalProjectInfo>
                  <PersonalProjectInfo>
                     {t(
                        'folderManagement:personalProjects.itWillBeAvailableToYouOnEarning_1000LearningPoints'
                     )}
                  </PersonalProjectInfo>
               </SubContentDivision>
            </ContentDivision>
         </PersonalProjectsContentContainer>
      )
   }
}

export default withTranslation()(PersonalProjectsContent)
