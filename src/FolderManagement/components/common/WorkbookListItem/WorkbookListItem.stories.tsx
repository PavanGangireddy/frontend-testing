import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../../../Common/styleGuide/Typos'

import WorkbookListItem from './WorkbookListItem'

const ListMenuContainer = styled.div`
   ${tw`
      flex flex-col rounded shadow p-8px bg-white min-w-200px
   `}
`

const ListMenuItem = styled(Typo14SteelHKGroteskRegular)`
   ${tw`
      px-8px py-14px cursor-pointer hover:text-brightBlue hover:bg-brightBlue10
   `}
`

const listMenuData = ['Add list on right', 'Add list on left', 'Move list']

const onDoubleClickWorkbook = workbookId => {}

export function listMenuItems(): ReactElement {
   return (
      <ListMenuContainer>
         {listMenuData.map(item => (
            <ListMenuItem
               key={item}
               as='div'
               onClick={event => {
                  event.stopPropagation()
               }}
            >
               {item}
            </ListMenuItem>
         ))}
      </ListMenuContainer>
   )
}

storiesOf('WorkbookManagement/Common', module).add('Workbook List Item', () => (
   <WorkbookListItem
      id={'1'}
      name={'Drilldown Blue Team Assignments'}
      isPinned={true}
      lastModified={'27-06-2020'}
      menuContainer={listMenuItems()}
      onDoubleClickWorkbook={onDoubleClickWorkbook}
   />
))
