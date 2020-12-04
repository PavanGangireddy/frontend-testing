import React, { Component } from 'react'
import 'react-step-progress-bar/styles.css'
import { ProgressBar } from 'react-step-progress-bar'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'

import colors from '../../themes/Colors'
import { WithTranslation } from '../../types'

import {
   PercentageHint,
   UploadingText,
   Percentage,
   ProgressBarWrapper
} from './styledComponents'
import './styles.css'

interface ProgressBarComponentProps extends WithTranslation {
   percentage: number
   shouldShowProgessHint: boolean
}

@observer
class ProgressBarComponent extends Component<ProgressBarComponentProps> {
   shoulShowProgressBarHint = () => {
      const { shouldShowProgessHint } = this.props
      return shouldShowProgessHint
   }

   render() {
      const { percentage, t } = this.props
      const { shoulShowProgressBarHint } = this

      return (
         <ProgressBarWrapper>
            <ProgressBar
               percent={percentage}
               filledBackground={`background(${colors.primary500Default})`}
               className='progress-bar'
            />
            {shoulShowProgressBarHint() && (
               <PercentageHint>
                  <UploadingText>
                     {t('common:progressBar.uploading')}
                  </UploadingText>
                  <Percentage>
                     {percentage}
                     {t('common:progressBar.percentage')}
                  </Percentage>
               </PercentageHint>
            )}
         </ProgressBarWrapper>
      )
   }
}

export default withTranslation('translations', { withRef: true })(
   ProgressBarComponent
)
