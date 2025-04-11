const { Router } = require('express');
const response = require('../../network/response')
const router = Router();
const ctrl = require('./index');
const {tiMonth, bienvenida} = require('../../calculators/environment')

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