<template>
  <div class="flex flex-col min-h-screen bg-base-300">
    <AppNavbar />
    <main class="flex flex-1 flex-col">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
