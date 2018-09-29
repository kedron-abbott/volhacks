import axios from "axios"
import config from "config"

export async function signUp(fullName, email, password, countryCode, phone) {
  const response = await axios.post(`${config.serverUrl}/user/sign-up`, {
    fullName,
    email,
    password,
    countryCode,
    phone,
  })

  console.log(response)
}
