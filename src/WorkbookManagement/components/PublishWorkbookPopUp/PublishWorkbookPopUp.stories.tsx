import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'
import getUsersGroupsResponse from '../../../UserProfile/fixtures/getUsersGroupsResponse.json'
import UsersGroupModel from '../../../UserProfile/stores/models/UsersGroupModel'

import PublishWorkbookPopUpWrapper from '../PublishWorkbookPopUpWrapper'

const Container = styled.div``

const modalRef = React.createRef<BaseModalContainer>()

function openModal(): void {
   modalRef.current?.openModal()
}

function closeModal(): void {
   modalRef.current?.closeModal()
}

const userGroups = new Map()
const { groups } = getUsersGroupsResponse
groups.forEach(eachGroup => {
   userGroups.set(eachGroup.group_id, new UsersGroupModel(eachGroup))
})

storiesOf('Components/PublishWorkbookPopUp', module).add(
   'PublishWorkbookPopUp Component',
   () => (
      <>
         <PublishWorkbookPopUpWrapper
            innerRef={modalRef}
            onCancel={closeModal}
            getUsersGroupsAPI={() => {}}
            getUsersGroupAPIStatus={200}
            getUsersGroupAPIError={null}
            userGroups={userGroups}
            publishAssignmentWorkbookAPI={requestObject =>
               console.log('requestObject', requestObject)
            }
            publishAssignmentWorkbookAPIStatus={200}
         />
         <Container>
            <button onClick={() => openModal()}>click me</button>
         </Container>
      </>
   )
)
