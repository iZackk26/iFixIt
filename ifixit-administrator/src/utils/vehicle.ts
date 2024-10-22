
export const setVehicleData = (user: object) => {
    localStorage.setItem('vehicle', JSON.stringify(user));
};

export const getVehicle = (): object | null => {
    const user = localStorage.getItem('vehicle');
    return user ? JSON.parse(user) : null;
};

