import * as React from 'react'

import Colors from '../../themes/Colors'

import Loader from '../Loader'

import { StyledButton, ButtonText } from './styledComponents'
import { sizes, variants, shapes } from './constants'
import styles from './styles.module.css'

type Size = 'SMALL'

type Shape = 'PILL' | 'ROUND' | 'SQUARE' | 'DEFAULT'

type Variant = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'

export interface ButtonProps {
   onClick: Function
   isLoading: boolean
   className: string
   disabled: boolean
   renderLoader: Function
   id?: string
   size?: Size
   shape?: Shape
   variant?: Variant
}

class Button extends React.Component<ButtonProps> {
   static defaultProps = {
      isLoading: false,
      disabled: false,
      renderLoader: () => (
         <Loader
            color={Colors.primaryColor}
            height={15}
            width={15}
            className={styles.loaderStyles}
         />
      ),
      className: '',
      id: 'button'
   }

   static sizes: any = sizes //TODO: need to update this types
   static variants: any = variants
   static shapes: any = shapes
   renderContentBasedOnStatus = (): React.ReactNode => {
      const { renderLoader, isLoading, children } = this.props

      if (isLoading) {
         return renderLoader()
      }
      if (typeof children === 'string')
         return <ButtonText>{children}</ButtonText>

      return <>{children}</>
   }

   render() {
      const {
         onClick,
         disabled,
         className,
         id,
         isLoading,
         variant,
         shape,
         ...otherProps
      } = this.props
      return (
         <StyledButton
            onClick={onClick}
            disabled={disabled || isLoading}
            className={className}
            id={id}
            data-testid={id}
            variant={variant}
            shape={shape}
            {...otherProps}
         >
            {this.renderContentBasedOnStatus()}
         </StyledButton>
      )
   }
}

export default Button
