import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'

import PageHeader from './PageHeader'

const Div = styled.div``

storiesOf('WorkbookManagement/Workbook', module).add('PageHeader', () => (
   <Div>
      <PageHeader
         pageObjective={
            'Hiring the right candidates (with right skills & culture fit) whenever there is a requirement of human resources.Hiring the right candidates (with right skills & culture fit) whenever there is a requirement of human resources.'
         }
         pageDescription={'Hr department requirement'}
         updatePageObjectiveWithDescriptionAPI={() => {}}
         isMergeActive={false}
         pageId={'1'}
         submitAssignmentAPI={(): void => {}}
         submitAssignmentAPIStatus={200}
         submitAssignmentAPIError={null}
         onSuccessSubmitAssignment={(): void => {}}
         onClickViewResultsButton={(): void => {}}
         updatePageObjectiveWithDescriptionAPIStatus={200}
      />
   </Div>
))
