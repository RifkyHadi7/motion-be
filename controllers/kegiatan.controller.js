const model = require("../models/kegiatan.model");
const { success, error } = require("../constants/result");

const kegiatan = {
	getAllKegiatan: async (req, res) => {
		model
			.getAllKegiatan()
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
	getKegiatanById: async (req, res) => {
		model
			.getKegiatanById(req.params.id)
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
	addKegiatan: async (req, res) => {
		model
			.addKegiatan(req.body)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.msg);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
	updateKegiatan: async (req, res) => {
		model
			.updateKegiatan(req.params.id, req.body)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.msg);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
	deleteKegiatan: async (req, res) => {
		model
			.deleteKegiatan(req.params.id)
			.then((result) => {
				if (result.status == "ok") {
					success(res, result.msg);
				} else {
					error(res, result.msg);
				}
			})
			.catch((err) => {
				error(res, err);
			});
	},
};

module.exports = kegiatan;
