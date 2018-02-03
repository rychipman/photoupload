
const upload = (token, file) => {
    console.log('sending api request with token: ' + token)
    const formData = new FormData()
    formData.append('file', file)
    return fetch('http://localhost:8080/upload', {
        method: 'POST',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
        }),
        body: formData,
    })
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
    })
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
    })
}

export default {
    upload,
    getToken,
    signup,
}
