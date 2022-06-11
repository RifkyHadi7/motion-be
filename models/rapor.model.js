const fetch = require('node-fetch');
const moment = require('moment');
const rapor = {
    getAllRapor: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_rapor?select=id_rapor, tahun, rapor_ke, hobi, kesimpulan_diri, kesimpulan_lain, motivasi, motion_user(nama,proker,foto,motion_jabatan(jabatan, id_jabatan),motion_departemen(departemen,singkatan, id_departemen), nim), motion_kehadiran(id_kehadiran, kegiatan, tanggal, status_kehadiran, id_rapor), motion_detail_rapor(id_detail_rapor, nilai, penilaian, transparansi, motion_aspek(aspek, indikator, penjelasan_indikator, id_aspek), id_rapor)&order=id_rapor.asc`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            let json = await res.json()
            return { status: 'ok', data: json }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    getRaporByTurnNIMYear: async ({ turn, nim, year }) => {
        try {
            const params = `rapor_ke=eq.${turn}&nim=eq.${nim}&tahun=eq.${year}`
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_rapor?select=id_rapor, tahun, rapor_ke, hobi, kesimpulan_diri, kesimpulan_lain, motivasi, motion_user(nama,proker,foto,motion_jabatan(jabatan, id_jabatan),motion_departemen(departemen,singkatan, id_departemen), nim), motion_kehadiran(id_kehadiran, kegiatan, tanggal, status_kehadiran, id_rapor), motion_detail_rapor(id_detail_rapor, nilai, penilaian, transparansi, motion_aspek(aspek, indikator, penjelasan_indikator, id_aspek), id_rapor)&${params}&order=id_rapor.asc`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            let json = await res.json()
            return { status: 'ok', data: json }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    addRapor: async (data) => {
        try {
            let id_rapor = `R${moment().format('YY')}-${('0' + data.rapor_ke).slice(-2)}-${data.nim}`;
            let rapor = await fetch(`${process.env.SUPABASE_URL}/motion_rapor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify({
                    id_rapor,
                    tahun: moment().format('YYYY'),
                    rapor_ke: data.rapor_ke,
                    hobi: data.hobi,
                    kesimpulan_diri: data.kesimpulan_diri,
                    kesimpulan_lain: data.kesimpulan_lain,
                    motivasi: data.motivasi,
                    nim: data.nim,
                })
            })
            if(rapor.status == 201) {
                data.kehadiran = data.kehadiran.map((item)=>{return {id_rapor, ...item}})
                data.detail_rapor = data.detail_rapor.map((item)=>{return {id_rapor, ...item}})
                let kehadiran = await fetch(`${process.env.SUPABASE_URL}/motion_kehadiran`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                        'apikey': process.env.SUPABASE_API_KEY
                    },
                    body: JSON.stringify(data.kehadiran)
                })
                if(kehadiran.status != 201) return { status: 'err', msg: 'Gagal menambahkan rapor' } 
                let detail = await fetch(`${process.env.SUPABASE_URL}/motion_detail_rapor`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                        'apikey': process.env.SUPABASE_API_KEY
                    },
                    body: JSON.stringify(data.detail_rapor)
                })
                if(detail.status != 201) return { status: 'err', msg: 'Gagal menambahkan rapor' }

                return { status: 'ok', msg: 'Sukses menambahkan rapor' }
            }else{
                return { status: 'err', msg: 'Gagal menambahkan rapor' } 
            }
        }
        catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteRapor: async ({id_rapor}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_kehadiran?id_rapor=eq.${id_rapor}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            await fetch(`${process.env.SUPABASE_URL}/motion_detail_rapor?id_rapor=eq.${id_rapor}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            await fetch(`${process.env.SUPABASE_URL}/motion_rapor?id_rapor=eq.${id_rapor}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete rapor' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = rapor;