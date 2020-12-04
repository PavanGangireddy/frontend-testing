import React, { Component, Ref, ReactElement, ReactNode } from 'react'

import { isMobileDevice } from '../../utils/responsiveUtils'

import BaseModalContainer from '../BaseModalContainer'

import ChevronDown from '../../icons/ChevronDown'
import colors from '../../themes/Colors'
import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import CloseIcon from '../../icons/CloseIcon'

import MobileNavBar from '../MobileNavBar'

import {
   MoveResourceContainer,
   BodyContainer,
   NavBarLeftSection,
   TitleContainer,
   TitleText,
   navBarCss,
   MergeHeaderContainer
} from './styledComponents'
import styles from './styles.module.css'

interface MoveResourceProps {
   innerRef: Ref<BaseModalContainer>
   renderHeader: (onCancel: any) => any
   renderBody: (onCancel: any) => any
   onCancel: () => void
   goToList?: () => void
   shouldShowBody?: boolean
   shouldShowCloseIcon?: boolean
   type: string
}

class MoveResource extends Component<MoveResourceProps> {
   static defaultProps = {
      shouldShowBody: true,
      shouldShowCloseIcon: false,
      goToList: () => {}
   }
   renderNavBarLeftSection = (): ReactNode => {
      const { onCancel } = this.props
      return (
         <NavBarLeftSection onClick={onCancel}>
            <ArrowLeftIcon width={24} height={24} fill={colors.white} />
         </NavBarLeftSection>
      )
   }

   renderNavBarRightSection = (): ReactNode => {
      const { goToList, shouldShowCloseIcon } = this.props
      return (
         <>
            {shouldShowCloseIcon ? (
               <NavBarLeftSection onClick={goToList}>
                  <CloseIcon width={18} height={18} fill={colors.white} />
               </NavBarLeftSection>
            ) : null}
         </>
      )
   }

   renderDownOrUpArrowIcon = (): ReactNode => (
      <ChevronDown fill={colors.white} width={16} height={16} />
   )

   renderTitle = (): string => {
      const { type } = this.props
      if (type === 'Merge') {
         return 'Merge Cards'
      }
      return `Move ${type}`
   }

   renderNavBarBody = (): ReactElement => {
      const { shouldShowBody } = this.props
      return (
         <TitleContainer>
            {/* TODO: Need to update to i18next */}
            {shouldShowBody ? (
               <TitleText>{this.renderTitle()}</TitleText>
            ) : null}
         </TitleContainer>
      )
   }

   render() {
      const {
         renderHeader: RenderHeader,
         renderBody: RenderBody,
         innerRef,
         onCancel,
         type
      } = this.props
      const isMerging = type === 'Merge'
      return (
         <BaseModalContainer
            ref={innerRef}
            hideCloseIcon
            dialogClass={styles.moveModalPopUp}
            underlayColor={isMobileDevice ? colors.white : colors.black32}
         >
            <MoveResourceContainer>
               {isMobileDevice ? (
                  <>
                     <MobileNavBar
                        renderLeftEnhancer={this.renderNavBarLeftSection()}
                        renderBody={this.renderNavBarBody}
                        renderRightEnhancer={this.renderNavBarRightSection()}
                        NavBarCSS={navBarCss}
                     />
                     {isMerging ? (
                        <MergeHeaderContainer>
                           <RenderHeader />
                        </MergeHeaderContainer>
                     ) : null}
                  </>
               ) : (
                  <RenderHeader onCancel={onCancel} />
               )}
               <BodyContainer>
                  <RenderBody onCancel={onCancel} />
               </BodyContainer>
            </MoveResourceContainer>
         </BaseModalContainer>
      )
   }
}

export default React.forwardRef<BaseModalContainer, MoveResourceProps>(
   (props, captureModalRef) => (
      <MoveResource innerRef={captureModalRef} {...props} />
   )
)
