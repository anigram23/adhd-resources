"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

// Long unbroken strings (UUIDs, emails, URLs) wrap instead of overflowing on narrow screens.
const system = createSystem(defaultConfig, {
  globalCss: { body: { overflowWrap: "anywhere" } },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
