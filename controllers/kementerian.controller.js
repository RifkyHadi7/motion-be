const model = require("../models/kementerian.model");
const { success, error } = require("../constants/result");

const kementerian = {
	getAllKementerian: async (req, res) => {
		model
			.getAllKementerian()
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
	getKementerianById: async (req, res) => {
		model
			.getKementerianById(req.params.id)
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
	getKegiatanByIdKementerian: async (req, res) => {
		model
			.getKegiatanByIdKementerian(req.params.id)
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
	getProkerByIdKementerian: async (req, res) => {
		model
			.getProkerByIdKementerian(req.params.id)
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
	getKegiatanByIdKementerianRapor: async (req, res) => {
		model
			.getKegiatanByIdKementerianRapor(req.params)
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

module.exports = kementerian;
