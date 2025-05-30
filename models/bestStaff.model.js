const supabase = require("../constants/config");

const bestStaff = {
	getAllBestStaff: async () => {
		const { data, error } = await supabase
			.from("motion24_bestStaff")
			.select(
				"id, month, nim, id_kementerian, staff:motion24_anggotaBEM(nim, nama, foto, kementerian:motion24_kementerian(*))"
			)
			.order("month", { ascending: true })
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data: data };
	},
	getBestStaffByMonth: async ({ month }) => {
		const { data, error } = await supabase
			.from("motion24_bestStaff")
			.select(
				"id, month, nim, id_kementerian, staff:motion24_anggotaBEM(nim, nama, foto, kementerian:motion24_kementerian(*))"
			)
			.eq("month", month)
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data: data };
	},

	addBestStaff: async (data) => {
		const { error } = await supabase
			.from("motion24_bestStaff")
			.insert(data);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success add best staff" };
	},
	updateBestStaff: async (data, { id }) => {
		const { error } = await supabase
			.from("motion24_bestStaff")
			.update(data)
			.eq("id", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success update best staff" };
	},
	deleteBestStaff: async ({ id }) => {
		const { error } = await supabase
			.from("motion24_bestStaff")
			.delete()
			.eq("id", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success delete best staff" };
	},
};

module.exports = bestStaff;
