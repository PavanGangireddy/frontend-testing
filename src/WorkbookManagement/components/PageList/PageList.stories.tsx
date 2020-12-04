import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'
import { Draggable } from 'react-beautiful-dnd'

import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import getWorkBookDetails from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import SectionModel from '../../stores/models/SectionModel'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import ListModel from '../../stores/models/ListModel'
import ListService from '../../services/ListService/index.fixture'
import WorkbookModel from '../../stores/models/WorkbookModel'

import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import PageList from './PageList'

const Div = styled.div``

const {
   page: { lists: activePageListsData }
} = getWorkbookDetailsAPIResponse
const { sections: sectionsData } = activePageListsData[0]

const listService = new ListService()
const cardService = new CardService()
const sectionService = new SectionService()
const sectionModels = sectionsData.map(
   section => new SectionModel(section, sectionService, cardService)
)

const listModel = new ListModel(
   { list_id: '1', list_name: 'name', sections: [] },
   listService,
   sectionService,
   cardService
)

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkBookDetails)

storiesOf('WorkbookManagement/Workbook/PageList', module).add(
   'PageSection',
   () => (
      <Div>
         <PageList
            list={listModel}
            sections={sectionModels}
            onClickAddListButton={() => {}}
            draggableProvided={Draggable.arguments}
            onClickDeleteListButton={() => {}}
            onToggleCardSelection={() => {}}
            setMaxWidth={() => {}}
            getWorkbookChildDetailsAPI={() => {}}
            moveListAPI={() => {}}
            moveListAPIStatus={200}
            moveListAPIError={'error'}
            getWorkbookChildDetailsAPIStatus={200}
            // TODO: Need to update type
            getWorkbookChildDetailsAPIError={null}
            getWorkbooksAndFoldersAPI={() => {}}
            getWorkbooksAndFoldersStatus={200}
            // TODO: Need to update type
            getWorkbooksAndFoldersError={200}
            activeFolderInfo={''}
            workbookChildDetails={workbookChildDetails}
            getRootFolderDetailsAPI={() => {}}
            getRootFolderDetailsAPIStatus={200}
            // TODO: Need to update the type
            getRootFolderDetailsAPIError={null}
            rootFolderId={''}
            workbookDetails={workbookDetails}
            moveSection={(): void => {}}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
            onSuccessListOperation={(): void => {}}
            listContainerMaxHeight={500}
         />
      </Div>
   )
)
