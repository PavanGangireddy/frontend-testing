import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { APIStatus } from '@ib/api-constants'
import parser from 'html-react-parser'
import { WithTranslation } from '../../../Common/types'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import LoadingWrapper from '../../../Common/components/LoadingWrapper'
import { isMobileDevice } from '../../../Common/utils/responsiveUtils'
import { isAPIFetching } from '../../../Common/utils/APIUtils'

import AssignmentInstructionModel from '../../stores/models/AssignmentInstructionModel'

import {
   Children,
   InstructionsBody,
   Title,
   Instruction,
   ObjectiveContainer,
   DescriptionContainer,
   InstructionsFooter,
   StartAssignmentButton
} from './styledComponents'
import styles from './styles.module.css'

interface AssignmentInstructionsModalProps extends WithTranslation {
   modalRef: any
   getAssignmentInstructionsAPI: () => void
   getAssignmentInstructionsAPIStatus: APIStatus
   getAssignmentInstructionsAPIError: any
   getAssignmentInstructionsAPIResponse: AssignmentInstructionModel
   onClickStartAssignment: () => void
}

class AssignmentInstructionsModal extends Component<
   AssignmentInstructionsModalProps
> {
   renderInstructionsUI = () => {
      const {
         getAssignmentInstructionsAPIResponse: { description, objective },
         t
      } = this.props
      return (
         <InstructionsBody>
            <ObjectiveContainer>
               <Title>{t('folderManagement:assignments.objective')}</Title>
               <Instruction>{objective}</Instruction>
            </ObjectiveContainer>
            <DescriptionContainer>
               <Title>{t('folderManagement:assignments.instructions')}</Title>
               <Instruction>{description && parser(description)}</Instruction>
            </DescriptionContainer>
         </InstructionsBody>
      )
   }

   render() {
      const {
         modalRef,
         getAssignmentInstructionsAPIStatus,
         getAssignmentInstructionsAPIError,
         getAssignmentInstructionsAPI,
         t,
         onClickStartAssignment
      } = this.props
      return (
         <BaseModalContainer
            ref={modalRef}
            hideCloseIcon
            dialogClass={styles.assignmentInstructionModalStyles}
         >
            <Children>
               <LoadingWrapper
                  apiStatus={getAssignmentInstructionsAPIStatus}
                  apiError={getAssignmentInstructionsAPIError}
                  renderSuccessUI={this.renderInstructionsUI}
                  onRetry={getAssignmentInstructionsAPI}
                  containerStyle={!isMobileDevice ? { height: '50vh' } : {}}
               />
               <InstructionsFooter>
                  <StartAssignmentButton
                     onClick={onClickStartAssignment}
                     disabled={isAPIFetching(
                        getAssignmentInstructionsAPIStatus
                     )}
                  >
                     {t('folderManagement:assignments.startAssignment')}
                  </StartAssignmentButton>
               </InstructionsFooter>
            </Children>
         </BaseModalContainer>
      )
   }
}

export default withTranslation()(AssignmentInstructionsModal)
