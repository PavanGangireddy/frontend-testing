import React, { Component, ReactElement } from 'react'
import tw, { styled } from 'twin.macro'
import { withKnobs } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import BaseModel from '../../stores/models/BaseModel'

import MobilePagesList from './MobilePagesList'

const Container = styled.div`
   ${tw`w-full h-screen bg-white`}
`

const { total_pages: totalPages } = getWorkbookDetailsAPIResponse

const pages = totalPages.map(page => {
   const { page_id: id, page_name: name } = page
   return new BaseModel({ id, name })
})

export default {
   title: 'Mobile Design/PageList',
   decorators: [withKnobs]
}

class MobilePageListStory extends Component {
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
            <MobilePagesList
               isVisible={isVisible}
               closeDrawer={this.closeDrawer}
               onClickAddPage={action('Add Page Button Clicked')}
               onClickPage={action('Page Clicked')}
               pages={pages}
               createPageAPIStatus={200}
               shouldDisableActions={false}
               activePageId={'4123'}
            />
         </Container>
      )
   }
}

export const pageList = (): ReactElement => <MobilePageListStory />
