import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import getWorkbookChildDetailsResponse from '../../fixtures/getWorkbookChildDetailsAPIResponse.json'
import getWorkBookDetails from '../../fixtures/getWorkbookDetailsAPIResponse.json'
import CardModel from '../../stores/models/CardModel'
import CardService from '../../services/CardService/index.fixture'
import WorkbookChildDetailsModel from '../../stores/models/WorkbookChildDetailsModel'
import WorkbookModel from '../../stores/models/WorkbookModel'

import SectionCard from './SectionCard'

const Div = styled.div`
   ${tw`
      flex flex-wrap
   `}
`
const cardDetails = {
   card_id: 'card',
   card_title: 'rgukt',
   has_attachments: false,
   has_notes: false,
   priority: 1,
   label: '#ffffff'
}

const workbookChildDetails = new WorkbookChildDetailsModel(
   getWorkbookChildDetailsResponse
)

const workbookDetails = new WorkbookModel(getWorkBookDetails)

const cardService = new CardService()
const cardModel = new CardModel(cardDetails, null, cardService)
storiesOf('WorkbookManagement/Workbook/SectionCard', module)
   .add('Section Card With Notes and Attachments Icons', () => (
      <Div>
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={true}
            hasNotes={true}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
      </Div>
   ))
   .add('Section Card With Notes Icon', () => (
      <Div>
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting'}
            hasAttachments={false}
            hasNotes={true}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
      </Div>
   ))
   .add('Section Card With Attachments Icon', () => (
      <Div>
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting'}
            hasAttachments={true}
            hasNotes={false}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
      </Div>
   ))
   .add('Section Card With No Icons', () => (
      <Div>
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting'}
            hasAttachments={false}
            hasNotes={false}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
      </Div>
   ))
   .add('Section Card Multiple Cards', () => (
      <Div>
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={true}
            hasNotes={false}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={true}
            hasNotes={true}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={false}
            hasNotes={true}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={true}
            hasNotes={true}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
         <SectionCard
            id={'1'}
            cardName={'Discussion during next meeting on next'}
            hasAttachments={false}
            hasNotes={false}
            card={cardModel}
            onToggleCardSelection={() => {}}
            moveCardAPI={() => alert('section moved')}
            moveCardAPIStatus={200}
            moveCardAPIError={'error'}
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
            deleteCardAPI={() => {}}
            deleteCardAPIStatus={200}
            deleteCardAPIError={null}
            moveCard={(): void => {}}
            clearMoveWorkbooksAndFolders={(): void => {}}
            clearWorkbookChildDetails={(): void => {}}
         />
      </Div>
   ))
