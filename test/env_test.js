const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector} = require("../calculators/environment");


test('env_ipc', () => { 
    assert.strictEqual(tiMonth(1.4), 5)
})

describe("", () => {

    it("Gasoline case", () => {
        assert.deepStrictEqual(fuelEnergySelector("gasoline"), {
            "fuel_price": 16700,
            "fuel_energy": 35.58,
            "emision_factor": 69.25
        })
    })

    it("Diesel case", () => {
        assert.deepStrictEqual(fuelEnergySelector("gasoline"), {
            "fuel_price": 11795,
            "fuel_energy": 40.7,
            "emision_factor": 74.01
        })
    })


})