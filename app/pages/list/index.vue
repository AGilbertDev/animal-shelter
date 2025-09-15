<script setup>
import animals from "~/lib/data.json";
</script>

<template>
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 my-8">
    <NuxtLink
      v-for="animal in animals"
      :key="animal.id"
      :to="`/animal/${animal.id}`"
      class="card bg-white shadow-lg max-w-[300px] mx-auto hover:scale-105 transition-all duration-300"
    >
      <figure class="relative aspect-square overflow-hidden w-[300px] h-[300px] mx-auto">
        <div v-if="animal.rabies" class="flex absolute top-2 right-2 p-4 badge badge-warning text-lg">
          <Icon
            name="tabler:vaccine"
            size="24"
          />
          Rage
        </div>
        <div v-if="animal.language" class="flex absolute top-2 right-2 p-4 badge badge-warning text-lg">
          <Icon
            name="tabler:language"
            size="24"
          />
          Language ordurier
        </div>
        <div v-if="animal.killer" class="flex absolute top-2 right-2 p-4 badge badge-error text-white text-lg">
          <Icon
            name="tabler:skull"
            size="24"
          />
          A déjà tué
        </div>
        <NuxtImg
          class="w-full h-full"
          :src="animal.images[0]"
          :alt="animal.name"
          fit="cover"
          width="480"
          height="480"
          format="webp"
          densitis="x1 x2"
          loading="lazy"
          preload
          :modifiers="{ roundCorner: '0:100' }"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ animal.name }}
        </h2>
        <p class="text-sm text-gray-500">
          {{ animal.species }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
