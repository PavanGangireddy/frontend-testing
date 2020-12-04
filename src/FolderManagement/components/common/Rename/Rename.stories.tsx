import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import BaseModalContainer from '../../../../Common/components/BaseModalContainer'

import RenameComponent from '.'

const Container = styled.div`
   ${tw`w-full h-screen bg-darkBlueGrey`}
`

function openModal(ref): void {
   ref.current.openModal()
}

function closeModal(ref): void {
   ref.current.closeModal()
}

storiesOf('Overlays/RenameComponent', module).add('CustomPopUp Default', () => {
   const captureModalRef = React.createRef<BaseModalContainer>()

   return (
      <>
         <Container>
            <button type='button' onClick={() => openModal(captureModalRef)}>
               Open
            </button>
         </Container>
         <RenameComponent
            currentName='name'
            ref={captureModalRef}
            onCancel={() => closeModal(captureModalRef)}
            onConfirm={() => closeModal(captureModalRef)}
            renameAPIStatus={0}
            maxLength={30}
            isVisibleRenameDrawer={false}
            onClickCloseRenameDrawer={() => {}}
            renderHeaderContent={<div>sdfsd</div>}
         />
      </>
   )
})
