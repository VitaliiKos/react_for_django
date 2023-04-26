import {apiService} from "./apiService";
import {mainUrls} from "../config";

const accessTokenKey = 'access';
const refreshTokenKey = 'refresh';

const authService = {
    login: async function (cred) {
        const response = await apiService.post(mainUrls.auth.login, cred);

        if (response.status === 200){
            this.setTokens(response.data)
        }
        return response
    },

    refresh: async function(refresh) {
        const response = await apiService.post(mainUrls.auth.refresh, {refresh})
        if (response.status === 200){
            this.setTokens(response.data)
        }
        return response
    },

    me: () => apiService.get(mainUrls.auth.me),
    avatar: (formData) => apiService.patch(mainUrls.users.profile, formData),
    updateProfile: (user) => apiService.patch(mainUrls.users.profile, user),
    activateUser: (token) => apiService.get(`${mainUrls.auth.activate}/${token}`),

    setTokens:({access, refresh})=>{
        localStorage.setItem(accessTokenKey, access)
        localStorage.setItem(refreshTokenKey, refresh)
    },
    getAccessToken:()=> localStorage.getItem(accessTokenKey),
    getRefreshToken:()=> localStorage.getItem(refreshTokenKey),
    deleteTokens:()=> {
        localStorage.removeItem(accessTokenKey)
        localStorage.removeItem(refreshTokenKey)
    },
    isAuthenticated:()=>!!localStorage.getItem(accessTokenKey)
}
export {authService};