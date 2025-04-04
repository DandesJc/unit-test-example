const tiMonth = (ipc) => {
    const ti = (((1+(((ipc)/100)))**(1/12))-1)
    console.log(ti)
    return ti
} 

const fuelEnergySelector = async (data, scraping) => {
    let fuel_info = {}
    if (data === 'diesel' || data == 'Diesel') {
        fuel_info['fuel_price'] = scraping['diesel_price']
        fuel_info['fuel_energy'] = ('diesel_energy')
        fuel_info['emision_factor'] = ('emision_factor_diesel')
        return fuel_info
    }
    else {
        fuel_info['fuel_price'] = scraping['fuel_price']
        fuel_info['fuel_energy'] = ('gasoline_energy')
        fuel_info['emision_factor'] = ('emision_factor_gasoline')
        return fuel_info
    }
}

//  kWh/km
const electricalConsumption = async (nominal_energy, autonomy_nominal) => {

    const electrical_consumption = (nominal_energy/(autonomy_nominal*('autonomy_factor')))
    return electrical_consumption
}

//  $/Km
const costElectricalKM = (electrical_consumption, energy_price) => {
    const cost_electrical_km = (energy_price * electrical_consumption)

    return cost_electrical_km
}

const combustionConsumption = async (electrical_consumption) => {
    const combustion_consumption = (electrical_consumption / ('combustion_engine_efficiency') )

    return combustion_consumption
}

const fuelConsumption = (combustion_consumption, fuel_energy) => {

    const fuel_consumption = (combustion_consumption/fuel_energy)

    return fuel_consumption
}

const fuelEfficiency = (fuel_consumption) => {
    const fuel_efficiency = (1/fuel_consumption)

    return fuel_efficiency
}

const fuelCostKm = (fuel_price, fuel_consumption) => {
    const fuel_cost_km = (fuel_price['fuel_price']*fuel_consumption)
    
    return fuel_cost_km
}

const energyKm = (combustion_consumption) => {
    const energy_km = (combustion_consumption*((3.6)*(10**6)))
    
    return energy_km
}

const emisionKm = (emision_factor, energy_km) => {
    const emission_km = ((emision_factor*energy_km)/(1*(10**6)) )
    return emission_km
} 

const savedEnergy = (combustion_consumption, electrical_consumption, annual_use) => {
    const saved_energy = ((combustion_consumption-electrical_consumption)*annual_use)

    return saved_energy
}

const avoidedEmissions = (emisiones_km, annual_use) => {
    const avoided_emissions = (emisiones_km*annual_use)/(1*(10**6))

    return avoided_emissions
}

const monthlySavings = (fuel_cost_km, cost_electrical_km, annual_use) => {
    const monthly_savings = (((fuel_cost_km)-(cost_electrical_km))*((annual_use)/12))
    return monthly_savings
}

const annualSavings = (monthly_savings, ipc_data) => {
    const annual_savings = ( monthly_savings * ((((1+(ipc_data)) **12)-1)/(ipc_data)))
    return annual_savings
}

const youngTree = async (avoided_emissions) => {
    const tree = ((avoided_emissions*1000)/('young_tree'))
    return parseInt(tree)
}

const oldTree = async (avoided_emissions) => {
    const tree = ((avoided_emissions*1000)/('old_tree'))
    return parseInt(tree)
}

const energyH2Cylinders = async (nominal_energy) => {
    const result = (nominal_energy/('cell_fuel_eficiency_factor'))
    return result
}

const energyH2LowPresure = async (energy_H2_Cylinders) => {
    const result = (energy_H2_Cylinders/('compresor_eficiency_factor'))
    return result
}

const energyConsumed = async (energy_H2_Low_Presure) => {
    const result = (energy_H2_Low_Presure/('electrolysis_eficiency_factor'))
    return result
}


const hydrogenMass = async (energy_H2_Low_Presure) => {
    const result = (energy_H2_Low_Presure/('hydrogen_energy_density'))
    return result
}

const litersRequired = async (hydrogen_mass) => {
    const result = (hydrogen_mass*('water_h2_weight'))
    return result
}

module.exports = {
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
    youngTree, 
    oldTree, 
    tiMonth, 
    fuelEnergySelector,
    energyH2Cylinders,
    energyH2LowPresure,
    energyConsumed,
    hydrogenMass,
    litersRequired
}