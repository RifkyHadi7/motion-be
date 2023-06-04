const supabase = require("../constants/config");
const rapor = {
	getAllRapor: async () => {
		const { data, error } = await supabase
			.from("motion23_rapor")
			.select(
				"*, user:motion23_anggotaBEM(nama, id_jabatan, id_kementerian, kementerian:motion23_kementerian(singkatan)), detail:motion23_transparansi(catatan_transparansi, aspek:motion23_aspekPenilaian(aspek,indikator, sub_aspek:motion23_detailAspek(sub_aspek, deskripsi)))"
			)
			.order("id_jabatan", {
				foreignTable: "motion23_anggotaBEM",
				ascending: true,
			})
			.order("id_kementerian", {
				foreignTable: "motion23_anggotaBEM",
				ascending: true,
			});
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", data };
	},
	addRapor: async (data) => {
		const { kehadiran, detail_rapor } = data;
		const { data: id_rapor, error: errRapor } = await supabase
			.from("motion23_rapor")
			.insert({
				rapor_ke: data.rapor_ke,
				hobi: data.hobi,
				kesimpulan_diri: data.kesimpulan_diri,
				kesimpulan_lain: data.kesimpulan_lain,
				motivasi: data.motivasi,
				nim: data.nim,
			})
			.select("id_rapor");
		if (errRapor) {
			return { status: "err", msg: errRapor };
		}
		if (kehadiran) {
			let dataKehadiran = [];
			kehadiran.forEach((item) => {
				dataKehadiran.push({
					id_kegiatan: item.id_kegiatan,
					nim: data.nim,
					status: item.status,
				});
			});
			const { error: errKehadiran } = await supabase
				.from("motion23_absensi")
				.upsert(dataKehadiran);
			if (errKehadiran) {
				return { status: "err", msg: errKehadiran };
			}
		}
		if (detail_rapor) {
			let dataDetailRapor = [];
			detail_rapor.forEach((item) => {
				dataDetailRapor.push({
					id_rapor: id_rapor[0].id_rapor,
					id_aspek: item.id_aspek,
					catatan_transparansi: item.transparansi,
				});
			});
			const { error: errDetailRapor } = await supabase
				.from("motion23_transparansi")
				.upsert(dataDetailRapor);
			if (errDetailRapor) {
				return { status: "err", msg: errDetailRapor };
			}
		}
		return { status: "ok", msg: "success add rapor" };
	},
	editRapor: async ({ id }, data) => {
		const { kehadiran, detail_rapor } = data;
		const { error: errRapor } = await supabase
			.from("motion23_rapor")
			.update({
				rapor_ke: data.rapor_ke,
				hobi: data.hobi,
				kesimpulan_diri: data.kesimpulan_diri,
				kesimpulan_lain: data.kesimpulan_lain,
				motivasi: data.motivasi,
				nim: data.nim,
			})
			.eq("id_rapor", id);
		if (errRapor) {
			console.log("errRapor", errRapor);
			return { status: "err", msg: errRapor };
		}
		if (kehadiran) {
			//get data and delete it
			const { data: dataAbsensi, error: errAbsensi } = await supabase
				.from("motion23_absensi")
				.select("nim")
				.eq("nim", data.nim)
				.single();
			if (errAbsensi) {
				console.log("errAbsensi", errAbsensi);
				return { status: "err", msg: errAbsensi };
			}
			const { error: errDeleteKehadiran } = await supabase
				.from("motion23_absensi")
				.delete()
				.eq("nim", dataAbsensi.nim);
			if (errDeleteKehadiran) {
				console.log("errDeleteKehadiran", errDeleteKehadiran);
				return { status: "err", msg: errDeleteKehadiran };
			}
			//insert new data

			let dataKehadiran = [];
			kehadiran.forEach((item) => {
				dataKehadiran.push({
					id_kegiatan: item.id_kegiatan,
					nim: data.nim,
					status: item.status,
				});
			});
			const { error: errKehadiran } = await supabase
				.from("motion23_absensi")
				.upsert(dataKehadiran);
			if (errKehadiran) {
				console.log("errKehadiran", errKehadiran);
				return { status: "err", msg: errKehadiran };
			}
		}
		if (detail_rapor) {
			//get data and delete it
			const { data: dataTransparansi, error: errTransparansi } = await supabase
				.from("motion23_transparansi")
				.select("id_rapor")
				.eq("id_rapor", id)
				.single();
			if (errTransparansi) {
				console.log("errTransparansi", errTransparansi);
				return { status: "err", msg: errTransparansi };
			}
			const { error: errDeleteTransparansi } = await supabase
				.from("motion23_transparansi")
				.delete()
				.eq("id_rapor", dataTransparansi.id_rapor);
			if (errDeleteTransparansi) {
				console.log("errDeleteTransparansi", errDeleteTransparansi);
				return { status: "err", msg: errDeleteTransparansi };
			}
			let dataDetailRapor = [];
			detail_rapor.forEach((item) => {
				dataDetailRapor.push({
					id_rapor: id,
					id_aspek: item.id_aspek,
					catatan_transparansi: item.transparansi,
				});
			});
			const { error: errDetailRapor } = await supabase
				.from("motion23_transparansi")
				.upsert(dataDetailRapor);
			if (errDetailRapor) {
				console.log("errDetailRapor", errDetailRapor);
				return { status: "err", msg: errDetailRapor };
			}
		}
		return { status: "ok", msg: "success edit rapor" };
	},
	deleteRapor: async ({ id }) => {
		const { error } = await Promise.all([
			supabase.from("motion23_rapor").delete().match({ id_rapor: id }),
		]);
		if (error) {
			return { status: "err", msg: error };
		}
		return { status: "ok", msg: "success delete rapor" };
	},
};

module.exports = rapor;
