/**
 * @flow
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Colors from '../../themes/Colors'
import BaseModalContainer from '../BaseModalContainer'
import CustomPopUp from '.'

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

storiesOf('Overlays/CustomPopUp Samples', module).add(
   'CustomPopUp Default',
   () => {
      const captureModalRef = React.createRef<BaseModalContainer>()

      return (
         <>
            <Container>
               <button type='button' onClick={() => openModal(captureModalRef)}>
                  Open
               </button>
            </Container>
            <CustomPopUp
               ref={captureModalRef}
               onCancel={() => closeModal(captureModalRef)}
               onConfirm={() => closeModal(captureModalRef)}
               actionType='DELETE'
               description='Are you sure you want to perform this action?'
            />
         </>
      )
   }
)
