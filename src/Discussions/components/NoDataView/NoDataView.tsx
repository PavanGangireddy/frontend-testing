import React from 'react'
import { withTranslation } from 'react-i18next'

import { WithTranslation } from '../../../Common/types'

import { StyledContainer, NoDataText } from './styledComponents'

/*
TODO: Remove the import statements replated this component
NOTE: This will be depricated
FIXME: Remove this component once it's isolated from all other components

*/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface NoDataViewProps extends WithTranslation {}

class NoDataView extends React.Component<NoDataViewProps> {
   render() {
      // FIXME: Suggest the Implementation of this as a common component
      const { t } = this.props
      return (
         <StyledContainer>
            <NoDataText>{t('discussions:noDataYet')}</NoDataText>
         </StyledContainer>
      )
   }
}

export default withTranslation()(NoDataView)
