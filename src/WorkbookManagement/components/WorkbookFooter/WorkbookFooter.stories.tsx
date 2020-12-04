import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'

import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import BaseModel from '../../stores/models/BaseModel'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'

import WorkbookFooter from './WorkbookFooter'

const Div = styled.div``

const { total_pages: totalPages } = getWorkbookDetailsAPIResponse

const pages = totalPages.map(page => {
   const { page_id: id, page_name: name } = page
   return new BaseModel({ id, name })
})

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

storiesOf('WorkbookManagement/Workbook', module).add('Workbook Footer', () => (
   <Div>
      <WorkbookFooter
         pages={pages}
         activePageId={'1'}
         updatePageNameAPI={(): void => {}}
         createPageAPI={(): void => {}}
         createPageAPIError={null}
         onClickPage={(): void => {}}
         createPageAPIStatus={200}
         onDragEnd={(): void => {}}
         isMergingCards={false}
         movePageAPI={(): void => {}}
         movePageAPIStatus={200}
         movePageAPIError={null}
         rootFolderId={'1'}
         getRootFolderDetailsAPI={(): void => {}}
         getRootFolderDetailsAPIStatus={200}
         getRootFolderDetailsAPIError={null}
         getWorkbooksAndFoldersAPI={(): void => {}}
         getWorkbooksAndFoldersStatus={200}
         getWorkbooksAndFoldersError={null}
         activeFolderInfo={{}}
         getWorkbookChildDetailsAPI={(): void => {}}
         getWorkbookChildDetailsAPIStatus={200}
         getWorkbookChildDetailsAPIError={null}
         workbookChildDetails={workbookChildDetails}
         getWorkbookDetails={(): void => {}}
         workbookId={'1'}
         clearMoveWorkbooksAndFolders={(): void => {}}
         getPageDetails={(): void => {}}
         updatePageName={(): void => {}}
      />
   </Div>
))
