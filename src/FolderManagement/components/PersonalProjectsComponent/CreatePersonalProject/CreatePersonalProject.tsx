import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'

import DisabledProjectIcon from '../../../../Common/icons/DisabledProjectIcon'
import PlusIcon from '../../../../Common/icons/PlusIcon'
import colors from '../../../../Common/themes/Colors'
import { WithTranslation } from '../../../../Common/types'

import {
   CreatePersonalProjectContainer,
   CreateProjectButton,
   CreateProjectText
} from './styledComponents'

interface CreatePersonalProjectProps extends WithTranslation {
   isPersonalProjectsLocked: boolean
}

class CreatePersonalProject extends Component<CreatePersonalProjectProps> {
   render() {
      const { isPersonalProjectsLocked, t } = this.props
      return (
         <CreatePersonalProjectContainer>
            <DisabledProjectIcon />
            <CreateProjectButton disabled={isPersonalProjectsLocked}>
               <PlusIcon fill={colors.white} />
               <CreateProjectText>
                  {t('folderManagement:personalProjects.createProject')}
               </CreateProjectText>
            </CreateProjectButton>
         </CreatePersonalProjectContainer>
      )
   }
}

export default withTranslation()(CreatePersonalProject)
