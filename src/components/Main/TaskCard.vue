<template>
   <article
      class="w-[17.5rem] rounded-lg bg-white dark:bg-kb_dark_grey dark:text-white shadow-card cursor-pointer hover:scale-105"
   >
      <h3 class="pt-4 mx-4">
         <slot name="title"></slot>
      </h3>
      <p class="mt-1 mx-4 pb-4 body_m !text-kb_medium_grey">
         <slot name="countSubTasks"></slot>
      </p>
   </article>
</template>
