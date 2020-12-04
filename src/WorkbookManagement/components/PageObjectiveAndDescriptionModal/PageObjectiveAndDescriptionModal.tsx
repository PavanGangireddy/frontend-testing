import React, { Component, ReactElement, Ref } from 'react'
import { withTranslation } from 'react-i18next'
import parser from 'html-react-parser'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import colors from '../../../Common/themes/Colors'
import { WithTranslation } from '../../../Common/types'
import { isEmpty } from '../../../Common/utils/ValidationUtils'

import styles from './styles.module.css'

import {
   ObjectAndDescriptionContainer,
   ObjectiveTitle,
   ObjectiveAndDescriptionText,
   DescriptionTitle
} from './styledComponents'

interface PageObjectiveAndDescriptionModalProps extends WithTranslation {
   innerRef: Ref<BaseModalContainer>
   objective: string
   description: string
   onClickObjective: () => void
   onClickDescription: () => void
   onCloseModal: () => void
   shouldDisableActions
}

class PageObjectiveAndDescriptionModal extends Component<
   PageObjectiveAndDescriptionModalProps
> {
   getObjective = (): string => {
      const { objective } = this.props
      return isEmpty(objective) ? 'Add Objective' : objective
   }

   getDescription = (): string => {
      const { description } = this.props
      return isEmpty(description) ? 'Add Description' : description
   }

   render(): ReactElement {
      const {
         innerRef,
         onClickObjective,
         onClickDescription,
         t,
         objective,
         description,
         onCloseModal,
         shouldDisableActions
      } = this.props
      return (
         <BaseModalContainer
            ref={innerRef}
            hideCloseIcon={true}
            underlayColor={colors.darkBlueGrey16}
            dialogClass={styles.pageObjectiveAndDescriptionModalStyles}
            onCloseModal={onCloseModal}
         >
            <ObjectAndDescriptionContainer
               shouldDisableActions={shouldDisableActions}
            >
               <ObjectiveTitle>
                  {t('workbookManagement:homeScreen.objective')}
               </ObjectiveTitle>
               <ObjectiveAndDescriptionText
                  onClick={onClickObjective}
                  isEmpty={isEmpty(objective)}
               >
                  {this.getObjective()}
               </ObjectiveAndDescriptionText>
               <DescriptionTitle>
                  {t('workbookManagement:homeScreen.description')}
               </DescriptionTitle>
               <ObjectiveAndDescriptionText
                  onClick={onClickDescription}
                  isEmpty={isEmpty(description)}
                  as='p'
               >
                  {parser(this.getDescription())}
               </ObjectiveAndDescriptionText>
            </ObjectAndDescriptionContainer>
         </BaseModalContainer>
      )
   }
}

export default withTranslation()(PageObjectiveAndDescriptionModal)
