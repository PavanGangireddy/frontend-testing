import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import tw, { styled } from 'twin.macro'

import workbookChildDetails from '../../../WorkbookManagement/fixtures/getWorkbookChildDetailsAPIResponse.json'
import WorkbookChildDetailsModel from '../../../WorkbookManagement/stores/models/WorkbookChildDetailsModel'

import { LIST, SECTION, CARD } from '../../constants/UIConstants'

import MoveWorkbookChild from './MoveWorkbookChild'

export const Container = styled.div`
   ${tw`
      px-16px w-530px h-530px
   `}
`

const workbookChildDetailsModel = new WorkbookChildDetailsModel(
   workbookChildDetails
)

storiesOf('MoveWorkbookChild', module)
   .add('Workbook Merge Cards', () => (
      <Container>
         <MoveWorkbookChild
            workbookTitle={'iB Studio Trainees'}
            workbookChildDetails={workbookChildDetailsModel}
            isMergingCards={true}
            onClickBackButton={action('Clicked back button')}
            onClickMergeButton={action('Merge button clicked')}
            workbookId={'1'}
         />
      </Container>
   ))
   .add('Move Workbook List', () => (
      <Container>
         <MoveWorkbookChild
            workbookTitle={'iB Studio Trainees'}
            workbookChildDetails={workbookChildDetailsModel}
            isMergingCards={false}
            moveSourceType={LIST}
            onClickBackButton={action('Clicked back button')}
            onClickMoveHereButton={action('Move button clicked')}
            onClickCancelButton={action('Cancel button clicked')}
            workbookId={'1'}
         />
      </Container>
   ))
   .add('Move Workbook Section', () => (
      <Container>
         <MoveWorkbookChild
            workbookTitle={'iB Studio Trainees'}
            workbookChildDetails={workbookChildDetailsModel}
            isMergingCards={false}
            moveSourceType={SECTION}
            onClickBackButton={action('Clicked back button')}
            onClickMoveHereButton={action('Move button clicked')}
            onClickCancelButton={action('Cancel button clicked')}
            workbookId={'1'}
         />
      </Container>
   ))
   .add('Move Workbook Card', () => (
      <Container>
         <MoveWorkbookChild
            workbookTitle={'iB Studio Trainees'}
            workbookChildDetails={workbookChildDetailsModel}
            isMergingCards={false}
            moveSourceType={CARD}
            onClickBackButton={action('Clicked back button')}
            onClickMoveHereButton={action('Move button clicked')}
            onClickCancelButton={action('Cancel button clicked')}
            workbookId={'1'}
         />
      </Container>
   ))
