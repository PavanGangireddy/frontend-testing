import React, { Component, ReactNode, ReactElement } from 'react'
import { observable, reaction } from 'mobx'
import { observer } from 'mobx-react'
import { withTranslation, WithTranslation } from 'react-i18next' // eslint-disable-line

import ReactSelectDropDownArrow from '../../icons/ReactSelectDropDownArrow'
import colors from '../../themes/Colors'
import { labelColors } from '../../constants/LabelColorConstant'
import { getIntensityColors, getTextColor } from '../../utils/ColorUtils'
import { isMobileDevice } from '../../utils/responsiveUtils'

import BaseModalContainer from '../BaseModalContainer'
import BottomDrawerModal from '../BottomDrawer/BottomDrawerModal'

import ColoredLabel from './ColoredLabel'
import {
   ColorPaletteWrapper,
   SelectedColor,
   ColoredLabelWrapper,
   ArrowContainer,
   Label,
   Container,
   IntensityColors,
   ColorBox,
   MobileColorsContainer,
   IntensityColorBox,
   SingleColorList,
   ColorsList,
   HeaderTitle
} from './styledComponents'

export interface ColorsProps {
   backgroundColor: string
   borderColor: string
   textColor: string | null
}

export interface LabelColor {
   colors: ColorsProps
   intensityColors: Array<ColorsProps>
}

interface ColorPaletteProps extends WithTranslation {
   labelColors?: Array<LabelColor>
   onChangeSelectedColor: (color: ColorsProps) => void
   stopPropagation?: boolean
   selectedColor?: string
   isDisabled?: boolean
   colorLabelTestId?: string
   dropDownColorTestId?: string
   intensityColorTestId?: string
}

@observer
class ColorPalette extends Component<ColorPaletteProps> {
   selectedIntensityColors!: Array<ColorsProps>
   @observable selectedColor!: ColorsProps
   @observable optionalLabelColors!: Array<LabelColor>
   @observable shouldShowIntensityColors!: boolean
   labelsDrawerRef

   // TODO:need update in colors in constants
   static defaultProps = {
      labelColors: labelColors,
      isDisabled: false,
      colorLabelTestId: 'colorLabel',
      dropDownColorTestId: 'dropDownColor',
      intensityColorTestId: 'intensityColor'
   }

   constructor(props) {
      super(props)
      if (this.props.labelColors) {
         this.optionalLabelColors = [...this.props.labelColors]
         this.selectedColor = this.props.labelColors[0].colors
         this.selectedIntensityColors = this.props.labelColors[0].intensityColors
         this.shouldShowIntensityColors = false
         this.labelsDrawerRef = React.createRef<BaseModalContainer>()
      }
   }

   componentDidMount(): void {
      const { selectedColor } = this.props
      if (selectedColor) {
         if (selectedColor !== '') {
            const textColor = getTextColor(selectedColor)
               ? getTextColor(selectedColor)
               : colors.darkBlueGrey
            this.selectedIntensityColors = getIntensityColors(selectedColor)
            this.selectedColor = {
               backgroundColor: selectedColor,
               borderColor: selectedColor,
               textColor: textColor
            }
            this.onChangeSelectedColor(this.selectedColor)
         }
      }
   }

   componentWillUnmount(): void {
      this.resetSelectedColor()
   }

   onChangeSelectedColor = (color): void => {
      const { onChangeSelectedColor } = this.props
      this.selectedColor = color
      onChangeSelectedColor(color)
   }

   onChangeLabelColor = (labelColor: LabelColor): void => {
      this.onChangeSelectedColor(labelColor.colors)
      this.selectedIntensityColors = labelColor.intensityColors
   }

   onChangeIntensityOfColor = (event, similarColor): void => {
      if (this.props.stopPropagation) event.stopPropagation()
      this.onChangeSelectedColor(similarColor)
      this.toggleShouldShowIntensityColors(event)
   }

   toggleShouldShowIntensityColors = (event): void => {
      if (this.props.stopPropagation) event.stopPropagation()
      this.shouldShowIntensityColors = !this.shouldShowIntensityColors
   }

   renderColoredLabels = (): ReactNode =>
      this.optionalLabelColors.map((item: LabelColor) => {
         const { isDisabled, colorLabelTestId } = this.props
         return (
            <ColoredLabel
               labelColor={item}
               key={item.colors.backgroundColor}
               onChangeSelectedColor={this.onChangeLabelColor}
               stopPropagation={this.props.stopPropagation}
               isDisabled={isDisabled}
               colorLabelTestId={colorLabelTestId}
            />
         )
      })

   renderIntensityColors = (): ReactNode => {
      const { intensityColorTestId } = this.props
      return this.selectedIntensityColors.map(similarColor => (
         <ColorBox
            key={similarColor.backgroundColor}
            similarColor={similarColor}
            onClick={event =>
               this.onChangeIntensityOfColor(event, similarColor)
            }
            data-testid={intensityColorTestId}
         ></ColorBox>
      ))
   }

   getIntesityColors = (): ReactNode => {
      if (this.shouldShowIntensityColors) {
         return (
            <IntensityColors>{this.renderIntensityColors()} </IntensityColors>
         )
      }
      return null
   }

