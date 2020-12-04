import React from 'react'
import { storiesOf } from '@storybook/react'

import BaseModalContainer from '../BaseModalContainer'

import ShareFeatureLockModalProps from '.'

const modalRef = React.createRef<BaseModalContainer>()

function openModal(): void {
   modalRef.current?.openModal()
}

function closeModal(): void {
   modalRef.current?.closeModal()
}

storiesOf('OverLays/Share lock', module).add('share lock Default View', () => (
   <>
      <ShareFeatureLockModalProps
         shareFeatureLockModalRef={modalRef}
         onCancel={closeModal}
      />
      <div>
         <button onClick={() => openModal()}>click me</button>
      </div>
   </>
))
