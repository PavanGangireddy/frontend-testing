import tw, { styled } from 'twin.macro'

//TODO: need to remove this user-select none later by adding stop propagation to event, we have added this to prevent Touch-To-Search feature offered by chrome
export const BaseHKGroteskText = styled.span`
   ${tw`font-hkGrotesk select-none`}
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
`

export const BaseDMSerifDisplayText = styled.span`
   ${tw`font-dMSerifDisplay select-none`}
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
`

export const BaseHKGroteskLightText = styled(BaseHKGroteskText)`
   ${tw`font-light`}
`

export const BaseHKGroteskMediumText = styled(BaseHKGroteskText)`
   ${tw`font-medium`}
`

export const BaseHKGroteskSemiBoldText = styled(BaseHKGroteskText)`
   ${tw`font-semibold`}
`

export const BaseHKGroteskBoldText = styled(BaseHKGroteskText)`
   ${tw`font-bold`}
`

export const Typo8WhiteHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-8px text-white`}
`

export const Typo10BrightBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-10px text-brightBlue`}
`
export const Typo10WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-10px text-white`}
`
export const Typo10DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-10px text-darkBlueGrey`}
`
export const Typo10WhiteHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-10px text-white`}
`

export const Typo12BlackHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-black`}
`

export const Typo12PinkishOrangeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-pinkishOrange`}
`

export const Typo12WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-white`}
`
export const Typo12GreenishTealHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-greenishTeal`}
`
export const Typo12DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-darkBlueGrey`}
`
export const Typo12NeonRedHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-neonRed`}
`
export const Typo12SteelHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-steel`}
`
export const Typo12LightBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-lightBlueGrey`}
`
export const Typo12JadeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-jade`}
`

export const Typo12CherryHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-cherry`}
`

export const Typo12BrightBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-12px text-brightBlue`}
`

export const Typo12SteelHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-12px text-steel`}
`

export const Typo12WhiteHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-12px text-white`}
`

export const Typo12DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-12px text-darkBlueGrey`}
`
export const Typo12WhiteHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px text-white`}
`
export const Typo12SteelHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px text-steel`}
`
export const Typo12Steel60HKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-12px text-steel60`}
`
export const Typo12Steel40eHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-12px text-steel40`}
`

export const Typo12DarkBlueGreyHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-12px text-darkBlueGrey`}
`

export const Typo12BrightBlueHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-12px text-brightBlue`}
`
export const Typo13BrightBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-13px text-brightBlue`}
`
export const Typo14DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-14px text-darkBlueGrey`}
`

export const Typo14BlueTwoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-blueTwo`}
`
export const Typo14YellowOrangeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-yellowOrange`}
`
export const Typo14WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-white`}
`
export const Typo14VioletBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-violetBlue`}
`
export const Typo14TurquoiseBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-turquoiseBlue`}
`
export const Typo14TomatoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-tomato`}
`
export const Typo14SteelHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-steel`}
`
export const Typo14Steel60HKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-steel60`}
`
export const Typo14BlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-blueGrey`}
`
export const Typo14BlueGreyHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-14px text-blueGrey`}
`
export const Typo14PumpkinHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-pumpkin`}
`
export const Typo14OcreHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-ocre`}
`
export const Typo14NeonRedHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-neonRed`}
`
export const Typo14LightBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-lightBlueGrey`}
`
export const Typo14GreenishTealHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-greenishTeal`}
`
export const Typo14DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-darkBlueGrey`}
`
export const Typo14CherryHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-cherry`}
`
export const Typo14BrightBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-brightBlue`}
`
export const Typo14BlueThreeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-blueThree`}
`
export const Typo14BlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-blue`}
`
export const Typo14BlackHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-14px text-black`}
`

export const Typo14GreenishTealHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-14px text-greenishTeal`}
`

export const Typo14WhiteHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-14px text-white`}
`

export const Typo14WhiteHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px text-white`}
`
export const Typo14SteelHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px text-steel`}
`
export const Typo14Steel40HKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px text-steel`}
`
export const Typo14DarkBlueGreyHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-14px text-darkBlueGrey`}
`
export const Typo14BrightBlueHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-14px text-brightBlue`}
`
export const Typo14BlackHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-14px text-black`}
`
export const Typo14SteelHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-14px text-steel`}
`
export const Typo14NeonRedHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-14px text-neonRed`}
`

export const Typo14GreenishTealHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-14px text-greenishTeal`}
`

export const Typo14DarkBlueGreyHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-14px text-darkBlueGrey`}
`
export const Typo15WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-15px text-white`}
`

export const Typo16DarkBlueGreyHKGroteskBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-16px text-darkBlueGrey`}
`

export const Typo16YellowOrangeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-yellowOrange`}
`
export const Typo16WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-white`}
`
export const Typo16SteelHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-steel`}
`
export const Typo16SteelHKGroteskSemiBold = styled(BaseHKGroteskSemiBoldText)`
   ${tw`text-16px text-steel`}
`
export const Typo16BlueGreyHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-16px text-blueGrey`}
`
export const Typo16NeonRedHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-neonRed`}
`
export const Typo16GreenishTealHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-greenishTeal`}
`

export const Typo16DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-darkBlueGrey`}
`

