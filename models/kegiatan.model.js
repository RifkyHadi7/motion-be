const supabase = require("../constants/config");

const kegiatan = {
	getAllKegiatan: async () => {
		const { data, error } = await supabase
			.from("motion23_kegiatan")
			.select("*, motion23_kementerian(kementerian, singkatan)")
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getKegiatanById: async (id) => {
		const { data, error } = await supabase
			.from("motion23_kegiatan")
			.select("*, motion23_kementerian(kementerian, singkatan)")
			.eq("id_kegiatan", id);
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
	updateKegiatan: async (id, data) => {
		const { error } = await supabase
			.from("motion23_kegiatan")
			.update(data)
			.eq("id_kegiatan", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success update kegiatan" };
	},
	deleteKegiatan: async (id) => {
		const { error } = await supabase
			.from("motion23_kegiatan")
			.delete()
			.eq("id_kegiatan", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success delete kegiatan" };
	},
};

module.exports = kegiatan;
