import tw, { styled, TwStyle } from 'twin.macro'

import { Typo12PinkishOrangeHKGroteskRegular } from '../../styleGuide/Typos'

export const ErrorView = styled.div`
   ${tw`flex-row mt-3px ml-3px`}
`

export const ErrorMessage = styled(Typo12PinkishOrangeHKGroteskRegular)`
   ${tw`leading-2.03 tracking-0.11px pointer-events-none`}
`

export const Input = styled.input`
   font-family: HKGrotesk;
   ${tw` w-full box-border text-darkBlueGrey text-14px h-40px font-normal leading-1.71 pl-16px mt-20px rounded-2px border-solid border-default bg-white sm:mt-8px`}
   ${({ isValid }): TwStyle =>
      isValid ? tw`border-lightBlueGrey` : tw`border-pinkishOrange`}
   &:focus {
      ${({ isValid }): TwStyle =>
         isValid ? tw`border-steel` : tw`border-pinkishOrange`}
      ${tw`outline-none`};
   }
   &:active {
      ${({ isValid }): TwStyle =>
         isValid ? tw`border-steel` : tw`border-pinkishOrange`}
      ${tw`outline-none`};
   }
   &:disabled {
      ${tw`border-lightBlueGrey text-darkGreyBlueTwoSix font-medium tracking-0.2px`}
   }
   &::-webkit-input-placeholder {
      ${({ isValid }): TwStyle =>
         isValid ? tw`text-silver` : tw`text-blueyGrey`}
      ${tw`opacity-100`};
   }
   &:-moz-placeholder {
      ${({ isValid }): TwStyle =>
         isValid ? tw`text-silver` : tw`text-blueyGrey`}
      ${tw`opacity-100`};
   }
   &::-moz-placeholder {
      ${({ isValid }): TwStyle =>
         isValid ? tw`text-silver` : tw`text-blueyGrey`}
      ${tw`opacity-100`};
   }
   &:-ms-input-placeholder {
      ${({ isValid }): TwStyle =>
         isValid ? tw`text-silver` : tw`text-blueyGrey`}
      ${tw`opacity-100`};
   }
   ${props => props.css}
`

export const InputContainer = styled.div`
   ${tw`w-full`}
   ${props => props.containerCSS}
`
