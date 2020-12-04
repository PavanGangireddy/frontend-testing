import React, { Component, ReactElement } from 'react'
import tw, { styled } from 'twin.macro'
import { withKnobs } from '@storybook/addon-knobs'

import { Typo14SteelHKGroteskRegular } from '../../styleGuide/Typos'

import BottomDrawer from './BottomDrawer'

const Container = styled.div`
   ${tw`w-full h-screen bg-white`}
`

const ListMenuContainer = styled.div`
   ${tw`p-8px bg-white flex flex-col rounded-4px min-w-228px mb-12px`}
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`leading-1.71 py-8px px-16px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24`}
`

export default {
   title: 'Overlays/Drawers/BottomDrawer',
   decorators: [withKnobs]
}

class BottomDrawerStory extends Component {
   state = { isVisible: false }

   closeDrawer = (): void => {
      this.setState({ isVisible: false })
   }

   openDrawer = (): void => {
      this.setState({ isVisible: true })
   }

   render(): ReactElement {
      const { isVisible } = this.state
      return (
         <Container>
            <button onClick={this.openDrawer}>Open</button>
            <BottomDrawer
               isVisible={isVisible}
               closeDrawer={this.closeDrawer}
               overlayBackgroundColor={'crimson'}
            >
               <ListMenuContainer>
                  <ListMenuItem as='div'>Move</ListMenuItem>
                  <ListMenuItem as='div'>Delete</ListMenuItem>
               </ListMenuContainer>
            </BottomDrawer>
         </Container>
      )
   }
}

export const bottomDrawer = (): ReactElement => <BottomDrawerStory />
