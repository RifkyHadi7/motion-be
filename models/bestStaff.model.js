const fetch = require('node-fetch');

const bestStaff = {
    getAllBestStaff: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_best_staff?select=id_best_staff, bulan, tahun, motion_user(nama,proker, motion_departemen(id_departemen, departemen, singkatan, id_departemen), nim)`, {
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
    getBestStaffByMonthYear: async ({month, year}) => {
        try {
            const params = `bulan=eq.${month}&tahun=eq.${year}`
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_best_staff?select=id_best_staff, bulan, tahun, motion_user(nama,proker, motion_departemen(id_departemen, departemen, singkatan, id_departemen), nim)&${params}`, {
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
    addBestStaff: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_best_staff`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add best staff' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateBestStaff: async (data, {id_best_staff}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_best_staff?id_best_staff=eq.${id_best_staff}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update best staff' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteBestStaff: async ({id_best_staff}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_best_staff?id_best_staff=eq.${id_best_staff}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete best staff' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = bestStaff;