import React, { Component, ReactElement, ReactNode } from 'react'
import tw, { styled } from 'twin.macro'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import WorkbookIcon from '../../icons/WorkbookIcon'

import MobileBottomDeleteDrawer from './MobileBottomCustomDrawer'

const Container = styled.div`
   ${tw`w-full h-screen bg-white`}
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
   title: 'Overlays/Drawers/MobileBottomDeleteDrawer',
   decorators: [withKnobs]
}

class MobileBottomDeleteDrawerStory extends Component {
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
            <MobileBottomDeleteDrawer
               isVisible={isVisible}
               headerContent={this.renderHeaderContent()}
               closeDrawer={this.closeDrawer}
               type={'Workbook'}
               onClickDeleteButton={action('Delete Button Clicked')}
            />
         </Container>
      )
   }
}

export const deleteDrawer = (): ReactElement => (
   <MobileBottomDeleteDrawerStory />
)
