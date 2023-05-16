const supabase = require("../constants/config");

const proker = {
	getAllProker: async () => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select("*, motion23_kementerian(kementerian, singkatan)")
			.order("id_kementerian", { ascending: true })
			.order("id_proker", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		const transformedData = data.map((item) => {
			return {
				id_proker: item.id_proker,
				id_kementerian: item.id_kementerian,
				proker: item.proker,
				kementerian: item.motion23_kementerian,
			};
		});
		return { status: "ok", data: transformedData };
	},
	getProkerById: async (id) => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select("*, motion23_kementerian(kementerian, singkatan)")
			.eq("id_proker", id)
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		const transformedData = {
			id_proker: data.id_proker,
			id_kementerian: data.id_kementerian,
			proker: data.proker,
			kementerian: data.motion23_kementerian,
		};
		return { status: "ok", data: transformedData };
	},
	getPJByIdProker: async (id) => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select("*, motion23_anggotaBEM(nama, nim)")
			.eq("id_proker", id)
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		const transformedData = {
			id_proker: data.id_proker,
			id_kementerian: data.id_kementerian,
			proker: data.proker,
			penanggungJawab: data.motion23_anggotaBEM,
		};
		return { status: "ok", data: transformedData };
	},
};

module.exports = proker;
