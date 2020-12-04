import React, { Component, ReactElement, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'
import { withKnobs } from '@storybook/addon-knobs'

import { Typo14SteelHKGroteskRegular } from '../../styleGuide/Typos'
import WorkbookIcon from '../../icons/WorkbookIcon'

import BottomDrawerWithHeader from './BottomDrawerWithHeader'

const Container = styled.div`
   ${tw`w-full h-screen bg-white`}
`

const ListMenuContainer = styled.div`
   ${tw`p-8px bg-white flex flex-col rounded-4px min-w-228px mb-12px`}
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`leading-1.71 py-8px px-16px cursor-pointer hover:text-darkBlueGrey hover:bg-lightBlueGrey24`}
`

const HeaderContainer = styled.div`
   ${tw`
        flex items-center
    `}
`

const HeaderTitle = styled.div`
   ${tw`
        ml-8px
    `}
`

export default {
   title: 'Overlays/Drawers/BottomDrawerWithHeader',
   decorators: [withKnobs]
}

class BottomDrawerWithHeaderStory extends Component {
   state = { isVisible: false }

   closeDrawer = (): void => {
      this.setState({ isVisible: false })
   }

   openDrawer = (): void => {
      this.setState({ isVisible: true })
   }

   renderHeaderContent = (): ReactNode => (
      <HeaderContainer>
         <WorkbookIcon />
         <HeaderTitle>Sample Workbook</HeaderTitle>
      </HeaderContainer>
   )

   render(): ReactElement {
      const { isVisible } = this.state
      return (
         <Container>
            <button onClick={this.openDrawer}>Open</button>
            <BottomDrawerWithHeader
               isVisible={isVisible}
               closeDrawer={this.closeDrawer}
               headerContent={this.renderHeaderContent()}
            >
               <ListMenuContainer>
                  <ListMenuItem as='div'>Move</ListMenuItem>
                  <ListMenuItem as='div'>Delete</ListMenuItem>
               </ListMenuContainer>
            </BottomDrawerWithHeader>
         </Container>
      )
   }
}

export const bottomDrawerWithHeader = (): ReactElement => (
   <BottomDrawerWithHeaderStory />
)
