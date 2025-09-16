<script setup>
import { Decimal } from "decimal.js";

import animals from "~/lib/data.json";

const { id } = useRoute().params;
const animal = animals.find(animal => animal.id === id);

definePageMeta({
  name: "animal",
});

const SHIPPING_COST = 90.00; // Frais d'expédition en dollars
const FOOD_COST = 10.00; // Prix d'un sac de nourriture en dollars
const LITTER_COST = 34.99; // Prix d'une litière en dollars
const TOY_COST = 8.99; // Prix d'un jouet en dollars

const images = animal.images.slice(1);

const purchaseStore = usePurchaseStore();
const { adoptionCost, shippingCost, numFoodBags, isLitterSelected, isToySelected, subTotal, taxes, total } = storeToRefs(purchaseStore);

adoptionCost.value = animal.adoptionCost; // Frais d'adoption en dollars
shippingCost.value = SHIPPING_COST;
</script>

<template>
  <div>
    <div role="alert" class="mx-auto alert alert-soft alert-error mt-8 text-white text-xl flex items-center justify-center gap-2 p-4">
      <Icon
        name="tabler:error"
        size="24"
      />
      <span>POSTES CANADA : En raison du risque de grève, nous ne garantissons pas que vous recevrez votre animal dans le même état que nous l'avons envoyé.</span>
    </div>

    <div class="container card mx-auto my-8 shadow-lg bg-white ">
      <div class="grid grid-cols-1 md:grid-cols-3 card-body justify-center">
        <!-- Images -->
        <div class="flex flex-col p-8 gap-4 mx-auto justify-between">
          <span class="text-3xl font-bold text-center">{{ animal.name }}</span>
          <NuxtImg
            class="rounded-xl"
            :src="animal.images[0]"
            :alt="animal.name"
            fit="cover"
            width="480"
            height="480"
          />
          <div class="flex gap-8">
            <div
              v-for="image in images"
              :key="image"
            >
              <NuxtImg
                class="rounded-lg"
                :src="image"
                :alt="animal.name"
                fit="cover"
                width="96"
                height="96"
              />
            </div>
          </div>
        </div>

        <!-- Extras -->
        <div class="flex flex-col p-8 gap-2 mt-12 mx-auto justify-between">
          <span class="font-bold text-2xl mb-4">Frais et suppléments</span>

          <div class="text-lg flex justify-between">
            <span class="font-bold">Frais d'adoption:</span> {{ adoptionCost.toFixed(2) }} $
          </div>

          <span class="text-green-700">* Le prix inclus les frais de vétérinaire. *</span>
          <div class="text-lg flex justify-between">
            <span class="font-bold">Frais d'expédition:</span> {{ shippingCost.toFixed(2) }} $
          </div>

          <span class="text-lg font-bold">Ajouter des extras:</span>
          <!-- Sacs de nourriture -->
          <div class="flex gap-4">
            <NuxtImg
              src="/images/food.jpg"
              alt="Sacs de nourriture"
              class="rounded-lg"
              width="96"
              height="96"
              fit="fill"
            />
            <label class="label gap-4 text-black text-lg flex-1 justify-between"><span>Sacs de nourriture ({{ FOOD_COST.toFixed(2) }} $):</span>
              <input
                v-model="numFoodBags"
                type="number"
                class="input input-bordered rounded-md input-lg"
                placeholder="0"
                min="0"
                max="10"
                step="1"
              >
            </label>
          </div>
          <!-- Litière -->
          <div class="flex gap-4">
            <NuxtImg
              src="/images/litter.jpg"
              alt="Sacs de nourriture"
              class="rounded-lg"
              width="96"
              height="96"
              fit="fill"
            />
            <label class="label gap-4 text-black text-lg flex-1 justify-between"><span>Litière ({{ LITTER_COST.toFixed(2) }} $):</span>
              <input
                v-model="isLitterSelected"
                type="checkbox"
                class="checkbox rounded-md checkbox-lg"
              >
            </label>
          </div>
          <!-- Jouets -->
          <div class="flex gap-4">
            <NuxtImg
              src="/images/toy.jpg"
              alt="Sacs de nourriture"
              class="rounded-lg"
              width="96"
              height="96"
              fit="fill"
            />
            <label class="label gap-4 text-black text-lg flex-1 justify-between"><span>Jouets ({{ TOY_COST.toFixed(2) }} $):</span>
              <input
                v-model="isToySelected"
                type="checkbox"
                class="checkbox rounded-md checkbox-lg"
              >
            </label>
          </div>
        </div>

        <!-- Facture -->
        <div class="flex flex-col p-8 gap-4 mt-12 mx-auto justify-between">
          <div class="text-lg flex-1 flex flex-col gap-2">
            <span class="font-bold text-2xl mb-4">Confirmation de la commande</span>

            <div class="flex justify-between">
              <span class="font-bold ">Frais d'adoption:</span>
              <span>{{ adoptionCost.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">Frais d'expédition:</span>
              <span>{{ shippingCost.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">Nourriture:</span>
              <span>{{ new Decimal(numFoodBags).mul(10).toNumber().toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">Litière:</span>
              <span>{{ isLitterSelected ? LITTER_COST.toFixed(2) : "0.00 $" }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">Jouets:</span>
              <span>{{ isToySelected ? TOY_COST.toFixed(2) : "0.00 $" }} $</span>
            </div>
            <div class="divider" />
            <div class="flex justify-between">
              <span class="font-bold">Sous-total:</span>
              <span>{{ subTotal.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">TPS :</span>
              <span>{{ taxes.tps.toFixed(2) }} $</span>
            </div>
            <div class="flex justify-between">
              <span class="font-bold">TVQ:</span>
              <span>{{ taxes.tvq.toFixed(2) }} $</span>
            </div>
            <div class="divider" />
            <div class="flex justify-between">
              <span class="font-bold">Total:</span>
              <span>{{ total.toFixed(2) }} $</span>
            </div>
          </div>
          <button class="btn btn-primary">
            Commander
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
