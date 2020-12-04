import React from 'react'
import { storiesOf } from '@storybook/react'

import { types, variants, sizes } from './constants'
import Avatar from '.'

storiesOf('Avatar', module)
   .add('Avatar without profile pic', () => (
      <Avatar
         size={sizes.small}
         name={'name'}
         variant={variants.circle}
         type={types.outline}
      />
   ))

   .add('Avatar with profile pic ', () => (
      <Avatar
         url={'https://d1ov0p6puz91hu.cloudfront.net/logos/iBhubs_logo.svg'}
         size={sizes.small}
         name={'name'}
         variant={variants.circle}
         type={types.outline}
         alt={'ibhubs-logo'}
      />
   ))
   .add('Avatar with square shape', () => (
      <Avatar
         url={'https://d1ov0p6puz91hu.cloudfront.net/logos/iBhubs_logo.svg'}
         size={sizes.small}
         name={'name'}
         variant={variants.square}
         type={types.outline}
         alt={'ibhubs-logo'}
      />
   ))

   .add('Avatar without profile pic with square shape', () => (
      <Avatar
         size={sizes.large}
         name={'name'}
         variant={variants.square}
         type={types.filled}
      />
   ))
   .add('Avatar with outline', () => (
      <Avatar
         size={sizes.small}
         name={'name'}
         variant={variants.square}
         type={types.outline}
      />
   ))