   resetSelectedColor = reaction(
      () => {
         const { selectedColor } = this.props
         return selectedColor
      },
      () => {
         const { selectedColor } = this.props
         if (selectedColor === '') {
            const { labelColors } = this.props
            if (labelColors) {
               this.selectedColor = labelColors[0].colors
               this.selectedIntensityColors = getIntensityColors(
                  this.selectedColor.backgroundColor
               )
            }
         }
      }
   )

   getSelectedColor = (): ColorsProps => {
      const { selectedColor } = this.props
      if (selectedColor) {
         if (selectedColor !== '') {
            const textColor = getTextColor(selectedColor)
               ? getTextColor(selectedColor)
               : colors.darkBlueGrey
            this.selectedIntensityColors = getIntensityColors(selectedColor)
            return {
               backgroundColor: selectedColor,
               borderColor: selectedColor,
               textColor: textColor
            }
         }
      } else {
         const { labelColors } = this.props
         if (labelColors) {
            this.selectedIntensityColors = getIntensityColors(
               this.selectedColor.backgroundColor
            )
         }
      }
      return this.selectedColor
   }

   openMobileColorPaletteDrawer = (): void => {
      this.labelsDrawerRef.current?.openModal()
   }

   closeMobileColorPaletteDrawer = (): void => {
      this.labelsDrawerRef.current?.closeModal()
   }

   renderMobileIntensityColors = (): ReactNode => {
      const { intensityColorTestId } = this.props
      return labelColors.map(eachColor => (
         <SingleColorList key={eachColor.colors.backgroundColor}>
            {eachColor.intensityColors.map(eachIntensityColor => {
               const { backgroundColor, borderColor } = eachIntensityColor
               return (
                  <IntensityColorBox
                     key={backgroundColor}
                     backgroundColor={backgroundColor}
                     borderColor={borderColor}
                     onClick={() =>
                        this.onChangeSelectedColor(eachIntensityColor)
                     }
                     data-testid={intensityColorTestId}
                  />
               )
            })}
         </SingleColorList>
      ))
   }

   renderAddLabelHeaderTitle = (): ReactElement => {
      const { t } = this.props
      return <HeaderTitle>{t('common:colorPalette.addLabel')}</HeaderTitle>
   }

   renderMobileColorPaletteDrawer = () => {
      const {
         closeMobileColorPaletteDrawer,
         renderAddLabelHeaderTitle,
         renderMobileIntensityColors
      } = this
      return (
         <BottomDrawerModal
            innerRef={this.labelsDrawerRef}
            closeDrawer={closeMobileColorPaletteDrawer}
            headerContent={renderAddLabelHeaderTitle()}
         >
            <MobileColorsContainer>
               <ColorsList>{renderMobileIntensityColors()}</ColorsList>
            </MobileColorsContainer>
         </BottomDrawerModal>
      )
   }

   render(): ReactNode {
      const { t, isDisabled, dropDownColorTestId, selectedColor } = this.props
      const { openMobileColorPaletteDrawer } = this
      return (
         <Container>
            <Label>{t('common:colorPalette.label')}</Label>
            {isMobileDevice ? (
               <SelectedColor
                  selectedColor={this.getSelectedColor()}
                  data-testid={'selected-color'}
               >
                  <ArrowContainer
                     onClick={
                        isDisabled
                           ? (): void => {}
                           : openMobileColorPaletteDrawer
                     }
                     shouldShowIntensityColors={this.shouldShowIntensityColors}
                     isDisabled={isDisabled}
                     data-testid={dropDownColorTestId}
                  >
                     <ReactSelectDropDownArrow
                        fill={
                           selectedColor
                              ? getTextColor(selectedColor)
                              : colors.darkBlueGrey
                        }
                        width={10}
                        height={10}
                     />
                  </ArrowContainer>
               </SelectedColor>
            ) : (
               <ColorPaletteWrapper>
                  <SelectedColor
                     selectedColor={this.getSelectedColor()}
                     data-testid={'selected-color'}
                  >
                     <ArrowContainer
                        onClick={
                           isDisabled
                              ? (): void => {}
                              : this.toggleShouldShowIntensityColors
                        }
                        shouldShowIntensityColors={
                           this.shouldShowIntensityColors
                        }
                        isDisabled={isDisabled}
                        data-testid={dropDownColorTestId}
                     >
                        <ReactSelectDropDownArrow
                           fill={
                              selectedColor
                                 ? getTextColor(selectedColor)
                                 : colors.darkBlueGrey
                           }
                           width={10}
                           height={10}
                        />
                     </ArrowContainer>
                  </SelectedColor>
                  <ColoredLabelWrapper>
                     {this.renderColoredLabels()}
                  </ColoredLabelWrapper>
               </ColorPaletteWrapper>
            )}
            {isMobileDevice
               ? this.renderMobileColorPaletteDrawer()
               : this.getIntesityColors()}
         </Container>
      )
   }
}

export default withTranslation('translation', { withRef: true })(ColorPalette)
