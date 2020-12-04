import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Colors from '../../themes/Colors'

import BaseModalContainer from '../BaseModalContainer'

import ConfirmAlertComponent from '.'

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background-color: ${Colors.blueyGrey};
`

function openModal(ref) {
   ref.current.openModal()
}

function closeModal(ref) {
   ref.current.closeModal()
}

storiesOf('Overlays/ConfirmAlertComponent', module).add('UI', () => {
   const modalRef = React.createRef<BaseModalContainer>()

   return (
      <>
         <BaseModalContainer ref={modalRef}>
            <ConfirmAlertComponent
               onConfirm={() => closeModal(modalRef)}
               onClose={() => closeModal(modalRef)}
               onCancel={() => closeModal(modalRef)}
               message={'Please Confirm?'}
            />
         </BaseModalContainer>
         <Container>
            <button onClick={() => openModal(modalRef)}>click me</button>
         </Container>
      </>
   )
})
