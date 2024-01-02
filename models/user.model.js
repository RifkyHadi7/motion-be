const supabase = require("../constants/config");
const fetch = require("node-fetch");

const user = {
	getAllUser: async () => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select(
				"nim, nama, foto, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(id_jabatan, jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)"
			)
			.order("id_jabatan", { ascending: true })
			.order("id_kementerian", { ascending: true })
			.order("nim", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getUserByNIM: async (nim) => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select(
				"nim, nama, foto, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(id_jabatan, jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)"
			)
			.eq("nim", nim)
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getUserByKementerianJabatan: async ({ id_kementerian, id_jabatan }) => {
		const { data, error } = await supabase
			.from("motion23_anggotaBEM")
			.select(
				"nim, nama, foto, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(id_jabatan, jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)"
			)
			.eq("id_kementerian", id_kementerian)
			.eq("id_jabatan", id_jabatan)
			.order("id_kementerian", { ascending: true })
			.order("id_jabatan", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},

	getRaporByNim: async (nim) => {
		const { data, error } = await supabase
			.from("motion23_rapor")
			.select(
				"*, user:motion23_anggotaBEM(nama, foto, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(id_jabatan, jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)) , detail:motion23_transparansi(catatan_transparansi,id_aspek, aspek:motion23_aspekPenilaian(aspek,indikator, sub_aspek:motion23_detailAspek(sub_aspek, deskripsi)))"
			)
			.eq("nim", nim)
			.order("id_rapor", { ascending: true });
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getRaporByTurnNim: async ({ nim, turn }) => {
		const { data, error } = await supabase
			.from("motion23_rapor")
			.select(
				"*, user:motion23_anggotaBEM(nama, foto, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(id_jabatan, jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)) , detail:motion23_transparansi(catatan_transparansi,id_aspek, aspek:motion23_aspekPenilaian(aspek,indikator, sub_aspek:motion23_detailAspek(sub_aspek, deskripsi)))"
			)
			.eq("nim", nim)
			.eq("rapor_ke", turn)
			.order("id_rapor", { ascending: true })
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	getAbsensiByTurnNim: async ({ nim, turn }) => {
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
			.from("motion23_anggotaBEM")
			.select(
				"absensi:motion23_absensi(id_kegiatan,status, kegiatan:motion23_kegiatan(kegiatan, tanggal, created_at))"
			)
			.eq("nim", nim)
			.gte("absensi.kegiatan.tanggal", tanggal.start)
			.lte("absensi.kegiatan.tanggal", tanggal.end)
			.order("id_kegiatan", {
				foreignTable: "motion23_absensi",
				ascending: true,
			})
			.single();
		if (error) {
			return { status: "err", msg: error };
		}
		const dataAbsensi = data.absensi.filter((item) => item.kegiatan !== null);
		const totalKehadiran = dataAbsensi.filter(
			(item) => item.status === true
		).length;
		const totalKegiatan = dataAbsensi.length;
		const persentaseKehadiran = (
			(totalKehadiran / totalKegiatan) *
			100
		).toFixed(2);
		return {
			status: "ok",
			data: {
				nim,
				totalKegiatan,
				totalKehadiran,
				persentaseKehadiran,
				dataAbsensi,
			},
		};
	},
	login: async ({ nim, password }) => {
		try {
			const login = await fetch(`https://bemfilkom-rest.vercel.app/auth`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nim,
					password,
				}),
			})
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
					"nim,nama, proker:motion23_proker(id_proker, proker), jabatan:motion23_jabatan(jabatan, id_jabatan), kementerian:motion23_kementerian(kementerian,singkatan, id_kementerian)"
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
		delete data.id_proker;
		data.foto = "";
		if (file && file.size > 0) {
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
				supabase.storage.from("motion23_bucket").upload(pathname, file.buffer, {
					cacheControl: "3600",
					contentType: file.mimetype,
				}),
				supabase.storage.from("motion23_bucket").getPublicUrl(pathname),
			]);

			if (errUpload) {
				return { status: "err", msg: errUpload };
			}

			data.foto = publicUrl;
		}

		const { error } = await supabase.from("motion23_anggotaBEM").insert(data);
		if (error) {
			return { status: "err", msg: error };
		}
		if (id_proker) {
			prokerData = id_proker.split(",").map(Number);
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
		console.log(nim);
		const { error } = await supabase
			.from("motion23_anggotaBEM")
			.update(data)
			.eq("nim", nim);
		if (error) {
			return { status: "err", msg: error };
		}
		if (id_proker) {
			const { data } = await supabase
				.from("motion23_pjProker")
				.select("*")
				.eq("nim", nim);
			if (data.length > 0) {
				const { error } = await supabase
					.from("motion23_pjProker")
					.delete()
					.eq("nim", nim);
				if (error) {
					return { status: "err", msg: error };
				}
			}

			const { error } = await supabase
				.from("motion23_pjProker")
				.upsert(
					id_proker.map((id) => ({
						nim,
						id_proker: id,
					}))
				)
				.eq("nim", nim);
			if (error) {
				return { status: "err", msg: error };
			}
		}
		return { status: "ok", msg: "success update user" };
	},
	deleteUser: async ({ nim }) => {
		//delete storage
		const { data } = await supabase
			.from("motion23_anggotaBEM")
			.select("kementerian:motion23_kementerian(singkatan), nama, foto")
			.eq("nim", nim)
			.single();
		if (data.foto) {
			const { data: dataFoto, error } = await supabase.storage
				.from("motion23_bucket")
				.remove([`${data.kementerian.singkatan}/${data.nama}`]);
			if (error || dataFoto.length === 0) {
				return { status: "err", msg: "Gagal menghapus foto!" };
			}
		}
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
			return { status: "err", data: { isAdmin: false } };
		}

		if (user.motion23_admin || user.id_kementerian === 2) {
			return { status: "ok", data: { isAdmin: true } };
		}

		return { status: "err", data: { isAdmin: false } };
	},
};

module.exports = user;
