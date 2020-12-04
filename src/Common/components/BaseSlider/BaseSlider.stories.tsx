import React from 'react'
import { storiesOf } from '@storybook/react'
import tw, { styled } from 'twin.macro'

import BaseSlider from '.'

const Card = styled.div`
   ${props => (props.isEven ? tw`bg-neonRed` : tw`bg-greenishTeal`)};
   ${tw`flex! justify-center items-center `}
`

const Container = styled.div`
   margin-top: 10px;
   ${tw`w-11/12`}
`

const options = [1, 2, 3, 4]

storiesOf('Common-Components', module).add('BaseSlider', () => (
   <Container>
      <BaseSlider>
         {options.map(option => (
            <Card isEven={option % 2 === 0} key={option}>
               <h1>{option}</h1>
            </Card>
         ))}
      </BaseSlider>
   </Container>
))
