import React from 'react'
import { SlideProps } from './Slide.interface'
import { StyledSlide } from './Slide.styled'

const Slide = React.forwardRef(
   (
      { slideIndex, slidesPerPageSettings, slideWidth, children }: SlideProps,
      ref: React.Ref<HTMLLIElement>
   ) => (
      <StyledSlide
         slidesPerPageSettings={slidesPerPageSettings}
         slideWidth={slideWidth}
         data-index-number={slideIndex}
         key={slideIndex}
         ref={ref}
      >
         {children}
      </StyledSlide>
   )
)

Slide.displayName = 'Slide'

export default Slide
