import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import PageFixture from '../../services/PageService/index.fixture'
import EvaluationPageFixture from '../../services/Evaluation/PageService/index.fixture'
import BaseModel from '../../stores/models/BaseModel'
import PageModel from '../../stores/models/PageModel'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'

import WorkbookComponent from './WorkbookComponent'

const Div = styled.div`
   ${tw`
        box-border
    `}
`

const { page: activePageDetails } = getWorkbookDetailsAPIResponse
const activePageWithZeroLists = { ...activePageDetails }
activePageWithZeroLists.lists = []
const { total_pages: totalPagesData } = getWorkbookDetailsAPIResponse

const pageService = new PageFixture()
const listService = new ListService()
const sectionService = new SectionService()
const cardService = new CardService()
const evaluationPageService = new EvaluationPageFixture()
const activePageModel = new PageModel(
   activePageDetails,
   pageService,
   listService,
   sectionService,
   cardService,
   evaluationPageService
)

const activePageWithZeroListsModel = new PageModel(
   activePageWithZeroLists,
   pageService,
   listService,
   sectionService,
   cardService,
   evaluationPageService
)

const totalPages = totalPagesData.map(page => {
   const { page_id: id, page_name: name } = page
   return new BaseModel({ id, name })
})

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkbookDetailsAPIResponse)

storiesOf('WorkbookManagement/Workbook', module)
   .add('WorkbookComponent', () => (
      <Div>
         <WorkbookComponent
            id={'1'}
            totalPages={totalPages}
            activePageDetails={activePageModel}
            updatePageObjectiveWithDescriptionAPI={() => {}}
            getWorkbookDetails={() => {}}
            mergeCardsAPI={() => {}}
            mergeCardsAPIStatus={200}
            mergeCardsAPIError={null}
            getWorkbookChildDetailsAPI={() => {}}
            getWorkbookChildDetailsAPIStatus={200}
            getWorkbookChildDetailsAPIError={null}
            getMoveWorkbooksAndFoldersAPI={() => {}}
            getMoveWorkbooksAndFoldersStatus={200}
            getMoveWorkbooksAndFoldersError={null}
            moveActiveFolderInfo={[]}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            getRootFolderDetailsAPIError={null}
            rootFolderId={''}
            workbookDetails={workbookDetails}
            createPageAPI={(): void => {}}
            getPageDetails={(): void => {}}
            getPageDetailsAPIStatus={200}
            getPageDetailsAPIError={null}
            createPageAPIStatus={200}
            reorderPageAPI={(): void => {}}
            reorderPage={(): void => {}}
            movePageAPI={(): void => {}}
            movePageAPIStatus={200}
            movePageAPIError={null}
            createPageAPIError={null}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updatePageName={(): void => {}}
            clearStore={(): void => {}}
            updatePageObjectiveWithDescriptionAPIStatus={200}
         />
      </Div>
   ))
   .add('WorkbookComponent Empty Workbook', () => (
      <Div>
         <WorkbookComponent
            id={'1'}
            totalPages={[]}
            activePageDetails={null}
            updatePageObjectiveWithDescriptionAPI={() => {}}
            getWorkbookDetails={() => {}}
            mergeCardsAPI={() => {}}
            mergeCardsAPIStatus={200}
            mergeCardsAPIError={null}
            getWorkbookChildDetailsAPI={() => {}}
            getWorkbookChildDetailsAPIStatus={200}
            getWorkbookChildDetailsAPIError={null}
            getMoveWorkbooksAndFoldersAPI={() => {}}
            getMoveWorkbooksAndFoldersStatus={200}
            getMoveWorkbooksAndFoldersError={null}
            moveActiveFolderInfo={[]}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            getRootFolderDetailsAPIError={null}
            rootFolderId={''}
            workbookDetails={workbookDetails}
            createPageAPI={(): void => {}}
            getPageDetails={(): void => {}}
            getPageDetailsAPIStatus={200}
            getPageDetailsAPIError={null}
            createPageAPIStatus={200}
            reorderPageAPI={(): void => {}}
            reorderPage={(): void => {}}
            movePageAPI={(): void => {}}
            movePageAPIStatus={200}
            movePageAPIError={null}
            createPageAPIError={null}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updatePageName={(): void => {}}
            clearStore={(): void => {}}
            updatePageObjectiveWithDescriptionAPIStatus={200}
         />
      </Div>
   ))
   .add('WorkbookComponent Empty Page', () => (
      <Div>
         <WorkbookComponent
            id={'1'}
            totalPages={[totalPages[0]]}
            activePageDetails={activePageWithZeroListsModel}
            updatePageObjectiveWithDescriptionAPI={() => {}}
            getWorkbookDetails={() => {}}
            mergeCardsAPI={() => {}}
            mergeCardsAPIStatus={200}
            mergeCardsAPIError={null}
            getWorkbookChildDetailsAPI={() => {}}
            getWorkbookChildDetailsAPIStatus={200}
            getWorkbookChildDetailsAPIError={null}
            getMoveWorkbooksAndFoldersAPI={() => {}}
            getMoveWorkbooksAndFoldersStatus={200}
            getMoveWorkbooksAndFoldersError={null}
            moveActiveFolderInfo={[]}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            getRootFolderDetailsAPIError={null}
            rootFolderId={''}
            workbookDetails={workbookDetails}
            createPageAPI={(): void => {}}
            getPageDetails={(): void => {}}
            getPageDetailsAPIStatus={200}
            getPageDetailsAPIError={null}
            createPageAPIStatus={200}
            reorderPageAPI={(): void => {}}
            reorderPage={(): void => {}}
            movePageAPI={(): void => {}}
            movePageAPIStatus={200}
            movePageAPIError={null}
            createPageAPIError={null}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            updatePageName={(): void => {}}
            clearStore={(): void => {}}
            updatePageObjectiveWithDescriptionAPIStatus={200}
         />
      </Div>
   ))
