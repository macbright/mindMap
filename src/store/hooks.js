
export const getUserId = () => {
    return localStorage.getItem('userId');
}

export const getJwtToken = () => {
    return localStorage.getItem('jwt');
}