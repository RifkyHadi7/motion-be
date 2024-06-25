const fetch = require("node-fetch");
const supabase = require("../constants/config");

const aspek = {
	getAllAspek: async () => {
		const { data, error } = await supabase
			.from("motion24_aspekPenilaian")
			.select(
				"*, sub_aspek:motion24_detailAspek(*), jabatan:motion24_jabatan(jabatan)"
			)
			.order("id_aspek", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getAspekById: async (id) => {
		const { data, error } = await supabase
			.from("motion24_aspekPenilaian")
			.select(
				"*, sub_aspek:motion24_detailAspek(*), jabatan:motion24_jabatan(jabatan)"
			)
			.eq("id_aspek", id)
			.order("id_aspek", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},

	getAspekByCol: async ({ column, value }) => {
		try {
			const params = ["id_aspek"].includes(column)
				? `${column}=eq.${value}`
				: `${column}=ilike.%25${value}%25`;
			let res = await fetch(
				`${process.env.SUPABASE_URL}/motion_aspek?select=*&order=id_aspek.asc&${params}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${process.env.SUPABASE_API_KEY}`,
						apikey: process.env.SUPABASE_API_KEY,
					},
				}
			);
			let json = await res.json();
			return { status: "ok", data: json };
		} catch (err) {
			return { status: "err", msg: err };
		}
	},
	addAspek: async (data) => {
		const { error } = await supabase.from("motion24_aspek").insert(data);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success add aspek" };
	},
	updateAspek: async (data, { id }) => {
		const { error } = await supabase
			.from("motion24_aspek")
			.update(data)
			.eq("id_aspek", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success update aspek" };
	},
	deleteAspek: async ({ id }) => {
		const { error } = await supabase
			.from("motion24_aspek")
			.delete()
			.eq("id_aspek", id);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success delete aspek" };
	},
};

module.exports = aspek;
