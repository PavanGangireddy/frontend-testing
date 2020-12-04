const colors = {
   battleshipGrey: '#6b6e7f',
   babyBlue: '#a4e3fe',
   blue: '#0055dc',
   blueTwo: '#0058e3',
   blueTwo02: 'rgba(0, 88, 227, 0.2)',
   blueThree: '#0051ca',
   blueGrey: '#5c708a',
   blueyGreen16: 'rgba(39, 171, 131, 0.16)',
   blueyGreen: '#27ab83',
   brightBlue: '#0b69ff',
   brightBlue10: 'rgba(11, 105, 255, 0.1)',
   brightBlue30: 'rgba(11, 105, 255, 0.3)',
   brownishOrange: '#de911d',
   butterscotch: '#ffb739',
   cerulean8: 'rgba(9, 103, 210, 0.08)',
   cerulean: '#0967d2',
   ceruleanTwo: '#0295d4',
   cherry: '#d7042a',
   cocoa: '#966149',
   coolGrey: '#b5b7c4',
   cornflowerBlue: '#6587dd',
   darkBlueGrey: '#171f46',
   darkBlueGrey8: 'rgba(23, 31, 70, 0.08)',
   darkBlueGrey16: 'rgba(23, 31, 70, 0.16)',
   darkSlateBlue: '#183b56',
   deepLilac: '#8d72bb',
   duckEggBlue: '#baf3d9',
   duckEggBlueTwo: '#c3eff3',
   duckEggBlueThree: '#d6f5f6',
   duckEggBlueFour: '#e9f9fb',
   duckEggBlueFive: '#dfedf8',
   duckEggBlueSix: '#eaf4fa',
   duckEggBlueSeven: '#c9f6e2',
   duckEggBlueEight: '#d8f9eb',
   duckEggBlueTen: '#e3e8f9',
   duckEggBlueEleven: '#e9eefb',
   duckEggBlueNine: '#e9fbf3',
   duskyBlue60: 'rgba(71, 85, 144, 0.6)',
   dullPink: '#d38299',
   eggShell: '#fffdc3',
   eggshell: '#ffffd9',
   eggshellBlue: '#c1fef6',
   fadedPink: '#edc8d3',
   fadedPinkTwo: '#f0d0da',
   fadedPinkThree: '#f2d7e0',
   fadedPinkFour: '#f4dee6',
   greenishTeal: '#2dca73',
   jade: '#1db05f',
   iceBlue: '#e5f3ff',
   ivory: '#fffece',
   lavender: '#deabea',
   lavenderPink: '#c172d4',
   lavenderTwo: '#c8d5f5',
   lavenderThree: '#e3b6ed',
   lavenderFour: '#e8c3f0',
   lavenderFive: '#edd0f3',
   lavenderSix: '#f2ddf6',
   lightBeige: '#fffcb8',
   lightBlueGrey: '#d7dfe9',
   lightBlueGrey40: 'rgba(215, 223, 233, 0.4)',
   lightBlueGrey50: 'rgba(215, 223, 233, 0.5)',
   lightBlueGreyTwo: '#abd1ec',
   lightBlueGreyThree: '#b8d8ef',
   lightBlueGreyFour: '#c5dff2',
   lightBlueGreyFive: '#d2e6f5',
   lightBlueGreySix: '#c7b8e3',
   lightBlueGreySeven: '#d1c5e8',
   lightBlueGreyEight: '#dbd2ed',
   lightGrey: '#ece4dc',
   lightPeriwinkle: '#ced9f6',
   lightPeriwinkleTwo: '#d5def7',
   lightPeriwinkleThree: '#dce3f8',
   lightTan: '#fbf3e4',
   lightTeal: '#8ae9be',
   lightTealTwo: '#9cedc7',
   lightTealThree: '#9de3ed',
   lightTealFour: '#b0e9f0',
   lightTealFive: '#abf0d0',
   mango: '#ffb32e',
   macaroniAndCheese16: 'rgba(240, 180, 41, 0.16)',
   neonRed: '#ff0b37',
   neonRed05: 'rgba(255, 11, 55, 0.05)',
   ocre: '#ca9f00',
   offWhite: '#fffee5',
   offWhiteTwo: '#fff6e5',
   pale: '#fff0d2',
   paleGrey: '#f1f4f8',
   paleGreyTwo: '#e5dff2',
   paleGreyThree: '#f1edf8',
   paleGreyFour: '#f6e5ec',
   paleGreyFive: '#f9ecf0',
   paleGreySix: '#f4f7fb',
   palePeach: '#ffdb9c',
   palePeachTwo: '#ffe2ae',
   palePeachThree: '#ffe9c0',
   palePeachFour: '#ffe1ab',
   palePurple: '#beabde',
   parchment: '#fffbab',
   parchment60: 'rgba(255, 251, 171, 0.6)',
   pastelPurple: '#c3aeff',
   perrywinkle: '#72add9',
   pinkishGrey: '#d1b7a9',
   pinkishGreyTwo: '#dac6ba',
   pinkishGreyThree: '#e3d5cb',
   prussianBlue: '#014e6f',
   putty: '#c8a999',
   pumpkin: '#d98304',
   steel: '#7e858e',
   steel16: 'rgba(126, 133, 142, 0.16)',
   steel40: 'rgba(126, 133, 142, 0.4)',
   steel60: 'rgba(126, 133, 142, 0.6)',
   steelVariant: 'rgba(92,112,138,0.4)',
   tealish: '#2ec2d6',
   tiffanyBlue: '#72d8e6',
   tiffanyBlueTwo: '#8adeea',
   turquoiseBlue: '#00b2ca',
   tomato: '#f13838',
   uglyYellow: '#c5bd00',
   veryLightPurple: '#f7eafa',
   violetBlue: '#4d00ca',
   weirdGreen: '#50dd9d',
   white: '#ffffff',
   whiteTwo: '#fbfbfb',
   whiteThree: '#f6f1ee',
   wheat: '#ffd58a',
   yellowOrange: '#ffb800',
   lightSkyBlue: '#d7f0fe',
   //NOTE: these colors are not there in any zeplin components but are being used in different components
   azulTwo: '#1665d8',
   black: '#000000',
   black12: 'rgba(0, 0, 0, 0.12)',
   black32: 'rgba(0, 0, 0, 0.32)',
   blackSeven: '#101010',
   black80: 'rgba(0, 0, 0, 0.8)',
   blueyGrey: '#8892a4',
   blueGreyTwo: '#7b8fac',
   dark: '#1e2a3f',
   darkGreyBlueTwoSix: 'rgba(53, 78, 110, 0.6)',
   darkGreyBlueTwoSixteen: 'rgba(53, 78, 110, 0.16)',
   dusk: '#4c637d',
   pageNotFoundBottomBgColor: '#cad9f0',
   pageNotFoundInfoSectionBgColor: '#f6f6f8',
   pageNotFoundText: '#5e6977',
   pageNotFoundTopBgColor: '#f3f4f8',
   pinkishOrange: '#ff6b3c',
   silver: '#c1c4c8',
   white50: 'rgba(255,255,255,0.5)',
   primaryColor: '#2196f3',
   osloGrey: 'rgba(126, 133, 142, 0.2)',
   transparentPrimary8: '#0967d214',
   basic200: '#f5f7fa',
   basic500: '#9aa5b1',
   basic700: '#616e7c',
   basic800: '#52606d',
   basic1000: '#323f4b',
   primary500Default: '#0967d2',
   lightBlueGrey24: 'rgba(215, 223, 233,0.24)',
   transparentPrimary16: '#0967d228',
   // TODO: Need to find the color name
   tabBarIcon: '#52606D'
}

