const model = require('../models/rapor.model');
const {success, error} = require('../constants/result');

const rapor = {
    getAllRapor: async (req, res) => {
        model.getAllRapor()
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    getRaporByTurnNIMYear: async (req, res) => {
        model.getRaporByTurnNIMYear(req.params)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.data)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    addRapor: async (req, res) => {
        model.addRapor(req.body)
        .then(result => {
            if(result.status == "ok") {
                success(res, result.msg)
            }
            else{
                error(res, result.msg)
            }
        })
        .catch(err=>{
            error(res, err)
        })
    },
    deleteRapor: async (req, res) => {
        model.deleteRapor(req.params)
            .then(result => {
                if (result.status == "ok") {
                    success(res, result.msg)
                }
                else {
                    error(res, result.msg)
                }
            })
            .catch(err => {
                error(res, err)
            })
    }
}

module.exports = rapor