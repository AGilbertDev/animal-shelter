import { Decimal } from "decimal.js/decimal"; // Évite les erreurs de précision lors de calculs avec des nombre réels.

// Constantes des prix
const FOOD_COST = Decimal(10);
const LITTER_COST = Decimal(34.99);
const TOY_COST = Decimal(8.99);
const TPS_RATE = Decimal(0.05);
const TVQ_RATE = Decimal(0.09975);

/**
 * Calcule le sous-total de la commande
 * @param adoptionCost - (réel) Frais d'adoption en dollars.
 * @param shippingCost - (réel) Frais d'expédition en dollars.
 * @param numFoodBags - (entier) Nombre de sacs de nourriture.
 * @param isLitterSelected - (booléen) Ajout de la litière sélectionnée.
 * @param isToySelected - (booléen) Ajout du jouet sélectionné.
 * @returns (réel) Le sous-total de la commande.
 */
function calculateSubTotal(adoptionCost: number, shippingCost: number, numFoodBags: number, isLitterSelected: boolean, isToySelected: boolean): number {
  // 1. Validation des paramètres

  // **Avec Typescript, les types des paramètres sont déjà validés par la fonction.**

  // Les coûts et les quantités doivent être positifs
  if (Number(adoptionCost) < 0
    || Number(shippingCost) < 0
    || Number(numFoodBags) < 0
  ) {
    throw new TypeError("Les coûts et les quantités doivent être des nombres positifs.");
  }

  // 2. Calcul du sous-total
  const subTotal = new Decimal(adoptionCost)
    .add(new Decimal(shippingCost))
    .add(new Decimal(numFoodBags).mul(FOOD_COST))
    .add(new Decimal(isLitterSelected ? LITTER_COST : 0))
    .add(new Decimal(isToySelected ? TOY_COST : 0))
    .toNumber();

  return subTotal;
}

/**
 * Calcule les taxes de la commande
 * @param subTotal - (réel) Le sous-total de la commande.
 * @returns (objet) Les taxes de la commande.
 */
function calculateTaxes(subTotal: number): { tps: number; tvq: number } {
  // 1. Validation des paramètres

  //   Le sous-total doit être positif
  if (Number(subTotal) < 0) {
    throw new TypeError("Le sous-total doit être un nombre positif.");
  }

  // 2. Calcul des 2 taxes individuelles
  const tps = new Decimal(subTotal).mul(TPS_RATE).toNumber();
  const tvq = new Decimal(subTotal).mul(TVQ_RATE).toNumber();

  return {
    tps,
    tvq,
  };
}

/**
 * Calcule le total de la commande
 * @param subTotal - (réel) Le sous-total de la commande.
 * @param taxes - (objet) Les taxes de la commande.
 * @param taxes.tps - (réel) La taxe sur les produits et services.
 * @param taxes.tvq - (réel) La taxe sur la valeur ajoutée.
 * @returns (réel) Le total de la commande.
 */
function calculateTotal(subTotal: number, taxes: { tps: number; tvq: number }): number {
  // 1. Validation des paramètres

  // Les taxes doivent être positifs
  if (Number(subTotal) < 0 || Number(taxes.tps) < 0 || Number(taxes.tvq) < 0) {
    throw new TypeError("Le sous-total et les taxes doivent être des nombres positifs.");
  }

  // 2. Calcul du total
  const total = new Decimal(subTotal).add(new Decimal(taxes.tps)).add(new Decimal(taxes.tvq)).toNumber();

  return total;
}

export { calculateSubTotal, calculateTaxes, calculateTotal };
