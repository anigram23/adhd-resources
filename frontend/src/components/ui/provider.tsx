"use client"

import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {
  nativeSelectAnatomy,
  numberInputAnatomy,
  pinInputAnatomy,
  selectAnatomy,
} from "@chakra-ui/react/anatomy"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"

const outlineBorder = { borderColor: "border.emphasized" }
const flushedBorder = { borderBottomColor: "border.emphasized" }

// Long unbroken strings (UUIDs, emails, URLs) wrap instead of overflowing on narrow screens.
const system = createSystem(defaultConfig, {
  globalCss: { body: { overflowWrap: "anywhere" } },
  theme: {
    recipes: {
      input: {
        variants: {
          variant: {
            outline: outlineBorder,
            flushed: flushedBorder,
          },
        },
      },
      textarea: {
        variants: {
          variant: {
            outline: outlineBorder,
            flushed: flushedBorder,
          },
        },
      },
      inputAddon: {
        variants: {
          variant: {
            outline: outlineBorder,
          },
        },
      },
    },
    slotRecipes: {
      nativeSelect: {
        slots: nativeSelectAnatomy.keys(),
        variants: {
          variant: {
            outline: { field: outlineBorder },
          },
        },
      },
      select: {
        slots: selectAnatomy.keys(),
        variants: {
          variant: {
            outline: { trigger: outlineBorder },
          },
        },
      },
      numberInput: {
        slots: numberInputAnatomy.keys(),
        variants: {
          variant: {
            outline: { input: outlineBorder },
            flushed: { input: flushedBorder },
          },
        },
      },
      pinInput: {
        slots: pinInputAnatomy.keys(),
        variants: {
          variant: {
            outline: { input: outlineBorder },
            flushed: { input: flushedBorder },
          },
        },
      },
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      {/* Light mode only: hardcoded palette colors aren't dark-mode aware yet. */}
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  )
}
