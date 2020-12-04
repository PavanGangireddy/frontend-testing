import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import ArrowLeftIcon from '../../icons/ArrowLeftIcon'
import MoreIcon from '../../icons/MoreIcon'
import { Typo18WhiteHKGroteskRegular } from '../../styleGuide/Typos'

import MobileNavBar from '.'

const LeftEnhancerContainer = styled.div`
   ${tw`w-12 h-full flex justify-center items-center`}
`

const RightEnhancerContainer = styled.div`
   ${tw`w-20 h-full flex justify-center items-center`}
`

const MainContentContainer = styled.div`
   ${tw`flex flex-1 h-full items-center justify-center`}
`

const NavBarTitle = styled(Typo18WhiteHKGroteskRegular)``

function renderLeftEnhancer(): ReactElement {
   return (
      <LeftEnhancerContainer>
         <ArrowLeftIcon width={24} height={24} fill={'#ffffff'} />
      </LeftEnhancerContainer>
   )
}

function renderBody(): ReactElement {
   return (
      <MainContentContainer>
         <NavBarTitle>Mobile Nav Bar View</NavBarTitle>
      </MainContentContainer>
   )
}

function renderRightEnhancer(): ReactElement {
   return (
      <RightEnhancerContainer>
         <MoreIcon width={24} height={24} fillColor={'#ffffff'} />
      </RightEnhancerContainer>
   )
}

storiesOf('MobileNavBar', module).add('defaultView', () => (
   <MobileNavBar
      renderLeftEnhancer={renderLeftEnhancer()}
      renderBody={renderBody}
      renderRightEnhancer={renderRightEnhancer()}
   />
))
