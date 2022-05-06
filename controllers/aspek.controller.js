const model = require('../models/aspek.model');
const { success, error } = require('../constants/result');

const aspek = {
    getAllAspek: async (req, res) => {
        model.getAllAspek()
            .then(result => {
                if (result.status == "ok") {
                    success(res, result.data)
                }
                else {
                    error(res, result.msg)
                }
            })
            .catch(err => {
                error(res, err)
            })
    },
    getAspekByCol: async (req, res) => {
        model.getAspekByCol(req.params)
            .then(result => {
                if (result.status == "ok") {
                    success(res, result.data)
                }
                else {
                    error(res, result.msg)
                }
            })
            .catch(err => {
                error(res, err)
            })
    },
    addAspek: async (req, res) => {
        model.addAspek(req.body)
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
    },
    updateAspek: async (req, res) => {
        model.updateAspek(req.body, req.params)
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
    },
    deleteAspek: async (req, res) => {
        model.deleteAspek(req.params)
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

module.exports = aspek