// src/utils/owner.ts
export interface OwnerData {
    name: string;
    dni: string;
    mail: string;
    phone: string;
    id: string;
  }
  
  export const setOwnerData = (user: OwnerData): void => {
    localStorage.setItem("owner", JSON.stringify(user));
  };
  
  export const getOwner = (): OwnerData | null => {
    const stored = localStorage.getItem("owner");
    return stored ? (JSON.parse(stored) as OwnerData) : null;
  };
  