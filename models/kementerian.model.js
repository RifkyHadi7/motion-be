const supabase = require("../constants/config");

const kementerian = {
	getAllKementerian: async () => {
		const { data, error } = await supabase
			.from("motion23_kementerian")
			.select(
				"id_kementerian, kementerian, singkatan, motion23_proker(id_proker, proker)"
			)
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getKementerianById: async (id) => {
		const { data, error } = await supabase
			.from("motion23_kementerian")
			.select(
				"id_kementerian, kementerian, singkatan, motion23_proker(id_proker, proker)"
			)
			.eq("id_kementerian", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getKegiatanByIdKementerian: async (id) => {
		const { data, error } = await supabase
			.from("motion23_kegiatan")
			.select("id_kegiatan, kegiatan")
			.eq("id_kementerian", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getProkerByIdKementerian: async (id) => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select("id_proker, proker")
			.eq("id_kementerian", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
};

module.exports = kementerian;
