import React from 'react'
import { storiesOf } from '@storybook/react'

import TreeFileStructure from '.'

const data = [
   {
      key: 'mammal',
      label: 'Mammal',
      nodes: [
         {
            key: 'canidae',
            label: 'Canidae',
            nodes: [
               {
                  key: 'dog',
                  label: 'Dog',
                  nodes: [],
                  url: 'https://www.google.com/search?q=dog'
               },
               {
                  key: 'fox',
                  label: 'Fox',
                  nodes: [],
                  url: 'https://www.google.com/search?q=fox'
               },
               {
                  key: 'wolf',
                  label: 'Wolf',
                  nodes: [],
                  url: 'https://www.google.com/search?q=wolf'
               }
            ],
            url: 'https://www.google.com/search?q=canidae'
         }
      ],
      url: 'https://www.google.com/search?q=mammal'
   },
   {
      key: 'reptile',
      label: 'Reptile',
      nodes: [
         {
            key: 'squamata',
            label: 'Squamata',
            nodes: [
               {
                  key: 'lizard',
                  label: 'Lizard',
                  nodes: [],
                  url: 'https://www.google.com/search?q=lizard'
               },
               {
                  key: 'snake',
                  label: 'Snake',
                  nodes: [],
                  url: 'https://www.google.com/search?q=snake'
               },
               {
                  key: 'gekko',
                  label: 'Gekko',
                  nodes: [],
                  url: 'https://www.google.com/search?q=gekko'
               }
            ],
            url: 'https://www.google.com/search?q=squamata'
         }
      ],
      url: 'https://www.google.com/search?q=reptile'
   }
]

storiesOf(
   'Common-Components/Tree File Structure',
   module
).add('default Tree file Structure', () => <TreeFileStructure data={data} />)
