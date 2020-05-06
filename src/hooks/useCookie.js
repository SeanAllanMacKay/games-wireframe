import Cookies from 'universal-cookie'
import { name } from '@config/constants'

const cookies = new Cookies()

export default cookies.get(`${name}`)

export const set = (newCookie) => {
    cookies.set(`${name}`, JSON.stringify(newCookie), { path: '/' })
}

export const remove = () => {
    cookies.remove(`${name}`, { path: '/' })
}