module.exports = {
   purge: [],
   target: 'relaxed',
   prefix: '',
   important: false,
   separator: ':',
   theme: {
      screens: {
         sm: '640px',
         md: '768px',
         lg: '1024px',
         xl: '1280px'
      },
      colors: {
         transparent: 'transparent',
         current: 'currentColor',

         black: '#000',
         white: '#fff',

         gray: {
            100: '#f7fafc',
            200: '#edf2f7',
            300: '#e2e8f0',
            400: '#cbd5e0',
            500: '#a0aec0',
            600: '#718096',
            700: '#4a5568',
            800: '#2d3748',
            900: '#1a202c'
         },
         red: {
            100: '#fff5f5',
            200: '#fed7d7',
            300: '#feb2b2',
            400: '#fc8181',
            500: '#f56565',
            600: '#e53e3e',
            700: '#c53030',
            800: '#9b2c2c',
            900: '#742a2a'
         },
         orange: {
            100: '#fffaf0',
            200: '#feebc8',
            300: '#fbd38d',
            400: '#f6ad55',
            500: '#ed8936',
            600: '#dd6b20',
            700: '#c05621',
            800: '#9c4221',
            900: '#7b341e'
         },
         yellow: {
            100: '#fffff0',
            200: '#fefcbf',
            300: '#faf089',
            400: '#f6e05e',
            500: '#ecc94b',
            600: '#d69e2e',
            700: '#b7791f',
            800: '#975a16',
            900: '#744210'
         },
         green: {
            100: '#f0fff4',
            200: '#c6f6d5',
            300: '#9ae6b4',
            400: '#68d391',
            500: '#48bb78',
            600: '#38a169',
            700: '#2f855a',
            800: '#276749',
            900: '#22543d'
         },
         teal: {
            100: '#e6fffa',
            200: '#b2f5ea',
            300: '#81e6d9',
            400: '#4fd1c5',
            500: '#38b2ac',
            600: '#319795',
            700: '#2c7a7b',
            800: '#285e61',
            900: '#234e52'
         },
         blue: {
            100: '#ebf8ff',
            200: '#bee3f8',
            300: '#90cdf4',
            400: '#63b3ed',
            500: '#4299e1',
            600: '#3182ce',
            700: '#2b6cb0',
            800: '#2c5282',
            900: '#2a4365'
         },
         indigo: {
            100: '#ebf4ff',
            200: '#c3dafe',
            300: '#a3bffa',
            400: '#7f9cf5',
            500: '#667eea',
            600: '#5a67d8',
            700: '#4c51bf',
            800: '#434190',
            900: '#3c366b'
         },
         purple: {
            100: '#faf5ff',
            200: '#e9d8fd',
            300: '#d6bcfa',
            400: '#b794f4',
            500: '#9f7aea',
            600: '#805ad5',
            700: '#6b46c1',
            800: '#553c9a',
            900: '#44337a'
         },
         pink: {
            100: '#fff5f7',
            200: '#fed7e2',
            300: '#fbb6ce',
            400: '#f687b3',
            500: '#ed64a6',
            600: '#d53f8c',
            700: '#b83280',
            800: '#97266d',
            900: '#702459'
         },
         ...colors
      },
      spacing: {
         px: '1px',
         '0': '0',
         '1': '0.25rem',
         '2': '0.5rem',
         '3': '0.75rem',
         '4': '1rem',
         '5': '1.25rem',
         '6': '1.5rem',
         '8': '2rem',
         '10': '2.5rem',
         '12': '3rem',
         '16': '4rem',
         '20': '5rem',
         '24': '6rem',
         '32': '8rem',
         '40': '10rem',
         '48': '12rem',
         '56': '14rem',
         '64': '16rem',
         '0px': '0px',
         '1.5px': '1.5px',
         '2px': '2px',
         '3px': '3px',
         '3.2px': '3.2px',
         '4px': '4px',
         '5px': '5px',
         '6px': '6px',
         '7px': '7px',
         '8px': '8px',
         '9px': '9px',
         '11px': '11px',
         '12px': '12px',
         '10px': '10px',
         '13.5px': '13.5px',
         '14px': '14px',
         '15px': '15px',
         '16px': '16px',
         '17px': '17px',
         '18px': '18px',
         '20px': '20px',
         '32px': '32px',
         '34px': '34px',
         '40px': '40px',
         '42px': '42px',
         '48px': '48px',
         '52px': '52px',
         '65px': '65px',
         '70px': '70px',
         '80px': '80px',
         '126px': '126px',
         '352px': '352px',
         '360px': '360px',
         '550px': '550px',
         '586px': '586px',
         '687px': '687px',
         '21px': '21px',
         '22px': '22px',
         '24px': '24px',
         '28px': '28px',
         '25px': '25px',
         '26px': '26px',
         '27px': '27px',
         '30px': '30px',
         '35px': '35px',
         '36px': '36px',
         '38px': '38px',
         '41px': '41px',
         '44px': '44px',
         '46px': '46px',
         '47px': '47px',
         '50px': '50px',
         '56px': '56px',
         '57px': '57px',
         '60.5px': '60.5px',
         '61px': '61px',
         '64px': '64px',
         '72px': '72px',
         '75px': '75px',
         '84px': '84px',
         '100px': '100px',
         '60px': '60px',
         '66px': '66px',
         '73px': '73px',
         '76px': '76px',
         '90px': '90px',
         '96px': '96px',
         '99px': '99px',
         '648px': '648px',
         '104px': '104px',
         '108px': '108px',
         '110px': '110px',
         '112px': '112px',
         '114px': '114px',
         '116px': '116px',
         '120px': '120px',
         '122px': '122px',
         '128px': '128px',
         '136px': '136px',
         '140px': '140px',
         '147px': '147px',
         '146px': '146px',
         '150px': '150px',
         '159px': '159px',
         '160px': '160px',
         '163px': '163px',
         '175px': '175px',
         '180px': '180px',
         '190px': '190px',
         '200px': '200px',
         '205px': '205px',
         '206px': '206px',
         '215px': '215px',
         '228px': '228px',
         '249px': '249px',
         '258px': '258px',
         '278px': '278px',
         '230px': '230px',
         '234px': '234px',
         '256px': '256px',
         '355px': '355px',
         '400px': '400px',
         '428px': '428px',
         '493px': '493px',
         '585px': '585px',
         '600px': '600px',
         '750px': '750px',
         '950px': '950px',
         '300px': '300px',
         '357px': '357px',
         '504px': '504px',
         '580px': '580px',
         '595px': '595px',
         '450px': '450px',
         '464px': '464px',
         '640px': '640px',
         '50vw': '50vw'
      },
      backgroundColor: theme => theme('colors'),
      backgroundOpacity: theme => theme('opacity'),
      backgroundPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top'
      },
      backgroundSize: {
         auto: 'auto',
         cover: 'cover',
         contain: 'contain'
      },
      borderColor: theme => ({
         ...theme('colors'),
         default: theme('colors.gray.300', 'currentColor')
      }),
      borderOpacity: theme => theme('opacity'),
      borderRadius: {
         none: '0',
         sm: '0.125rem',
         default: '0.25rem',
         md: '0.375rem',
         lg: '0.5rem',
         full: '9999px',
         '2px': '2px',
         '3px': '3px',
         '4px': '4px',
         '5px': '5px',
         '6px': '6px',
         '6.5px': '6.5px',
         '8px': '8px',
         '12px': '12px',
         '16px': '16px',
         '25px': '25px',
         '50%': '50%',
         '100px': '100px',
         '100%': '100%'
      },
      borderWidth: {
         default: '1px',
         '0': '0',
         '2': '2px',
         '4': '4px',
         '6': '6px',
         '8': '8px'
      },
      boxShadow: {
         xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
         sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
         default:
            '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
         md:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
         lg:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
         xl:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
         '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
         inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
         outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
         cardShadow: `0 4px 40px 0 ${colors.darkBlueGrey16}`,
         none: 'none',
         shadowBlack12: `2px 6px 10px 0 ${colors.black12}`,
         shadowDarkGreyBlueEight: `0 8px 16px 0  ${colors.darkBlueGrey8}`,
         shadowdarkGreyBlueTwoSixteen: ` 0 4px 40px 0 ${colors.darkGreyBlueTwoSixteen}`,
         steel16: `0 4px 16px 0 ${colors.steel16}`,
         cardMenuShadow: `0 4px 40px 0 ${colors.darkGreyBlueTwoSixteen}`,
         moveBottomSectionShadow: `0 -1px 4px 0 rgba(0, 0, 0, 0.1)`,
         breadCrumbShadow: `0 4px 16px 0 var${colors.steel16}`
      },
      container: {},
      cursor: {
         auto: 'auto',
         default: 'default',
         pointer: 'pointer',
         wait: 'wait',
         text: 'text',
         move: 'move',
         'not-allowed': 'not-allowed'
      },
      divideColor: theme => theme('borderColor'),
      divideOpacity: theme => theme('borderOpacity'),
      divideWidth: theme => theme('borderWidth'),
      fill: {
         current: 'currentColor'
      },
      flex: {
         '1': '1 1 0%',
         auto: '1 1 auto',
         initial: '0 1 auto',
         none: 'none'
      },
      flexGrow: {
         '0': '0',
         default: '1'
      },
      flexShrink: {
         '0': '0',
         default: '1'
      },
      fontFamily: {
         sans: [
            'system-ui',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"'
         ],
         serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
         mono: [
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace'
         ],
         hkGrotesk: 'HKGrotesk',
         dMSerifDisplay: 'DM Serif Display'
      },
      fontSize: {
         xs: '0.75rem',
         sm: '0.875rem',
         base: '1rem',
         lg: '1.125rem',
         xl: '1.25rem',
         '2xl': '1.5rem',
         '3xl': '1.875rem',
         '4xl': '2.25rem',
         '5xl': '3rem',
         '6xl': '4rem',
         '8px': '8px',
         '10px': '10px',
         '11px': '11px',
         '12px': '12px',
         '13px': '13px',
         '14px': '14px',
         '15px': '15px',
         '16px': '16px',
         '18px': '18px',
         '20px': '20px',
         '22px': '22px',
         '24px': '24px',
         '28px': '28px',
         '30px': '30px',
         '32px': '32px',
         '36px': '36px',
         '40px': '40px',
         '44px': '44px',
         '48px': '48px'
      },
      fontWeight: {
         hairline: '100',
         thin: '200',
         light: '300',
         normal: '400',
         medium: '500',
         semibold: '600',
         bold: '700',
         extrabold: '800',
         black: '900'
      },
      height: theme => ({
         auto: 'auto',
         ...theme('spacing'),
         '1px': '1px',
         '16px': '16px',
         '32px': '32px',
         '56px': '56px',
         '40px': '40px',
         '48px': '48px',
         '64px': '64px',
         '80px': '80px',
         '84px': '84px',
         '96px': '96px',
         '104px': '104px',
         '112px': '112px',
         '117px': '117px',
         '176px': '176px',
         '530px': '530px',
         '17.5': '17.5%',
         '27%': '27%',
         '37.2': '37.2%',
         '30%': '30%',
         '46': '46%',
         '56': '56%',
         '94%': '94%',
         full: '100%',
         screen: '100vh',
         inherit: 'inherit',
         initial: 'initial'
      }),
      inset: {
         '0': '0',
         '12': '3rem',
         '-5px': '-5px',
         '-8px': '-8px',
         '-12px': '-12px',
         '-13px': '-13px',
         '-32px': '-32px',
         '-56px': '-56px',
         '4px': '4px',
         '32px': '32px',
         '48px': '48px',
         '-10px': '-10px',
         '10px': '10px',
         '15px': '15px',
         '5px': '5px',
         '8px': '8px',
         '12px': '12px',
         '16px': '16px',
         '20px': '20px',
         '24px': '24px',
         '40px': '40px',
         '56px': '56px',
         '65px': '65px',
         '80px': '80px',
         '90px': '90px',
         '99px': '99px',
         '84px': '84px',
         '100px': '100px',
         '102px': '102px',
         '206px': '206px',
         '32%': '32%',
         '35%': '35%',
         '36%': '36%',
         '25%': '25%',
         '40%': '40%',
         '47%': '47%',
         '50%': '50%',
         '105px': '105px',
         '-18px': '-18px',
         '-20px': '-20px',
         '60px': '60px',
         '55px': '55px',
         unset: 'unset',
         auto: 'auto'
      },
      letterSpacing: {
         tighter: '-0.05em',
         tight: '-0.025em',
         normal: '0',
         wide: '0.025em',
         wider: '0.05em',
         widest: '0.1em',
         '0.2px': '0.2px',
         '0.11px': '0.11px',
         '0.15px': '0.15px',
         '0.12px': '0.12px'
      },
      lineHeight: {
         none: '1',
         tight: '1.25',
         snug: '1.375',
         normal: '1.5',
         relaxed: '1.625',
         loose: '2',
         '3': '.75rem',
         '4': '1rem',
         '5': '1.25rem',
         '6': '1.5rem',
         '7': '1.75rem',
         '8': '2rem',
         '9': '2.25rem',
         '10': '2.5rem',
         '24px': '24px',
         '32px': '32px',
         '1.27': '1.27',
         '1.33': '1.33',
         '1.46': '1.46',
         '1.47': '1.47',
         '1.5': '1.5',
         '1.71': '1.71',
         '1.78': '1.78',
         '2.03': '2.03'
      },
      listStyleType: {
         none: 'none',
         disc: 'disc',
         decimal: 'decimal',
         dot: 'dot'
      },
      margin: (theme, { negative }) => ({
         auto: 'auto',
         ...theme('spacing'),
         ...negative(theme('spacing'))
      }),
      maxHeight: {
         full: '100%',
         screen: '100vh',
         '0px': '0px',
         '20px': '20px',
         '24px': '24px',
         '32px': '32px',
         '80px': '80px',
         '117px': '117px',
         '150px': '150px',
         '398px': '398px',
         '424.5px': '424.5px',
         '64px': '64px',
         '74vh': '74vh',
         '90vh': '90vh',
         '200px': '200px',
         '250px': '250px'
      },
      maxWidth: (theme, { breakpoints }) => ({
         none: 'none',
         xs: '20rem',
         sm: '24rem',
         md: '28rem',
         lg: '32rem',
         xl: '36rem',
         '2xl': '42rem',
         '3xl': '48rem',
         '4xl': '56rem',
         '5xl': '64rem',
         '6xl': '72rem',
         '25vw': '25vw',
         '24px': '24px',
         '32px': '32px',
         '50px': '50px',
         '80px': '80px',
         '90px': '90px',
         '150px': '150px',
         '156px': '156px',
         '163px': '163px',
         '178px': '178px',
         '200px': '200px',
         '202px': '202px',
         '234px': '234px',
         '250px': '250px',
         '256px': '256px',
         '286px': '286px',
         '300px': '300px',
         '323px': '323px',
         '328px': '328px',
         '360px': '360px',
         '400px': '400px',
         '435px': '435px',
         '544px': '544px',
         '586px': '586px',
         '640px': '640px',
         '817px': '817px',
         full: '100%',
         ...breakpoints(theme('screens'))
      }),
      minHeight: {
         '0': '0',
         '0.5px': '0.5px',
         '24px': '24px',
         '28px': '28px',
         '40px': '40px',
         '56px': '56px',
         '67px': '67px',
         '75px': '75px',
         '77px': '77px',
         '97px': '97px',
         '117px': '117px',
         '180px': '180px',
         '265px': '265px',
         '280px': '280px',
         '382px': '382px',
         '400px': '400px',
         '750px': '750px',
         full: '100%',
         screen: '100vh',
         '24.8': '24.8%',
         '31.3': '31.3%',
         '34.8': '34.8%',
         '41.4': '41.4%',
         '36': '36%',
         '51.3': '51.3%',
         '56': '56%',
         '60vh': '60vh',
         '90vh': '90vh',
         '82vh': '82vh'
      },
      minWidth: {
         '0': '0',
         full: '100%',
         '1/12': '8.333333%',
         '24%': '24%',
         '25%': '25%',
         '25vw': '25vw',
         '24px': '24px',
         '40px': '40px',
         '42px': '42px',
         '76px': '76px',
         '125px': '125px',
         '117px': '117px',
         '156px': '156px',
         '200px': '200px',
         '214px': '214px',
         '228px': '228px',
         '234px': '234px',
         '249px': '249px',
         '256px': '256px',
         '257px': '257px',
         '300px': '300px',
         '323px': '323px',
         '402px': '402px',
         '536px': '536px',
         '552px': '552px'
      },
      objectPosition: {
         bottom: 'bottom',
         center: 'center',
         left: 'left',
         'left-bottom': 'left bottom',
         'left-top': 'left top',
         right: 'right',
         'right-bottom': 'right bottom',
         'right-top': 'right top',
         top: 'top'
      },
      opacity: {
         '0': '0',
         '25': '0.25',
         '50': '0.5',
         '75': '0.75',
         '100': '1'
      },
      order: {
         first: '-9999',
         last: '9999',
         none: '0',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12'
      },
      padding: theme => theme('spacing'),
      placeholderColor: theme => theme('colors'),
      placeholderOpacity: theme => theme('opacity'),
      space: (theme, { negative }) => ({
         ...theme('spacing'),
         ...negative(theme('spacing'))
      }),
      stroke: {
         current: 'currentColor'
      },
      strokeWidth: {
         '0': '0',
         '1': '1',
         '2': '2'
      },
      textColor: theme => theme('colors'),
      textOpacity: theme => theme('opacity'),
      width: theme => ({
         auto: 'auto',
         ...theme('spacing'),
         '1/2': '50%',
         '1/3': '33.333333%',
         '2/3': '66.666667%',
         '1/4': '25%',
         '2/4': '50%',
         '3/4': '75%',
         '1/5': '20%',
         '2/5': '40%',
         '3/5': '60%',
         '4/5': '80%',
         '1/6': '16.666667%',
         '2/6': '33.333333%',
         '3/6': '50%',
         '4/6': '66.666667%',
         '5/6': '83.333333%',
         '1/12': '8.333333%',
         '2/12': '16.666667%',
         '3/12': '25%',
         '4/12': '33.333333%',
         '5/12': '41.666667%',
         '6/12': '50%',
         '7/12': '58.333333%',
         '8/12': '66.666667%',
         '9/12': '75%',
         '10/12': '83.333333%',
         '11/12': '91.666667%',
         '18.8': '18.8%',
         '22.8': '22.8%',
         '43.3': '43.3%',
         '44.44': '44.44%',
         '45': '45%',
         '48%': '48%',
         '51': '51%',
         '53': '53%',
         '55': '55%',
         '77.2': '77.2%',
         '80': '80%',
         '84': '84%',
         '85': '85%',
         '88': '88%',
         '91.1': '91.1%',
         '92': '92%',
         '92.2': '92.2%',
         '95.1': '95.1%',
         '18px': '18px',
         '24px': '24px',
         '40px': '40px',
         '48px': '48px',
         '80px': '80px',
         '87px': '87px',
         '92px': '92px',
         '150px': '150px',
         '163px': '163px',
         '179px': '179px',
         '192px': '192px',
         '234px': '234px',
         '245px': '245px',
         '95': '95%',
         '360px': '360px',
         '530px': '530px',
         '25vw': '25vw',
         full: '100%',
         screen: '100vw',
         inherit: 'inherit',
         maxContent: 'max-content'
      }),
      zIndex: {
         auto: 'auto',
         '0': '0',
         '10': '10',
         '20': '20',
         '30': '30',
         '40': '40',
         '50': '50',
         '100': '100',
         '150': '150'
      },
      gap: theme => theme('spacing'),
      gridTemplateColumns: {
         none: 'none',
         '1': 'repeat(1, minmax(0, 1fr))',
         '2': 'repeat(2, minmax(0, 1fr))',
         '3': 'repeat(3, minmax(0, 1fr))',
         '4': 'repeat(4, minmax(0, 1fr))',
         '5': 'repeat(5, minmax(0, 1fr))',
         '6': 'repeat(6, minmax(0, 1fr))',
         '7': 'repeat(7, minmax(0, 1fr))',
         '8': 'repeat(8, minmax(0, 1fr))',
         '9': 'repeat(9, minmax(0, 1fr))',
         '10': 'repeat(10, minmax(0, 1fr))',
         '11': 'repeat(11, minmax(0, 1fr))',
         '12': 'repeat(12, minmax(0, 1fr))'
      },
      gridColumn: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6',
         'span-7': 'span 7 / span 7',
         'span-8': 'span 8 / span 8',
         'span-9': 'span 9 / span 9',
         'span-10': 'span 10 / span 10',
         'span-11': 'span 11 / span 11',
         'span-12': 'span 12 / span 12'
      },
      gridColumnStart: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12',
         '13': '13'
      },
      gridColumnEnd: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7',
         '8': '8',
         '9': '9',
         '10': '10',
         '11': '11',
         '12': '12',
         '13': '13'
      },
      gridTemplateRows: {
         none: 'none',
         '1': 'repeat(1, minmax(0, 1fr))',
         '2': 'repeat(2, minmax(0, 1fr))',
         '3': 'repeat(3, minmax(0, 1fr))',
         '4': 'repeat(4, minmax(0, 1fr))',
         '5': 'repeat(5, minmax(0, 1fr))',
         '6': 'repeat(6, minmax(0, 1fr))'
      },
      gridRow: {
         auto: 'auto',
         'span-1': 'span 1 / span 1',
         'span-2': 'span 2 / span 2',
         'span-3': 'span 3 / span 3',
         'span-4': 'span 4 / span 4',
         'span-5': 'span 5 / span 5',
         'span-6': 'span 6 / span 6'
      },
      gridRowStart: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7'
      },
      gridRowEnd: {
         auto: 'auto',
         '1': '1',
         '2': '2',
         '3': '3',
         '4': '4',
         '5': '5',
         '6': '6',
         '7': '7'
      },
      transformOrigin: {
         center: 'center',
         top: 'top',
         'top-right': 'top right',
         right: 'right',
         'bottom-right': 'bottom right',
         bottom: 'bottom',
         'bottom-left': 'bottom left',
         left: 'left',
         'top-left': 'top left'
      },
      scale: {
         '0': '0',
         '50': '.5',
         '75': '.75',
         '90': '.9',
         '95': '.95',
         '100': '1',
         '105': '1.05',
         '110': '1.1',
         '125': '1.25',
         '150': '1.5'
      },
      rotate: {
         '-180': '-180deg',
         '-90': '-90deg',
         '-45': '-45deg',
         '0': '0',
         '45': '45deg',
         '90': '90deg',
         '180': '180deg'
      },
      translate: (theme, { negative }) => ({
         ...theme('spacing'),
         ...negative(theme('spacing')),
         '-full': '-100%',
         '-1/2': '-50%',
         '1/2': '50%',
         full: '100%'
      }),
      skew: {
         '-12': '-12deg',
         '-6': '-6deg',
         '-3': '-3deg',
         '0': '0',
         '3': '3deg',
         '6': '6deg',
         '12': '12deg'
      },
      transitionProperty: {
         none: 'none',
         all: 'all',
         default:
            'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
         colors: 'background-color, border-color, color, fill, stroke',
         opacity: 'opacity',
         shadow: 'box-shadow',
         transform: 'transform'
      },
      transitionTimingFunction: {
         linear: 'linear',
         in: 'cubic-bezier(0.4, 0, 1, 1)',
         out: 'cubic-bezier(0, 0, 0.2, 1)',
         'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      transitionDuration: {
         '75': '75ms',
         '100': '100ms',
         '150': '150ms',
         '200': '200ms',
         '300': '300ms',
         '500': '500ms',
         '700': '700ms',
         '1000': '1000ms'
      },
      transitionDelay: {
         '75': '75ms',
         '100': '100ms',
         '150': '150ms',
         '200': '200ms',
         '300': '300ms',
         '500': '500ms',
         '700': '700ms',
         '1000': '1000ms'
      }
   },
   variants: {
      accessibility: ['responsive', 'focus'],
      alignContent: ['responsive'],
      alignItems: ['responsive'],
      alignSelf: ['responsive'],
      appearance: ['responsive'],
      backgroundAttachment: ['responsive'],
      backgroundColor: ['responsive', 'hover', 'focus'],
      backgroundOpacity: ['responsive', 'hover', 'focus'],
      backgroundPosition: ['responsive'],
      backgroundRepeat: ['responsive'],
      backgroundSize: ['responsive'],
      borderCollapse: ['responsive'],
      borderColor: ['responsive', 'hover', 'focus'],
      borderOpacity: ['responsive', 'hover', 'focus'],
      borderRadius: ['responsive'],
      borderStyle: ['responsive'],
      borderWidth: ['responsive'],
      boxShadow: ['responsive', 'hover', 'focus'],
      boxSizing: ['responsive'],
      cursor: ['responsive'],
      display: ['responsive'],
      divideColor: ['responsive'],
      divideOpacity: ['responsive'],
      divideWidth: ['responsive'],
      fill: ['responsive'],
      flex: ['responsive'],
      flexDirection: ['responsive'],
      flexGrow: ['responsive'],
      flexShrink: ['responsive'],
      flexWrap: ['responsive'],
      float: ['responsive'],
      clear: ['responsive'],
      fontFamily: ['responsive'],
      fontSize: ['responsive'],
      fontSmoothing: ['responsive'],
      fontStyle: ['responsive'],
      fontWeight: ['responsive', 'hover', 'focus'],
      height: ['responsive'],
      inset: ['responsive'],
      justifyContent: ['responsive'],
      letterSpacing: ['responsive'],
      lineHeight: ['responsive'],
      listStylePosition: ['responsive'],
      listStyleType: ['responsive'],
      margin: ['responsive'],
      maxHeight: ['responsive'],
      maxWidth: ['responsive'],
      minHeight: ['responsive'],
      minWidth: ['responsive'],
      objectFit: ['responsive'],
      objectPosition: ['responsive'],
      opacity: ['responsive', 'hover', 'focus'],
      order: ['responsive'],
      outline: ['responsive', 'focus'],
      overflow: ['responsive'],
      padding: ['responsive'],
      placeholderColor: ['responsive', 'focus'],
      placeholderOpacity: ['responsive', 'focus'],
      pointerEvents: ['responsive'],
      position: ['responsive'],
      resize: ['responsive'],
      space: ['responsive'],
      stroke: ['responsive'],
      strokeWidth: ['responsive'],
      tableLayout: ['responsive'],
      textAlign: ['responsive'],
      textColor: ['responsive', 'hover', 'focus'],
      textOpacity: ['responsive', 'hover', 'focus'],
      textDecoration: ['responsive', 'hover', 'focus'],
      textTransform: ['responsive'],
      userSelect: ['responsive'],
      verticalAlign: ['responsive'],
      visibility: ['responsive'],
      whitespace: ['responsive'],
      width: ['responsive'],
      wordBreak: ['responsive'],
      zIndex: ['responsive'],
      gap: ['responsive'],
      gridAutoFlow: ['responsive'],
      gridTemplateColumns: ['responsive'],
      gridColumn: ['responsive'],
      gridColumnStart: ['responsive'],
      gridColumnEnd: ['responsive'],
      gridTemplateRows: ['responsive'],
      gridRow: ['responsive'],
      gridRowStart: ['responsive'],
      gridRowEnd: ['responsive'],
      transform: ['responsive'],
      transformOrigin: ['responsive'],
      scale: ['responsive', 'hover', 'focus'],
      rotate: ['responsive', 'hover', 'focus'],
      translate: ['responsive', 'hover', 'focus'],
      skew: ['responsive', 'hover', 'focus'],
      transitionProperty: ['responsive'],
      transitionTimingFunction: ['responsive'],
      transitionDuration: ['responsive'],
      transitionDelay: ['responsive']
   },
   corePlugins: {},
   plugins: []
}
