import React from 'react'
import { render } from '@testing-library/react'

import TreeFileStructure from '.'

const data = [
   {
      id: 'mammal',
      label: 'Mammal',
      nodes: [
         {
            id: 'canidae',
            label: 'Canidae',
            nodes: [
               {
                  id: 'dog',
                  label: 'Dog',
                  nodes: [],
                  url: 'https://www.google.com/search?q=dog'
               },
               {
                  id: 'fox',
                  label: 'Fox',
                  nodes: [],
                  url: 'https://www.google.com/search?q=fox'
               },
               {
                  id: 'wolf',
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
      id: 'reptile',
      label: 'Reptile',
      nodes: [
         {
            id: 'squamata',
            label: 'Squamata',
            nodes: [
               {
                  id: 'lizard',
                  label: 'Lizard',
                  nodes: [],
                  url: 'https://www.google.com/search?q=lizard'
               },
               {
                  id: 'snake',
                  label: 'Snake',
                  nodes: [],
                  url: 'https://www.google.com/search?q=snake'
               },
               {
                  id: 'gekko',
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

describe('Tree File Structure component test cases', () => {
   it('should render tree file when we click a folder', () => {
      const { getByText } = render(<TreeFileStructure data={data} />)

      getByText('Mammal')
   })
})
