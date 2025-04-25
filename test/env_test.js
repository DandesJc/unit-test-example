const {test, describe, it} = require('node:test');
const assert = require('node:assert');
const {tiMonth, fuelEnergySelector} = require("../calculators/environment");


// test('env_ipc', () => { 
//     assert.strictEqual(tiMonth(1.4), 5)
// })

describe("", () => {
    // it("Test colection 1", () => {
    //     assert.strictEqual(fuelEnergySelector(), 5)
    // })

    it("Test Object Empty", () => {
        assert.notEqual(fuelEnergySelector("Diesel"), 0)
    })

    // it("Test colection 3", () => {
    //     assert.strictEqual(fuelEnergySelector(), 5)
    // })
})