const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, bienvenida, fuelEnergySelector, electricalConsumption, costElectricalKM, fuelConsumption, combustionConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm, savedEnergy, avoidedEmissions, monthlySavings, annualSavings} = require('../../calculators/environment')

const tableInjected = 'my_table'


router.get('/bienvenida/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre
        bienvenida(nombre)
        response.success(req, res, nombre, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})

router.get('/list', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.list(tableInjected);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.get('/list2', async (req, res) => {
    try {
        response.success(req, res, tiMonth(1.4), 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.get('/env_test/:fuel', async (req, res) => {
    try {
        const fuel = req.params.fuel

        const electrical_consumption = electricalConsumption(81.14, 200)
        const combustion_consumption = combustionConsumption(electrical_consumption);
        const fuel_selector = fuelEnergySelector(fuel);
        const fuel_consumption = fuelConsumption(combustion_consumption, fuel_selector["fuel_energy"] )
        const annual_use = 15000 // ejemplo
        const emisiones_km = emisionKm(fuel_selector["emision_factor"], energyKm(combustion_consumption));
        const saved_energy = savedEnergy(combustion_consumption, electrical_consumption, annual_use);

        const list = {
            month_inflation: tiMonth(1.4),
            fuel_select: fuel_selector,
            electrical_consumption: electrical_consumption,
            cost_electrical_km: costElectricalKM(electrical_consumption, 238.25),
            combustion_consumption: combustion_consumption, 
            fuel_consumption: fuel_consumption,
            fuel_efficiency: fuelEfficiency(fuel_consumption),
            fuel_cost_km: fuelCostKm(fuel_selector["fuel_price"], fuel_consumption),
            energy_km: energyKm(combustion_consumption),
            emision_km: emisiones_km,
            saved_energy: saved_energy,
            avoided_emissions: avoidedEmissions(emisiones_km, annual_use),
            monthly_savings: monthlySavings(fuelCostKm(fuel_selector["fuel_price"], fuel_consumption), costElectricalKM(electrical_consumption, 238.25), annual_use),
            annual_savings: annualSavings(monthlySavings(fuelCostKm(fuel_selector["fuel_price"], fuel_consumption), costElectricalKM(electrical_consumption, 238.25), annual_use), tiMonth(1.4)),
            bienvenida: bienvenida("Stiward")
        };
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})



router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const list = await ctrl.listById(tableInjected, id);
        response.success(req, res, list, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500); 
    }
})


router.post('/add', async (req, res) => {
    try {
        await ctrl.addElement(tableInjected, data = {
            "data": req.body.data,
        });
        response.success(req, res, `Item Created`, 200);    
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


router.put('/update', async (req, res) => {
    try {
        let { id, data } = req.body;
        await ctrl.updateElement(tableInjected, data = {
            "id": id,
            "data": data,
        });
        response.success(req, res, `Item updated`, 200);     
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});


module.exports = router ;