export const Typo16DarkSlateBlueHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-16px text-darkSlateBlue`}
`

export const Typo16BrightBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-brightBlue`}
`

export const Typo16BlackHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-16px text-black`}
`

export const Typo16BlackHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-16px text-black`}
`

export const Typo16YellowOrangeHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-16px text-yellowOrange`}
`

export const Typo16WhiteHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-16px text-white`}
`
export const Typo16SteelHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-16px text-steel`}
`
export const Typo16NeonRedHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-16px text-neonRed`}
`
export const Typo16GreenishTealHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-16px text-greenishTeal`}
`
export const Typo16DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-16px text-darkBlueGrey`}
`

export const Typo16BrightBlueHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-16px text-brightBlue`}
`

export const Typo18SteelHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-18px text-steel`}
`

export const Typo18DarkSlateBlueHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-18px text-darkSlateBlue`}
`

export const Typo18WhiteHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-18px text-white`}
`

export const Typo18WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-white`}
`

export const Typo18BlueGreyTwoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-blueGreyTwo`}
`

export const Typo18VioletBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-violetBlue`}
`
export const Typo18TurquoiseBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-turquoiseBlue`}
`
export const Typo18TomatoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-tomato`}
`
export const Typo18PumpkinHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-pumpkin`}
`
export const Typo18OcreHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-ocre`}
`
export const Typo18BlueThreeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-18px text-blueThree`}
`
export const Typo18DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-18px text-darkBlueGrey`}
`
export const Typo18PrussianBlueHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-18px text-prussianBlue`}
`

export const Typo18DarkSlateBlueHKGroteskSemiBold = styled(
   BaseHKGroteskSemiBoldText
)`
   ${tw`text-18px text-darkSlateBlue`}
`

export const Typo20WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-white`}
`
export const Typo20VioletBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-violetBlue`}
`
export const Typo20TurquoiseBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-turquoiseBlue`}
`
export const Typo20TomatoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-tomato`}
`
export const Typo20PumpkinHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-pumpkin`}
`
export const Typo20OcreHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-ocre`}
`
export const Typo20DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-darkBlueGrey`}
`
export const Typo20DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-20px text-darkBlueGrey`}
`
export const Typo20BlueThreeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-20px text-blueThree`}
`
export const Typo20SteelHKGroteskMedium = styled(BaseHKGroteskMediumText)`
   ${tw`text-20px text-steel`}
`
export const Typo20CoolGreyHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-20px text-coolGrey`}
`
export const Typo20WhiteHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-20px text-white`}
`
export const Typo20DarkBlueGreyHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-20px text-darkBlueGrey`}
`
export const Typo24WhiteHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-white`}
`
export const Typo24VioletBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-violetBlue`}
`
export const Typo24TurquoiseBlueHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-turquoiseBlue`}
`
export const Typo24TomatoHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-tomato`}
`
export const Typo24PumpkinHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-pumpkin`}
`
export const Typo24OcreHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-ocre`}
`

export const Typo24DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-darkBlueGrey`}
`

export const Typo24DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-24px text-darkBlueGrey`}
`

export const Typo24DarkSlateBlueHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-24px text-darkSlateBlue`}
`

export const Typo24BlueThreeHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-blueThree`}
`

export const Typo24BlackHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-24px text-black`}
`

export const Typo24DarkBlueGreyHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-24px text-darkBlueGrey`}
`

export const Typo30DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-30px text-darkBlueGrey`}
`

export const Typo30DarkBlueGreyDMSerifDisplayRegular = styled(
   BaseDMSerifDisplayText
)`
   ${tw`text-30px text-darkBlueGrey`}
`

export const Typo32DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-32px text-darkBlueGrey`}
`

export const Typo32BlackHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-32px text-black`}
`

export const Typo32DarkBlueGreyHKGroteskMedium = styled(
   BaseHKGroteskMediumText
)`
   ${tw`text-32px text-darkBlueGrey`}
`

export const Typo36DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-36px text-darkBlueGrey`}
`

export const Typo32WhiteHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-32px text-white`}
`

export const Typo40DarkBlueGreyHKGroteskLight = styled(BaseHKGroteskLightText)`
   ${tw`text-40px text-darkBlueGrey`}
`

export const Typo44DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-44px text-darkBlueGrey`}
`

export const Typo48DarkBlueGreyHKGroteskRegular = styled(BaseHKGroteskText)`
   ${tw`text-48px text-darkBlueGrey`}
`

export const Typo48DarkBlueGreyHKGroteskBold = styled(BaseHKGroteskBoldText)`
   ${tw`text-48px text-darkBlueGrey`}
`

export const Typo48BlackHKGroteskLight = styled(BaseHKGroteskLightText)`
   ${tw`text-48px text-black`}
`

export const Typo48DarkBlueGreyHKGroteskLight = styled(BaseHKGroteskLightText)`
   ${tw`text-48px text-darkBlueGrey`}
`

export const Typo48BrightBlueHKGroteskLight = styled(BaseHKGroteskLightText)`
   ${tw`text-48px text-brightBlue`}
`

export const Typo36DarkBlueGreyDMSherifDisplay = styled(BaseDMSerifDisplayText)`
   ${tw`text-36px text-darkBlueGrey`}
`
