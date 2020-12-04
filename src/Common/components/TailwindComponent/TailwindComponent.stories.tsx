import React, { ReactElement } from 'react'
import { storiesOf } from '@storybook/react'
import tw, { css, styled } from 'twin.macro'
import { action } from '@storybook/addon-actions'

import Button from '../Button'

// Styled Components
const Heading = tw.h1`text-blue text-2xl text-center`

const TailwindComponent = (): ReactElement => (
   <Heading>
      Hello World!! <br />I am made with love using tailwindcss
   </Heading>
)

const TailwindButton = styled(Button)`
   ${tw`bg-gray-900`}
`

const CustomPropsExample = styled('div')`
   ${props => props.textColor}
   ${tw`m-150px`}
`

const CustomPropsExampleWithCSSProp = styled('div')`
   ${props => props.textColor}
`

const BaseButton = styled.button`
   ${tw`bg-gray-900`}
   ${props => props.customStyles}
`

const ExtendedBaseButtonStyledWithCustomProps = styled(BaseButton)``

storiesOf('Styles/Tailwind', module).add('tailwind heading Component', () => (
   <div tw='w-1/2 bg-gray-300 m-auto p-3 my-3 flex flex-col justify-center items-center'>
      <TailwindComponent />
      <TailwindButton>Tailwind Button</TailwindButton>
      <CustomPropsExample textColor={tw`text-pinkishOrange`}>
         Hello, I am styled using custom Props
      </CustomPropsExample>
      <CustomPropsExampleWithCSSProp
         textColor={css`
            ${tw`text-pinkishOrange`}
         `}
      >
         Hello, I am styled using custom <b>{`{CSS}`}</b> Props
      </CustomPropsExampleWithCSSProp>
      <ExtendedBaseButtonStyledWithCustomProps
         customStyles={tw`text-pinkishOrange outline-none px-4 py-2 border-none rounded-sm my-10 cursor-pointer`}
         onClick={action('clicked')}
      >
         Hello world
      </ExtendedBaseButtonStyledWithCustomProps>
   </div>
))
