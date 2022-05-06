const model = require('../models/jabatan.model');
const {success, error} = require('../constants/result');

const jabatan = {
    getAllJabatan: async (req, res) => {
        model.getAllJabatan()
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

module.exports = jabatan