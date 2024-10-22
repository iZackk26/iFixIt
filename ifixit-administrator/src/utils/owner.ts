
export const setOwnerData = (user: object) => {
    localStorage.setItem('owner', JSON.stringify(user));
};

export const getOwner = (): object | null => {
    const user = localStorage.getItem('owner');
    return user ? JSON.parse(user) : null;
};