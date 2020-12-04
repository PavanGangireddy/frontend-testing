import React, { Component } from 'react'
import ArrowLeftIcon from '../../../../../Common/icons/ArrowLeftIcon'
import MobileNavBar from '../../../../../Common/components/MobileNavBar'
import Button from '../../../../../Common/components/Button'
import {
   LeftEnhancerContainer,
   RightEnhancerContainer,
   NavBarTitleInMergeCard,
   NavbarBody,
   NextButton,
   navBarCss
} from './styledComponents'

interface MobileMergeNavBarProps {
   onClickBackIcon: () => void
   onClickNextButton: () => void
   nextBtnIsDisabled: boolean
}
class MobileMergeNavBar extends Component<MobileMergeNavBarProps> {
   renderLeftEnhancer = () => {
      const { onClickBackIcon } = this.props
      return (
         <LeftEnhancerContainer>
            <ArrowLeftIcon
               width={24}
               height={24}
               fill={'#ffffff'}
               onClick={onClickBackIcon}
            />
            <NavBarTitleInMergeCard>Merge cards</NavBarTitleInMergeCard>
         </LeftEnhancerContainer>
      )
   }
   renderRightEnhancer = () => {
      const { onClickNextButton, nextBtnIsDisabled } = this.props
      return (
         <RightEnhancerContainer>
            <NextButton
               variant={Button.variants.secondary}
               onClick={onClickNextButton}
               id='mergeCardsNextButton'
               disabled={nextBtnIsDisabled}
            >
               Next
            </NextButton>
         </RightEnhancerContainer>
      )
   }
   renderBody = () => <NavbarBody></NavbarBody>
   render() {
      return (
         <MobileNavBar
            renderLeftEnhancer={this.renderLeftEnhancer()}
            renderBody={this.renderBody}
            renderRightEnhancer={this.renderRightEnhancer()}
            NavBarStyle={navBarCss}
         />
      )
   }
}

export default MobileMergeNavBar
