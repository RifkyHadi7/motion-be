const supabase = require("../constants/config");

const kegiatan = {
	getAllKegiatan: async () => {
		const { data, error } = await supabase
			.from("motion23_kegiatan")
			.select(
				"id_kegiatan, kegiatan, id_kementerian, motion23_kementerian(kementerian, singkatan)"
			)
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	addKegiatan: async (data) => {
		const { error } = await supabase.from("motion23_kegiatan").insert(data);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success add kegiatan" };
	},
};

module.exports = kegiatan;
