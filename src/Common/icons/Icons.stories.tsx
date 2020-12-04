import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { iconsList } from './constants'
import {
   IconAndNameContainer,
   IconContainer,
   NameContainer,
   IconsContainer
} from './styledComponents'

class IconsStories extends React.Component {
   renderIcons = (): React.ReactNode =>
      iconsList.map(icon => {
         const { icon: Icon, label } = icon
         return (
            <IconAndNameContainer key={label}>
               <IconContainer>
                  <Icon />
               </IconContainer>
               <NameContainer>{label}</NameContainer>
            </IconAndNameContainer>
         )
      })
   render(): React.ReactNode {
      return <IconsContainer>{this.renderIcons()}</IconsContainer>
   }
}

storiesOf('Icons/All', module)
   .addParameters({
      notes:
         'If an icon is added newly add it in the `iconsList` array in `./constants.ts` file to view it in the story'
   })
   .addDecorator(withKnobs)
   .add('Icons', () => <IconsStories />)
