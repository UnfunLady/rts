import { USEROUT, SETTOKEN, SETUSERINFO } from "../constant";

export const setToken = (data: any) => {
    return { type: SETTOKEN, data }
}

export const setUserInfo = (data: any) => {
    return { type: SETUSERINFO, data }
}
export const userOut = (data: any) => {
    return { type: USEROUT, data }
}