//NOTE: As Object.values is not yet supported by all browsers, We are overriding at global level
export function overrideObjectDotValues(): void {
   Object.values = obj => Object.keys(obj).map(key => obj[key])
}

export function overrideConsole(): void {
   if (process.env.NODE_ENV !== 'development') {
      console.log = () => {}
      console.warn = () => {}
      console.error = () => {}
      console.info = () => {}
      console.trace = () => {}
      console.debug = () => {}
   }
}

overrideObjectDotValues()
overrideConsole()
