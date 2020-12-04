import React from 'react'
import { storiesOf } from '@storybook/react'

import WorkbookStore from '../../stores/WorkbookStore'
import WorkbookService from '../../services/WorkbookService/index.fixture'
import PageService from '../../services/PageService/index.fixture'
import ListService from '../../services/ListService/index.fixture'
import SectionService from '../../services/SectionService/index.fixture'
import CardService from '../../services/CardService/index.fixture'
import EvaluationWorkbookService from '../../services/Evaluation/WorkbookService/index.fixture'
import EvaluationPageService from '../../services/Evaluation/PageService/index.fixture'

import WorkbookSideNavBar from '.'

const workbookService = new WorkbookService()
const pageService = new PageService()
const listService = new ListService()
const sectionService = new SectionService()
const cardService = new CardService()
const evaluationWorkbookService = new EvaluationWorkbookService()
const evaluationPageService = new EvaluationPageService()
const workbookStore = new WorkbookStore(
   workbookService,
   pageService,
   listService,
   sectionService,
   cardService,
   evaluationWorkbookService,
   evaluationPageService
)

storiesOf('Surfaces/WorkbookSideNavBar', module).add(
   'Sidebar with icons',
   () => (
      <WorkbookSideNavBar
         workbookStore={workbookStore}
         goToHome={() => {}}
         goToAssignments={(): void => {}}
         goToLearnings={(): void => {}}
         goToSharedWithMe={(): void => {}}
         goToPublishDashboard={(): void => {}}
         userDetails={null}
         goToPersonalProjects={() => {}}
         goBackToPreviousRoute={() => {}}
         userName={'user'}
      />
   )
)
