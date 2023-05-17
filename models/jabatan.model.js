const supabase = require("../constants/config");

const jabatan = {
	getAllJabatan: async () => {
		const { data, error } = await supabase
			.from("motion23_jabatan")
			.select("*")
			.order("id_jabatan", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getJabatanById: async (id) => {
		const { data, error } = await supabase
			.from("motion23_jabatan")
			.select("*")
			.eq("id_jabatan", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getUserByIdJabatan: async (id) => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select(
				"nim, nama, foto, jabatan:motion23_jabatan(id_jabatan, jabatan), proker:motion23_proker(id_proker, proker), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)"
			)
			.eq("id_jabatan", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getAspekByIdJabatan: async (id) => {
		const { data, error } = await supabase
			.from("motion23_aspekPenilaian")
			.select("*, sub_aspek:motion23_detailAspek(sub_aspek, deskripsi)")
			.eq("id_jabatan", id)
			.order("id_aspek", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
};

module.exports = jabatan;
