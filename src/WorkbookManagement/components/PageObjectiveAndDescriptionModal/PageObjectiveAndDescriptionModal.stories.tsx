import React from 'react'
import { storiesOf } from '@storybook/react'
import { styled } from 'twin.macro'
import { action } from '@storybook/addon-actions'

import BaseModalContainer from '../../../Common/components/BaseModalContainer'

import PageObjectiveAndDescriptionModal from './PageObjectiveAndDescriptionModal'

const Container = styled.div``

const modalRef = React.createRef<BaseModalContainer>()

function openModal(): void {
   modalRef.current?.openModal()
}

const objective =
   "objective text of the printing and typesetting industry.Lorem Ipsum has been the industry's standard."
const description =
   "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been. the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been.Lorem Ipsum has been. the industry's standard dummy text ever since the 1500s, Lorem Ipsum has been. "

storiesOf('Mobile Design', module).add(
   'Page Objective and Description Component',
   () => (
      <>
         <PageObjectiveAndDescriptionModal
            innerRef={modalRef}
            objective={objective}
            description={description}
            onClickObjective={action('Objective text is clicked')}
            onClickDescription={action('Description text is clicked')}
            onCloseModal={(): void => {}}
            shouldDisableActions={false}
         />
         <Container>
            <button onClick={(): void => openModal()}>Click me</button>
         </Container>
      </>
   )
)
