const supabase = require("../constants/config");
const fetch = require("node-fetch");

const user = {
	getAllUser: async () => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select(
				"nim, nama, foto, motion23_proker(id_proker, proker), motion23_jabatan(id_jabatan, jabatan),motion23_kementerian(kementerian,singkatan, id_kementerian)"
			)
			.order("id_jabatan", { ascending: true })
			.order("id_kementerian", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	login: async ({ nim, password }) => {
		try {
			const login = await fetch(
				`https://bemfilkom-rest.vercel.app/auth`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						nim,
						password,
					}),
				}
			)
				.then((res) => res.json())
				.catch((err) => {
					throw err;
				});
			if (!login.success) {
				return { status: "err", msg: login.message };
			}
			const { data, err } = await supabase
				.from("motion23_anggotaBEM")
				.select(
					"nim,nama,motion23_proker(id_proker, proker), motion23_jabatan(jabatan, id_jabatan),motion23_kementerian(kementerian,singkatan, id_kementerian)"
				)
				.eq("nim", nim)
				.single();

			if (err) {
				throw err;
			}

			if (data) {
				return {
					status: "ok",
					data: {
						prodi: login.data.prodi,
						token: login.token,
						...data,
					},
				};
			}
			return { status: "err", msg: "not bem member" };
		} catch (err) {
			return { status: "err", msg: err };
		}
	},
	addUser: async (data, file) => {
		const { id_kementerian, nama, id_proker } = data;

		// Get kementerian
		const {
			data: { singkatan },
		} = await supabase
			.from("motion23_kementerian")
			.select("singkatan")
			.eq("id_kementerian", id_kementerian)
			.single();
		const pathname = `${singkatan}/${nama}`;

		//handle upload file
		const [
			{ error: errUpload },
			{
				data: { publicUrl },
			},
		] = await Promise.all([
			supabase.storage
				.from("motion23_bucket")
				.upload(pathname, file.buffer, {
					cacheControl: "3600",
					contentType: file.mimetype,
				}),
			supabase.storage.from("motion23_bucket").getPublicUrl(pathname),
		]);

		if (errUpload) {
			return { status: "err", msg: errUpload };
		}

		data.foto = publicUrl;

		delete data.id_proker;

		const { error } = await supabase
			.from("motion23_anggotaBEM")
			.insert(data);
		if (error) {
			return { status: "err", msg: error };
		}
		if (id_proker) {
			let prokerData = [];
			if (typeof id_proker === "string") {
				prokerData = [id_proker];
			} else {
				prokerData = id_proker;
			}
			const { error } = await supabase.from("motion23_pjProker").insert(
				prokerData.map((id) => ({
					nim: data.nim,
					id_proker: id,
				}))
			);
			if (error) {
				return { status: "err", msg: error };
			}
		}
		return { status: "ok", msg: "success add user" };
	},
	updateUser: async (data, { nim }) => {
		const { id_proker } = data;
		delete data.id_proker;
		const { error } = await supabase
			.from("motion23_anggotaBEM")
			.update(data)
			.eq("nim", nim);
		if (error) {
			return { status: "err", msg: error };
		}
		if (id_proker) {
			const { error } = await supabase.from("motion23_pjProker").update(
				id_proker.map((id) => ({
					nim,
					id_proker: id,
				}))
			);
			if (error) {
				return { status: "err", msg: error };
			}
		}
		return { status: "ok", msg: "success update user" };
	},
	deleteUser: async ({ nim }) => {
		const { error } = await supabase
			.from("motion23_anggotaBEM")
			.delete()
			.eq("nim", nim);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success delete user" };
	},
	isAdmin: async ({ nim }) => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select("id_kementerian, motion23_admin(nim)")
			.eq("nim", `${nim}`);

		const user = data[0];

		if (error || !user) {
			return { status: "err", data: "Not admin" };
		}

		if (user.motion23_admin || user.id_kementerian === 2) {
			return { status: "ok", data: { isAdmin: true } };
		}

		return { status: "err", data: "Not admin" };
	},
};

module.exports = user;
