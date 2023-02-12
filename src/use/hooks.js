import { onKeyStroke } from "@vueuse/core"

export function useEsc() {
   onKeyStroke("Escape", (e) => {
      close()
   })
}
