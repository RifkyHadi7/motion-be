const supabase = require("../constants/config");

const kementerian = {
	getAllKementerian: async () => {
		const { data, error } = await supabase
			.from("motion23_kementerian")
			.select(
				"id_kementerian, kementerian, singkatan, proker:motion23_proker(id_proker, proker)"
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
				"id_kementerian, kementerian, singkatan, proker:motion23_proker(id_proker, proker)"
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
	getKegiatanByIdKementerianRapor: async ({ id, turn }) => {
		//get count of kegiatan where tanggal between start and end
		let tanggal = null;
		switch (Number(turn)) {
			case 1:
				tanggal = {
					start: "2023-01-01",
					end: "2023-06-22",
				};
				break;
			case 2:
				tanggal = {
					start: "2023-06-23",
					end: "2023-09-20",
				};
				break;
			case 3:
				tanggal = {
					start: "2023-09-21",
					end: "2024-01-31",
				};
				break;
			default:
				tanggal = {
					start: "2023-01-01",
					end: "2024-01-31",
				};
		}
		const { data, error } = await supabase
			.from("motion23_kegiatan")
			.select("id_kegiatan, kegiatan")
			.eq("id_kementerian", id)
			.gte("tanggal", tanggal.start)
			.lte("tanggal", tanggal.end)
			.order("id_kegiatan", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
};

module.exports = kementerian;
