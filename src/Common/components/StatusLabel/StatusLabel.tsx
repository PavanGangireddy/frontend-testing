import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import parser from 'html-react-parser'

import { containerCSS } from '../EditableTextArea/styledComponents'
import { StatusLabelContainer, Label } from './styledComponents'
import { statuses, inProgress, yetToStart } from './constants'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}
export interface StatusLabelProps extends WithTranslationProps {
   status: string
   containerCSS?: React.CSSProperties
}

class StatusLabel extends Component<StatusLabelProps> {
   static statuses: any = statuses
   renderContentBasedOnStatus = (): string => {
      const { status } = this.props
      switch (status) {
         case inProgress:
            return 'common:statusLabel.inProgress'
         case yetToStart:
            return 'common:statusLabel.yetToStart'
         default:
            return 'common:statusLabel.submitted'
      }
   }
   render() {
      const { t, status } = this.props
      return (
         <StatusLabelContainer status={status} css={containerCSS}>
            <Label status={status}>
               {parser(t(this.renderContentBasedOnStatus()))}
            </Label>
         </StatusLabelContainer>
      )
   }
}
export default withTranslation('translation')(StatusLabel)
