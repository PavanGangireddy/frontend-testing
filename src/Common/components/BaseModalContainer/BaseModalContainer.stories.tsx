import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'

import Colors from '../../themes/Colors'

import BaseModalContainer from '.'

const Children = styled.div`
   width: 300px;
   height: 300px;
   background-color: ${Colors.white};
`

const Container = styled.div`
   width: 100%;
   height: 100vh;
   background-color: ${Colors.pinkishOrange};
`

function openModal(ref): void {
   ref.current.openModal()
}

storiesOf('Overlays/BaseModalContainer', module).add('UI', () => {
   const modalRef = React.createRef<BaseModalContainer>()

   return (
      <>
         <BaseModalContainer ref={modalRef}>
            <Children />
         </BaseModalContainer>
         <Container>
            <button onClick={() => openModal(modalRef)}>click me</button>
         </Container>
      </>
   )
})
