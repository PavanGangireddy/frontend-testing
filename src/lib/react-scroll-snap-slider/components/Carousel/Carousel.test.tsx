import React from 'react'
import { render, screen } from '@testing-library/react'
import { Carousel } from './index'

const items = [
   {
      src: ''
   },
   {
      src: ''
   },
   {
      src: ''
   }
]

describe('Carousel basic tests', () => {
   it('renders the Carousel with 3 items', () => {
      const carousalRef = React.createRef<HTMLDivElement[]>()
      render(
         <Carousel sliderRef={carousalRef}>
            {items.map((item, index) => (
               <img key={index} src={item.src}></img>
            ))}
         </Carousel>
      )
      expect(screen.getAllByRole('img')).toHaveLength(3)
   })
})
