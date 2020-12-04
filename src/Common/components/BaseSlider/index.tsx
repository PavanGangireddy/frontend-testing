import React, { Component } from 'react'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import LeftArrow from '../../icons/ArrowLeftIcon'

import { RightArrow, SliderContainer } from './styledComponents'
import './styles.css'

interface Props {
   children: React.ReactNode
   containerClassName?: string
   containerCSS?: React.CSSProperties

   [x: string]: any
}

class BaseSlider extends Component<Props> {
   static defaultProps = {
      prevArrow: (
         <div data-testid='prevArrow'>
            <LeftArrow />
         </div>
      ),
      nextArrow: (
         <div data-testid='nextArrow'>
            <RightArrow />
         </div>
      )
   }

   render(): React.ReactElement {
      const {
         children,
         containerClassName,
         containerCSS,
         ...otherProps
      } = this.props

      return (
         <SliderContainer className={containerClassName} css={containerCSS}>
            <Slider
               speed={500}
               infinite={false}
               slidesToShow={1}
               dots={true}
               slidesToScroll={1}
               {...otherProps}
            >
               {children}
            </Slider>
         </SliderContainer>
      )
   }
}

export default BaseSlider
