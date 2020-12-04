import React from 'react'

function withLocationPathAsKey<T>(WrappedComponent: React.ComponentType<T>) {
   //TODO:need to update the types
   function LocationPathAskey(props: any) {
      return <WrappedComponent key={props.location.pathname} {...props} />
   }
   return LocationPathAskey
}

export default withLocationPathAsKey
