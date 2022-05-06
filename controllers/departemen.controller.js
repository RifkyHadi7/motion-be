const model = require('../models/departemen.model');
const {success, error} = require('../constants/result');

const departemen = {
    getAllDepartemen: async (req, res) => {
        model.getAllDepartemen()
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
    }
}

module.exports = departemen