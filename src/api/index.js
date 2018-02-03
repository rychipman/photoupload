
const handleSuccess = (res) => {
    return res.json().then(data => {
        if (!data.message) {
            data.message = res.statusText
        }
        return {
            ok: res.ok,
            status: res.status,
            statusText: res.statusText,
            data,
        }
    })
}

const handleFailure = (res) => {
    return {
        ok: false,
        status: res.status,
        statusText: res.statusText,
        data: {
            message: res.statusText,
        },
    }
}

const upload = (token, file) => {
    const formData = new FormData()
    formData.append('file', file)
    return fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
        body: formData,
    }).then(handleSuccess).catch(handleFailure)
}

const getToken = (token, email, password) => {
    return fetch('http://localhost:8080/token', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(handleSuccess).catch(handleFailure)
}

const signup = (token, email, password) => {
    return fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            email,
            password,
        }),
    }).then(handleSuccess).catch(handleFailure)
}

export default {
    upload,
    getToken,
    signup,
}
