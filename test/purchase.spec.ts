import { assert } from "chai";
import { Decimal } from "decimal.js";

import { calculateSubTotal, calculateTaxes, calculateTotal } from "../app/utils/purchase.ts";

// Suite de tests pour la fonction calculateSubTotal()
describe("la fonction calculateSubTotal()", () => {
  // Cas de base : pas d'extras
  it("retourne le bon sous-total sans extras", () => {
    const resultat = calculateSubTotal(123, 45, 0, false, false);
    assert.strictEqual(Decimal(resultat).toDecimalPlaces(2).toNumber(), 168, "Le résultat doit être égal à 168");
  });

  // Cas: avec extras
  it("retourne le bon sous-total avec extras", () => {
    const resultat = calculateSubTotal(67, 8, 9, true, true);
    assert.strictEqual(Decimal(resultat).toDecimalPlaces(2).toNumber(), 208.98, "Le résultat doit être égal à 208.98");
  });

  // Cas: tout à zéro
  it("retourne zéro si tout est à zéro", () => {
    const resultat = calculateSubTotal(0, 0, 0, false, false);
    assert.strictEqual(resultat, 0, "Le résultat doit être égal à 0");
  });

  // Cas: Résultat arrondi à 2 décimales (échoue car on garde toutes les décimales)
  it.skip("retourne le sous-total arrondi à 2 décimales", () => {
    const resultat = calculateSubTotal(123.45678911111111, 45.6789, 0, false, false); // Donne 169.14
    // Ajouter l'assertion.
    assert.strictEqual(resultat, 169.14, "Le résultat doit être égal à 169.14");
  });

  // TODO: Cas: S'assurer que le résultat de la fonction n'est jamais arrondi (garder toutes les décimales).
  // --------------------------------
  //      À faire en classe.
  // --------------------------------

  // Cas: paramètres négatifs
  it("retourne une erreur si les coûts et les quantités sont négatifs", () => {
    assert.throws(
      () => calculateSubTotal(-123, -45, -6, false, false),
      TypeError,
      "Les coûts et les quantités doivent être des nombres positifs",
    );
  });
});

// Suite de tests pour la fonction calculateTaxes()
describe("la fonction calculateTaxes()", () => {
  // Cas de base: sous-total positif
  it("retourne la bonne tps et tvq", () => {
    const resultat = calculateTaxes(123);
    assert.strictEqual(Decimal(resultat.tps).toDecimalPlaces(2).toNumber(), 6.15, "Le résultat doit être égal à 6.15");
    assert.strictEqual(Decimal(resultat.tvq).toDecimalPlaces(2).toNumber(), 12.27, "Le résultat doit être égal à 12.27");
  });

  // Cas: sous-total zéro
  it("retourne zéro si le sous-total est zéro", () => {
    const resultat = calculateTaxes(0);
    assert.strictEqual(Decimal(resultat.tps).toDecimalPlaces(2).toNumber(), 0, "Le résultat doit être égal à 0");
    assert.strictEqual(Decimal(resultat.tvq).toDecimalPlaces(2).toNumber(), 0, "Le résultat doit être égal à 0");
  });

  // Cas: sous-total négatif
  it("retourne une erreur si le sous-total est négatif", () => {
    assert.throws(() => calculateTaxes(-123), TypeError, "Le sous-total doit être un nombre positif.");
  });
});

// Suite de tests pour la fonction calculateTotal()
describe("la fonction calculateTotal()", () => {
  // Cas de base: sous-total et taxes positifs
  it("retourne le bon total", () => {
    const resultat = calculateTotal(123, { tps: 6.15, tvq: 12.27 });
    assert.strictEqual(Decimal(resultat).toDecimalPlaces(2).toNumber(), 141.42, "Le résultat doit être égal à 141.42");
  });

  // Cas: sous-total zéro
  it("retourne zéro si le sous-total ou les taxes sont zéro", () => {
    const resultat = calculateTotal(0, { tps: 0, tvq: 0 });
    assert.strictEqual(resultat, 0, "Le résultat doit être égal à 0");
  });

  // Cas: sous-total et taxes négatifs
  it("retourne une erreur si le sous-total ou les taxes sont négatifs", () => {
    assert.throws(() => calculateTotal(-123, { tps: -6.15, tvq: -12.27 }), TypeError, "Le sous-total et les taxes doivent être des nombres positifs.");
  });
});
