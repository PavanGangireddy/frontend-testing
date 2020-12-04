import tw, { styled } from 'twin.macro'
import React, { Component } from 'react'
import { withKnobs } from '@storybook/addon-knobs'

import MobileSideNavBar from './MobileSideNavBar'

const Container = styled.div`
   ${tw`fixed`}
`

export default {
   title: 'Surfaces/mobileSideBar',
   decorators: [withKnobs]
}

class SideNavBar extends Component {
   mobileSideNavBarRef
   constructor(props) {
      super(props)
      this.mobileSideNavBarRef = React.createRef() //TODO:remove refs implement the functionality with callback
   }

   onClick = () => {
      this.mobileSideNavBarRef.current.onClickOpenMobileSideNavBar()
   }

   render() {
      return (
         <>
            <Container>
               <button type='button' onClick={this.onClick}>
                  Open
               </button>
            </Container>
            <MobileSideNavBar
               expandedHeaderView={<div>sdhfjsd</div>}
               expandedFooterView={<div>shdjfsdj</div>}
               status={200}
               error={null}
               retryFunction={() => {}}
               ref={this.mobileSideNavBarRef}
               shouldDisplayViewInChromeMessageBanner={false}
            />
         </>
      )
   }
}

export const MobileSideNavBarComponent = () => <SideNavBar />
