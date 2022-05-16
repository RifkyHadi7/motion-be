const model = require('../models/user.model');
const {success, error} = require('../constants/result');

const user = {
    getAllUser: async (req, res) => {
        model.getAllUser()
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
    getUserByCol: async (req, res) => {
        model.getUserByCol(req.params)
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
    login: async (req, res) => {
        model.login(req.body)
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
    addUser: async (req, res) => {
        model.addUser(req.body)
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
    updateUser: async (req, res) => {
        model.updateUser(req.body, req.params)
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
    deleteUser: async (req, res) => {
        model.deleteUser(req.params)
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

module.exports = user