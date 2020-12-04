import React, { Component, ReactNode, ReactElement } from 'react'
import { observer } from 'mobx-react'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'

import LoadingWrapper from '../../../Common/components/LoadingWrapper'

import { LEARNINGS } from '../../constants/UIConstants'
import BaseWorkbookAndFolderInfoItem from '../../stores/models/BaseWorkbookAndFolderInfoItem'

import WorkbookGridItem from '../common/WorkbookGridItem'

import LearningsNoDataView from './LearningsNoDataView'

import {
   Title,
   Workbooks,
   Container,
   SubContainer,
   LearningsWrapper,
   containerClassName,
   LearningsNoDataViewContainer
} from './styledComponents'
import LearningsSkeleton from './LearningsSkeleton'

interface WithTranslationProps {
   t: any
   i18n: any
   tReady: boolean
}

export interface LearningsProps extends WithTranslationProps {
   learningWorkbooks: Map<string, Array<BaseWorkbookAndFolderInfoItem> | string>
   onDoubleClickWorkbook: (workbookId: string) => void
   getLearningWorkbooksAPIStatus: APIStatus
   getLearningWorkbooksAPIError: any
   doNetworkCallForLearningWorkbooks: () => void
}

@observer
class Learnings extends Component<LearningsProps> {
   get isLearningEmpty() {
      const { learningWorkbooks } = this.props
      const workbooksDataLength = learningWorkbooks.get('workbooks')?.length
      return workbooksDataLength !== undefined && workbooksDataLength === 0
   }
   renderLearningWorkbooks = (workbooks): ReactNode => {
      const { onDoubleClickWorkbook } = this.props
      return workbooks.length > 0 ? (
         workbooks.map(workbook => (
            <WorkbookGridItem
               key={workbook.id}
               name={workbook.name}
               id={workbook.id}
               isPinned={false}
               onDoubleClickWorkbook={onDoubleClickWorkbook}
               currentRoute={LEARNINGS}
               isPublishedByUs={true}
            />
         ))
      ) : (
         <LearningsNoDataViewContainer>
            <LearningsNoDataView />
         </LearningsNoDataViewContainer>
      )
   }

   renderSuccessUI = observer(
      (): ReactElement => {
         const { t, learningWorkbooks } = this.props
         const workbooksDataLength = learningWorkbooks.get('workbooks')?.length
         return (
            <LearningsWrapper
               data-testid={'assignmnetsSection'}
               isEmptyPage={this.isLearningEmpty}
            >
               <Container>
                  {workbooksDataLength && workbooksDataLength > 0 ? (
                     <SubContainer>
                        <Title>{t('folderManagement:learning.learning')}</Title>
                     </SubContainer>
                  ) : null}
                  <Workbooks>
                     {this.renderLearningWorkbooks(
                        learningWorkbooks.get('workbooks')
                     )}
                  </Workbooks>
               </Container>
            </LearningsWrapper>
         )
      }
   )

   renderLoadingView = () => <LearningsSkeleton />

   render(): ReactNode {
      const {
         getLearningWorkbooksAPIStatus,
         getLearningWorkbooksAPIError,
         doNetworkCallForLearningWorkbooks
      } = this.props
      return (
         <LoadingWrapper
            apiStatus={getLearningWorkbooksAPIStatus}
            apiError={getLearningWorkbooksAPIError}
            onRetry={doNetworkCallForLearningWorkbooks}
            renderSuccessUI={this.renderSuccessUI}
            failureMessageTestId='learningsFailureMessage'
            retryButtonTestId='learningsRetryButton'
            loaderTestId='learningsLoader'
            containerClassName={containerClassName}
            renderLoadingView={this.renderLoadingView}
         />
      )
   }
}

export default withTranslation('translation', { withRef: true })(Learnings)
