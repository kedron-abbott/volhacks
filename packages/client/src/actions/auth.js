import axios from "axios"
import to from "await-to-js"
import config from "config"

export function signUp(fullName, email, password, countryCode, phone) {
  return axios.post(`${config.serverUrl}/user/sign-up`, {
    fullName,
    email,
    password,
    countryCode,
    phone,
  })
}

export function verify(code, id) {
  return new Promise(async (resolve, reject) => {
    let error, response
    ;[error, response] = await to(
      axios.post(`${config.serverUrl}/user/verify`, { code, id }),
    )

    if (error) {
      let errorMessage
      try {
        errorMessage = error.response.data.message || error.message
      } catch (error) {
        errorMessage = error.message
      }
      reject(errorMessage)
    } else {
      localStorage.setItem("accessToken", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      resolve(response.data.user)
    }
  })
}
