
export const setAuthData = (user: object) => {
    localStorage.setItem('employee', JSON.stringify(user));
};

export const getUser = (): object | null => {
    const user = localStorage.getItem('employee');
    return user ? JSON.parse(user) : null;
};

export const clearAuthData = () => {
    localStorage.removeItem('employee');
};