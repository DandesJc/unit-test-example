const { test, describe, it } = require('node:test');
const assert = require('node:assert');
const {
    tiMonth,
    fuelEnergySelector,
    electricalConsumption,
    costElectricalKM,
    combustionConsumption,
    fuelConsumption,
    fuelEfficiency,
    fuelCostKm,
    energyKm,
    emisionKm,
    savedEnergy,
    avoidedEmissions,
    monthlySavings,
    annualSavings,
    bienvenida
} = require('../calculators/environment');

describe("Pruebas de funciones ambientales", () => {

    it("tiMonth debería retornar un valor cercano esperado (assert.ok)", () => {
        const result = tiMonth(1.4);
        assert.ok(Math.abs(result - 0.00115924683853086) < 1e-10);
    });

    it("fuelEnergySelector retorna los datos correctos para Diesel (assert.deepStrictEqual)", () => {
        assert.deepStrictEqual(fuelEnergySelector("Diesel"), {
            fuel_price: 333,
            fuel_energy: 222,
            emision_factor: 111
        });
    });

    it("electricalConsumption devuelve un número esperado (assert.strictEqual)", () => {
        const result = electricalConsumption(90, 200);
        assert.strictEqual(result, 90 / (200 * 0.9));
    });

    it("fuelEfficiency devuelve un valor mayor a 100 (assert.ok)", () => {
        const fuel_cons = 0.007;
        const result = fuelEfficiency(fuel_cons);
        assert.ok(result > 100);
    });

    it("bienvenida devuelve una cadena personalizada (assert.match)", () => {
        const saludo = bienvenida("Jhoa");
        assert.match(saludo, /Hola Jhoan/);
    });

    it("costElectricalKM y fuelCostKm no deben dar el mismo valor (assert.notStrictEqual)", () => {
        const elecCost = costElectricalKM(0.45, 238.25);
        const fuelCost = fuelCostKm(16700, 0.0075);
        assert.notStrictEqual(elecCost, fuelCost);
    });

    it("emisionKm retorna un número (assert.strictEqual typeof)", () => {
        const energiaKm = energyKm(1.6);
        const emision = emisionKm(111, energiaKm);
        assert.strictEqual(typeof emision, "number");
    });

    it("fuelEnergySelector retorna error con valor no válido (assert.deepStrictEqual)", () => {
        const result = fuelEnergySelector("invalid");
        assert.deepStrictEqual(result, {
            error: "Tipo de combustible no válido",
            error_code: 500
        });
    });

});
