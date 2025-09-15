import { defineStore } from "pinia";

import { calculateSubTotal, calculateTaxes, calculateTotal } from "~/utils/purchase";

export const usePurchaseStore = defineStore("purchase", () => {
  // Variables d'état
  const adoptionCost = ref<number>(0); // Frais d'adoption en dollars
  const shippingCost = ref<number>(0); // Frais d'expédition en dollars
  const numFoodBags = ref<number>(0); // Nombre de sacs de nourriture
  const isLitterSelected = ref<boolean>(false); // Ajout de la litière sélectionnée
  const isToySelected = ref<boolean>(false); // Ajout du jouet sélectionné

  // Getters
  const subTotal = computed(() => {
    return calculateSubTotal(adoptionCost.value, shippingCost.value, numFoodBags.value, isLitterSelected.value, isToySelected.value);
  });

  const taxes = computed(() => {
    return calculateTaxes(subTotal.value);
  });

  const total = computed(() => {
    return calculateTotal(subTotal.value, taxes.value);
  });

  // Setters
  function updateAdoptionCost(newAdoptionCost: number): void {
    adoptionCost.value = newAdoptionCost;
  }

  function updateShippingCost(newShippingCost: number): void {
    shippingCost.value = newShippingCost;
  }

  return {
    // Variables d'état
    adoptionCost,
    shippingCost,
    numFoodBags,
    isLitterSelected,
    isToySelected,

    // Getters
    subTotal,
    taxes,
    total,

    // Setters
    updateAdoptionCost,
    updateShippingCost,
  };
});
