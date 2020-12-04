import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { I18nextProvider } from 'react-i18next'
import styled from 'styled-components'

import {
   Typo14WhiteHKGroteskSemiBold,
   Typo14SteelHKGroteskRegular
} from '../../styleGuide/Typos'

import i18n from '../../i18n'

import Button from '.'

const ButtonsContainer = styled.div`
   display: flex;
   width: calc(100% - 100px);
   justify-content: space-between;
   padding: 20px;
   background: lightgrey;
   align-items: center;
   margin: auto;
   height: 50vh;
   flex-wrap: wrap;
`

const PrimaryButtonText = styled(Typo14WhiteHKGroteskSemiBold)`
   line-height: 1.71;
   letter-spacing: normal;
`

const TextContainer = styled.span`
   height: 12px;
   display: flex;
`

export const CustomSizeButton = styled(Button)`
   padding: 8px;
`

export const CustomTextContainer = styled.div`
   display: flex;
`

storiesOf('Forms/Buttons', module)
   .addDecorator(story => (
      <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>
   ))
   .add('Button Component', () => (
      <ButtonsContainer>
         <Button onClick={action('clicked')} variant={Button.variants.primary}>
            <PrimaryButtonText>Primary Button</PrimaryButtonText>
         </Button>
         <Button
            onClick={action('clicked')}
            variant={Button.variants.primary}
            isLoading
         >
            <PrimaryButtonText>Submit</PrimaryButtonText>
         </Button>
         <Button
            onClick={action('clicked')}
            variant={Button.variants.primary}
            disabled
         >
            Disabled Button
         </Button>
         <Button
            onClick={action('clicked')}
            variant={Button.variants.secondary}
         >
            <Typo14SteelHKGroteskRegular>
               Secondary Button
            </Typo14SteelHKGroteskRegular>
         </Button>
         <Button onClick={action('clicked')} variant={Button.variants.tertiary}>
            <Typo14SteelHKGroteskRegular>
               Tertiary Button
            </Typo14SteelHKGroteskRegular>
         </Button>
         <Button onClick={action('clicked')} variant={Button.variants.tertiary}>
            <span style={{ paddingRight: '10px' }}>+</span>
            <PrimaryButtonText>
               <Typo14SteelHKGroteskRegular>
                  Add Section
               </Typo14SteelHKGroteskRegular>
            </PrimaryButtonText>
         </Button>
         <Button
            onClick={action('clicked')}
            variant={Button.variants.secondary}
            shape={Button.shapes.pill}
            size={Button.sizes.small}
         >
            <TextContainer>
               <img
                  src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/b9f462be-a924-4e28-bcd1-b3b39f97dfcd.svg'
                  alt='plus icon'
               />
            </TextContainer>
         </Button>
         <CustomSizeButton
            onClick={action('clicked')}
            variant={Button.variants.secondary}
            shape={Button.shapes.round}
         >
            <CustomTextContainer>
               <img
                  src='https://cdn.zeplin.io/5f0341c2b569f66c57cb6e8f/assets/b9f462be-a924-4e28-bcd1-b3b39f97dfcd.svg'
                  alt='plus icon'
               />
            </CustomTextContainer>
         </CustomSizeButton>
      </ButtonsContainer>
   ))
