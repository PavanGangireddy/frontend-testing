import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import { itemsViewOptions, home } from '../../constants/UIConstants'

import WorkbooksAndFolders from './WorkbooksAndFolders'

const folders = [
   {
      id: '1',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '2',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '3',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '4',
      name: 'Drilldown Blue Team Assignments',
      isStarred: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '5',
      name: 'Drilldown Blue Team Assignments',
      isStarred: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '6',
      name: 'Drilldown Blue Team Assignments',
      isStarred: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '7',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '8',
      name: 'Drilldown Blue Team Assignments',
      isStarred: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '9',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '10',
      name: 'Drilldown Blue Team Assignments',
      isStarred: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '11',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '12',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '13',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   },
   {
      id: '14',
      name: 'Drilldown Blue Team Assignments',
      isStarred: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true,
      type: 'NORMAL'
   }
]

const workbooks = [
   {
      id: '1',
      name: 'Drilldown Blue Team Assignments',
      isPinned: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '2',
      name: 'Drilldown Blue Team Assignments',
      isPinned: true,
      lastModified: '27-06-2020',
      isPublishedByUs: false
   },
   {
      id: '3',
      name: 'Drilldown Blue Team Assignments',
      isPinned: true,
      lastModified: '27-06-2020',
      isPublishedByUs: false
   },
   {
      id: '4',
      name: 'Drilldown Blue Team Assignments',
      isPinned: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '5',
      name: 'Drilldown Blue Team Assignments',
      isPinned: false,
      lastModified: '27-06-2020',
      isPublishedByUs: false
   },
   {
      id: '6',
      name: 'Drilldown Blue Team Assignments',
      isPinned: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '7',
      name: 'Drilldown Blue Team Assignments',
      isPinned: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '8',
      name: 'Drilldown Blue Team Assignments',
      isPinned: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '9',
      name: 'Drilldown Blue Team Assignments',
      isPinned: true,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   },
   {
      id: '10',
      name: 'Drilldown Blue Team Assignments',
      isPinned: false,
      lastModified: '27-06-2020',
      isPublishedByUs: true
   }
]

const Container = styled.div`
   ${tw`
      p-10px
   `}
`

const SubContainer = styled.div`
   ${tw`
      w-full
   `}
`

const onDoubleClickWorkbook = (workbookId: string): void => {}

const onDoubleClickFolder = (folderId: string): void => {}

storiesOf('WorkbookManagement/WorkbooksAndFolders', module)
   .add('Grid View', () => (
      <Container>
         <SubContainer>
            <WorkbooksAndFolders
               itemsView={itemsViewOptions.GRID}
               workbooks={[]}
               folders={folders}
               onDoubleClickWorkbook={onDoubleClickWorkbook}
               onDoubleClickFolder={onDoubleClickFolder}
               onClickFolderMenuItem={() => {}}
               onClickWorkbookMenuItem={() => {}}
               isSharedWithMe={false}
               currentRoute={home}
            />
         </SubContainer>
      </Container>
   ))
   .add('List View', () => (
      <Container>
         <SubContainer>
            <WorkbooksAndFolders
               itemsView={itemsViewOptions.LIST}
               workbooks={workbooks}
               folders={folders}
               onDoubleClickWorkbook={onDoubleClickWorkbook}
               onDoubleClickFolder={onDoubleClickFolder}
               onClickFolderMenuItem={() => {}}
               onClickWorkbookMenuItem={() => {}}
               isSharedWithMe={false}
               currentRoute={home}
            />
         </SubContainer>
      </Container>
   ))
