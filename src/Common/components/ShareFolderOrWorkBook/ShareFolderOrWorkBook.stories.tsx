import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'
import { API_INITIAL } from '@ib/api-constants'

import BaseModalContainer from '../BaseModalContainer'

import ShareFolderOrWorkBook from '.'

const Container = styled.div`
   ${tw`w-full h-screen bg-blueyGrey`}
`

function openModal(ref) {
   ref.current.openModal()
}

function closeModal(ref) {
   ref.current.closeModal()
}

storiesOf('Forms/ShareFolderOrWorkBook', module).add('UI dropdown', () => {
   const captureModalRef = React.createRef<BaseModalContainer>()

   return (
      <>
         <Container>
            <button type='button' onClick={() => openModal(captureModalRef)}>
               Open
            </button>
         </Container>

         <ShareFolderOrWorkBook
            onCancel={() => closeModal(captureModalRef)}
            ref={captureModalRef}
            shareFolderOrWorkbookAPIStatus={API_INITIAL}
            isFolder={true}
            shareFolderOrWorkbookAPI={() => {}}
         />
      </>
   )
})
