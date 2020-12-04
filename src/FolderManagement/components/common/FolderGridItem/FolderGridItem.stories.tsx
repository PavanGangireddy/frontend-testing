import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { Typo14SteelHKGroteskRegular } from '../../../../Common/styleGuide/Typos'

import FolderGridItem from './FolderGridItem'

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

const onDoubleClickFolder = (folderId: string): void => {}

storiesOf('WorkbookManagement/Common/FolderGridItem', module)
   .add('Starred Folder Grid Item', () => (
      <FolderGridItem
         id={'1'}
         isStarred={true}
         name={
            'Drilldown green Team Assignments Drilldown green Team Assignments'
         }
         onDoubleClickFolder={onDoubleClickFolder}
         type='NORMAL'
         onClickFolderMenuItem={() => {}}
         currentRoute={'home'}
         isLocked={false}
         isPublishedByUs={true}
      />
   ))
   .add('Normal Folder Grid Item', () => (
      <FolderGridItem
         id={'1'}
         isStarred={false}
         name={'Drilldown on corona'}
         onDoubleClickFolder={onDoubleClickFolder}
         type='NORMAL'
         onClickFolderMenuItem={() => {}}
         currentRoute={'home'}
         isLocked={false}
         isPublishedByUs={false}
      />
   ))
