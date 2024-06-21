const supabase = require("../constants/config");

const proker = {
	getAllProker: async () => {
		const { data, error } = await supabase
			.from("motion24_proker")
			.select(
				"*, kementerian:motion24_kementerian(kementerian, singkatan)"
			)
			.order("id_kementerian", { ascending: true })
			.order("id_proker", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data: data };
	},
	getProkerById: async (id) => {
		const { data, error } = await supabase
			.from("motion24_proker")
			.select(
				"*, kementerian:motion24_kementerian(kementerian, singkatan)"
			)
			.eq("id_proker", id)
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data: data };
	},
	getPJByIdProker: async (id) => {
		const { data, error } = await supabase
			.from("motion24_proker")
			.select("*, penanggungJawab:motion24_anggotaBEM(nama, nim)")
			.eq("id_proker", id)
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data: data };
	},
};

module.exports = proker;
