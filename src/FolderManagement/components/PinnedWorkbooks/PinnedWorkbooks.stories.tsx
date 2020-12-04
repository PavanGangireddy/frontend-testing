import React, { ReactElement, ReactNode } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../../Common/styleGuide/Typos'

import PinnedWorkbooks from '.'

const listMenuData = ['Add list on right', 'Add list on left', 'Move list']

const ListMenuContainer = styled.div`
   ${tw`min-w-228px p-8px bg-white flex flex-col shadow rounded `}
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`py-8px px-16px cursor-pointer tracking-normal leading-relaxed
   hover:text-darkBlueGrey hover:bg-lightBlueGrey24	`}
`
const PinnedWorkbooksData = [
   {
      name: 'blue',
      id: '0',
      isPublishedByUs: true
   },
   {
      name: 'green',
      id: '1',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '2',
      isPublishedByUs: false
   },
   {
      name: 'blue',
      id: '3',
      isPublishedByUs: true
   },
   {
      name: 'blue',
      id: '4',
      isPublishedByUs: false
   }
]

const onDoubleClickWorkbook = workbookId => {}

storiesOf('WorkbookManagement/PinnedWorkbooks', module).add(
   'PinnedWorkbooks',
   () => (
      <PinnedWorkbooks
         pinnedWorkbooks={PinnedWorkbooksData}
         onDoubleClickWorkbook={onDoubleClickWorkbook}
         onClickWorkbookMenuItem={() => {}}
      />
   )
)
