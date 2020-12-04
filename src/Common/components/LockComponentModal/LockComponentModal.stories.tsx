/**
 * @flow
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Colors from '../../themes/Colors'
import BaseModalContainer from '../BaseModalContainer'
import LockComponentModal from '.'

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

storiesOf('Overlays/Lock-Modal', module).add('Default lock modal', () => {
   const captureModalRef = React.createRef<BaseModalContainer>()

   return (
      <>
         <Container>
            <button type='button' onClick={() => openModal(captureModalRef)}>
               Open
            </button>
         </Container>
         <LockComponentModal
            ref={captureModalRef}
            onDismiss={() => closeModal(captureModalRef)}
            onConfirm={() => closeModal(captureModalRef)}
            actionType='DISMISS'
            description='This feature will be available to you on learning 100 learning points'
         />
      </>
   )
})
