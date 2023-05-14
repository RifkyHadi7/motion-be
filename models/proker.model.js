const supabase = require("../constants/config");

const proker = {
	getAllProker: async () => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select(
				"*, motion23_kementerian(id_kementerian, kementerian, singkatan)"
			)
			.order("id_kementerian", { ascending: true })
			.order("id_proker", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getProkerByCol: async ({ column, value }) => {
		const { data, error } = await supabase
			.from("motion23_proker")
			.select(
				"*, motion23_kementerian(id_kementerian, kementerian, singkatan)"
			)
			.eq(column, value)
			.order("id_kementerian", { ascending: true })
			.order("id_proker", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
};
