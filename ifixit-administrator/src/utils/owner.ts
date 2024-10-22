
export const setOwnerData = (user: object) => {
    localStorage.setItem('employee', JSON.stringify(user));
};

export const getOwner = (): object | null => {
    const user = localStorage.getItem('employee');
    return user ? JSON.parse(user) : null;
};