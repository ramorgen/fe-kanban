<template>
   <div v-if="ok" :class="store.lightMode ? '' : 'dark'" class="">
      <header
         class="absolute right-0 h-[64px] md:h-[81px] lg:h-[97px] transition-all dark:bg-kb_dark_grey border-b border-[#E4EBFA] dark:border-[#3E3F4E]"
         :class="classHeader"
      >
         <HeaderBar />
      </header>

      <aside
         class="absolute h-full lg:w-[300px] md:w-[261px] dark:bg-kb_dark_grey border-r border-[#E4EBFA] dark:border-[#3E3F4E]"
         :class="classAside"
      >
         <SidebarMenu />
         <DarkLightModeSwitch />
         <HideSidebar />
      </aside>

      <kbLogo />

      <main
         :class="classMain"
         class="bg-kb_light_grey dark:bg-kb_black overflow-scroll"
      >
         <ShowMain class="relative" />
         <ShowSidebar />
      </main>

      <ModalContainer />
   </div>
</template>

<script setup>
   import store from "./store"
   import d from "./data.json"

   const classHeader = computed(() => {
      if (store.wWidth < 768) {
         return "left-0 "
      }
      return store.hideAside
         ? "left-[209px]"
         : store.wWidth < 1050
         ? "left-[261px]"
         : "left-[300px]"
   })
   const classAside = computed(() => {
      if (store.wWidth < 768) {
         return "hidden "
      }
      if (store.hideAside) {
         return "-translate-x-[100rem]"
      }
   })

   const classMain = computed(() => {
      if (store.wWidth < 768) {
         return "top-[64px] left-0"
      }
      return store.hideAside ? "left-0 " : "_main"
   })

   let ok = ref(false)
   const setOk = () => {
      ok.value = true
   }
   onMounted(() => {
      store.setData(d)
      setOk()
   })
</script>

<style scoped>
   main {
      @apply absolute left-0  bottom-0 right-0;
   }
   @media (min-width: 1050px) {
      main {
         @apply top-[97px];
      }
      ._main {
         @apply left-[300px] top-[97px];
      }
   }

   @media (min-width: 768px) and (max-width: 1049px) {
      main {
         @apply top-[81px];
      }
      ._main {
         @apply left-[260px] top-[81px];
      }
   }

   .fade-enter-active,
   .fade-leave-active {
      transition: opacity 2.5s;
   }
   .fade-enter,
   .fade-leave-to {
      opacity: 0;
   }
   #app {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
   }
</style>
