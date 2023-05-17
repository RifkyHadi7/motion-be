const model = require("../models/jabatan.model");
const { success, error } = require("../constants/result");

const jabatan = {
	getAllJabatan: async (_req, res) => {
		model
			.getAllJabatan()
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.data);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
	getJabatanById: async (req, res) => {
		model
			.getJabatanById(req.params.id)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.data);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
	getUserByIdJabatan: async (req, res) => {
		model
			.getUserByIdJabatan(req.params.id)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.data);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
	getAspekByIdJabatan: async (req, res) => {
		model
			.getAspekByIdJabatan(req.params.id)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.data);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
};

module.exports = jabatan;
