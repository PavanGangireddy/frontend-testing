import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'
import { Draggable } from 'react-beautiful-dnd'

import getWorkbookDetailsAPIResponse from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import getWorkBookDetails from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import CardModel from '../../stores/models/CardModel'
import SectionModel from '../../stores/models/SectionModel'
import CardService from '../../services/CardService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel/index'
import WorkbookModel from '../../stores/models/WorkbookModel/index'

import ListSection from './ListSection'

const Div = styled.div``

const {
   page: { lists: activePageListsData }
} = getWorkbookDetailsAPIResponse
const { sections } = activePageListsData[0]
const { cards: cardsData } = sections[0]

const cardService = new CardService()
const sectionService = new SectionService()
const cardModels = cardsData.map(card => new CardModel(card, null, cardService))
const sectionModel = new SectionModel(sections[0], sectionService, cardService)

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkBookDetails)

storiesOf('WorkbookManagement/Workbook/ListSection', module).add(
   'ListSection',
   () => (
      <Div>
         <ListSection
            section={sectionModel}
            id={'1'}
            sectionName={'Section Priority Lock'}
            cards={cardModels}
            isFirstSection={true}
            draggableProvided={Draggable.arguments}
            onToggleCardSelection={() => {}}
            onDeleteSection={() => alert('section deleted')}
            moveSectionAPI={() => alert('section moved')}
            moveSectionAPIStatus={200}
            moveSectionAPIError={'error'}
            setMaxWidth={() => {}}
            getWorkbookChildDetailsAPI={() => {}}
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
            deleteSectionAPIStatus={200}
         />
      </Div>
   )
)
