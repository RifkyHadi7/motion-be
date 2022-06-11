const fetch = require('node-fetch');

const aspek = {
    getAllAspek: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_aspek?select=*&order=id_aspek.asc`, {
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
    getAspekByCol: async ({column, value}) => {
        try {
            const params = ["id_aspek"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_aspek?select=*&order=id_aspek.asc&${params}`, {
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
    addAspek: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_aspek`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add aspek' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateAspek: async (data, {id_aspek}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_aspek?id_aspek=eq.${id_aspek}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update aspek' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    deleteAspek: async ({id_aspek}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_aspek?id_aspek=eq.${id_aspek}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                }
            })
            return { status: 'ok', msg: 'success delete aspek' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = aspek;