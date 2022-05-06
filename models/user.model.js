const fetch = require('node-fetch');

const user = {
    getAllUser: async () => {
        try {
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_user?select=nim,nama,proker,motion_jabatan(jabatan, id_jabatan),motion_departemen(departemen,singkatan, id_departemen)`, {
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
    getUserByCol: async ({ column, value }) => {
        try {
            const params = ["nim", "id_jabatan", "id_departemen"].includes(column) ? `${column}=eq.${value}` : `${column}=ilike.%25${value}%25`
            let res = await fetch(`${process.env.SUPABASE_URL}/motion_user?select=nim,nama,proker,motion_jabatan(jabatan, id_jabatan),motion_departemen(departemen,singkatan, id_departemen)&${params}`, {
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
    login: async ({ nim, password }) => {
        try {
            console.log({nim, password})
            let login = await fetch(`https://bemfilkom-rest.vercel.app/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nim,
                    password
                })
            })

            login = await login.json();

            console.log(login)

            if (!login.success) {
                return { status: 'err', msg: login.message }
            }
            else {
                let res = await fetch(`${process.env.SUPABASE_URL}/motion_user?select=nim,nama,proker,motion_jabatan(jabatan, id_jabatan),motion_departemen(departemen,singkatan, id_departemen)&nim=eq.${nim}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                        'apikey': process.env.SUPABASE_API_KEY
                    }
                })
                let json = await res.json()
                console.log(json)
                if(json){
                    return { status: 'ok', data: {prodi : login.data.prodi, token : login.token, ...json[0]} }
                }else{
                    return { status: 'err', msg: "not bem member"}
                }
            }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    addUser: async (data) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success add user' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    },
    updateUser: async (data, {nim}) => {
        try {
            await fetch(`${process.env.SUPABASE_URL}/motion_user?nim=eq.${nim}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.SUPABASE_API_KEY}`,
                    'apikey': process.env.SUPABASE_API_KEY
                },
                body: JSON.stringify(data)
            })
            return { status: 'ok', msg: 'success update user' }
        } catch (err) {
            return { status: 'err', msg: err }
        }
    }
}

module.exports = user;