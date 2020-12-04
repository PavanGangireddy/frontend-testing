import React from 'react'
import { render } from '@testing-library/react'

import { types, variants, sizes } from './constants'
import Avatar from '.'

describe('Avatar', () => {
   it('should test userName in Avatar', () => {
      const { getByText } = render(
         <Avatar
            url={''}
            size={sizes.small}
            name={'name'}
            variant={variants.square}
            type={types.filled}
            alt={''}
         ></Avatar>
      )
      getByText(/NA/)
   })
   it('should test profile pic in Avatar', () => {
      const { getByTestId } = render(
         <Avatar
            url={'https://d1ov0p6puz91hu.cloudfront.net/logos/iBhubs_logo.svg'}
            size={sizes.small}
            name={'name'}
            variant={variants.square}
            type={types.filled}
            alt={'logo'}
         ></Avatar>
      )
      getByTestId('image-logo')
   })
}) //TODO:need to check css properties
