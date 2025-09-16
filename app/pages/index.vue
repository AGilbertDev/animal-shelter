<template>
  <div class="relative flex flex-1 w-full">
    <!-- Background image positioned to the right 2/3 -->
    <div class="absolute top-0 right-0 w-4/5 h-full bg-[url('~/assets/images/hero.jpg')] bg-cover bg-center" />
    <!-- Full-width gradient overlay -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(7,10,17,1)_25%,rgba(7,10,17,.75)_50%,transparent_80%)]" />
    <!-- Content can go here -->
    <div class="relative z-10 flex items-center justify-center flex-1 text-white lg:max-w-1/2">
      <!-- Add your hero content here -->
      <div>
        <div class="hero-content text-center">
          <div class="flex flex-col gap-10 max-w-3xl">
            <h1 class="text-5xl">
              Refuge pour les animaux moins appréciés
            </h1>
            <p class="py-6 text-lg">
              Refuge et centre d'adoption pour animaux moins populaires. Familles d'accueil recherchées. Pendant que vous hésitez, un animal est seul, a peur, a froid. Adoptez aujourd’hui et faites la bonne chose. Une adoption peut changer une vie.
            </p>
            <div class="flex items-center justify-center gap-4">
              <NuxtLink :to="{ name: 'list' }" class="btn btn-white btn-lg">
                <Icon
                  name="tabler:heart"
                  size="24"
                />
                J'adopte !
              </NuxtLink>
            </div>
            <p class="uppercase text-xs">
              * Aucun retour ni remboursement.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
