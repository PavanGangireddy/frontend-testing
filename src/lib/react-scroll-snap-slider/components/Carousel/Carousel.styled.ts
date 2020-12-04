import styled from 'styled-components'

export const StyledCarousel = styled.div`
   width: 100vw;
   height: 100%;
   display: flex;
`

export const StyledSlider = styled.div`
   ::-webkit-scrollbar {
      display: none;
   }
   -webkit-overflow-scrolling: touch;
   overflow-x: scroll;
   -ms-overflow-style: none;
   scrollbar-width: none;
   scroll-snap-type: x mandatory;
   scroll-behavior: smooth;
   width: 100%;
`

export const StyledUl = styled.ul`
   display: flex;
   flex-wrap: nowrap;
   white-space: nowrap;
   list-style: none;
   width: 100%;
   height: 100%;
   padding: 0;
   margin: 0;
`
