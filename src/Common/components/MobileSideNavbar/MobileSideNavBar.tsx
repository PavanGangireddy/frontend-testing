import React, { ReactNode, Component, ReactElement } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { APIStatus, API_SUCCESS } from '@ib/api-constants'

import LoadingWrapper from '../LoadingWrapper'
import FailureView from '../LoadingWrapper/FailureView'

import {
   SideBarContainer,
   SideBarSection,
   SideBarFooterSection,
   FailureViewCSS,
   containerCSS,
   Container,
   LoadingWrapperContainer
} from './styledComponents'

interface MobileSideNavBarProps {
   expandedHeaderView: React.ReactNode
   expandedFooterView: React.ReactNode
   status: APIStatus
   error: any
   retryFunction: () => void
   shouldDisplayViewInChromeMessageBanner: boolean
}

@observer
class MobileSideNavBar extends Component<MobileSideNavBarProps> {
   @observable isOpen!: boolean
   mobileSideNavBarRef

   constructor(props) {
      super(props)
      this.mobileSideNavBarRef = React.createRef()
   }

   staticDefaultProps = {
      status: API_SUCCESS,
      error: null,
      retryFunction: () => {}
   }
   renderHeaderView = (): ReactNode => {
      const { expandedHeaderView } = this.props
      return expandedHeaderView
   }

   renderFooterView = (): ReactNode => {
      const { expandedFooterView } = this.props
      return expandedFooterView
   }

   renderFailureView = (onRetry, failureText, showButton) => (
      <FailureView
         onRetry={onRetry}
         failureText={failureText}
         showButton={showButton}
         failureViewCSS={FailureViewCSS}
      />
   )
   onClickCloseMobileSideNavBar = e => {
      e.stopPropagation()
      this.isOpen = false
   }

   onClickOpenMobileSideNavBar = () => {
      this.isOpen = true
   }

   preventPropagation = e => {
      e.stopPropagation()
   }

   renderSuccessUI = observer((): ReactElement | null => {
      const { isOpen } = this
      const { shouldDisplayViewInChromeMessageBanner } = this.props

      return (
         <Container
            isOpen={isOpen}
            onClick={this.onClickCloseMobileSideNavBar}
            shouldDisplayViewInChromeMessageBanner={
               shouldDisplayViewInChromeMessageBanner
            }
         >
            <SideBarContainer
               isOpen={isOpen}
               onClick={this.preventPropagation}
               shouldDisplayViewInChromeMessageBanner={
                  shouldDisplayViewInChromeMessageBanner
               }
            >
               <SideBarSection>{this.renderHeaderView()}</SideBarSection>
               <SideBarFooterSection>
                  {this.renderFooterView()}
               </SideBarFooterSection>
            </SideBarContainer>
         </Container>
      )
   })

   render(): ReactNode {
      const {
         status,
         error,
         retryFunction,
         shouldDisplayViewInChromeMessageBanner
      } = this.props
      const { isOpen } = this
      return (
         <LoadingWrapperContainer
            isOpen={isOpen}
            shouldDisplayViewInChromeMessageBanner={
               shouldDisplayViewInChromeMessageBanner
            }
         >
            <LoadingWrapper
               apiStatus={status}
               apiError={error}
               onRetry={retryFunction}
               renderSuccessUI={this.renderSuccessUI}
               failureMessageTestId='failureMessage'
               retryButtonTestId='retryButton'
               loaderTestId='loader'
               renderFailureView={this.renderFailureView}
               containerClassName={containerCSS}
            />
         </LoadingWrapperContainer>
      )
   }
}

export default MobileSideNavBar
