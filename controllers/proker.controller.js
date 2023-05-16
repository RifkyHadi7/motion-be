const model = require("../models/proker.model");
const { success, error } = require("../constants/result");

const proker = {
	getAllProker: async (_req, res) => {
		model
			.getAllProker()
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
	getProkerById: async (req, res) => {
		model
			.getProkerById(req.params.id)
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
	getPJByIdProker: async (req, res) => {
		model
			.getPJByIdProker(req.params.id)
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

module.exports = proker;
