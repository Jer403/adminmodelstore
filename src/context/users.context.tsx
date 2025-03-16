import { createContext, useEffect, useState } from "react";
import { getUsersRequest } from "../api/products";
import { UserInterface } from "../types";

interface UserContextType {
  users: UserInterface[] | null;
  loadingUsers: boolean;
}

interface UserProviderProps {
  children: import("react").ReactElement;
}

export const UserContext = createContext<UserContextType>({
  users: null,
  loadingUsers: true,
});

export function UserProvider({ children }: UserProviderProps) {
  const [users, setUsers] = useState<UserInterface[] | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const getUsers = async () => {
    setLoadingUsers(true);
    try {
      console.log("Starting request users");

      const res = await getUsersRequest();
      console.log("Response from users: ", res);
      if (res.data.error) throw new Error(res.data.error);
      if (res.status == 200) {
        setUsers(res.data);
      } else {
        setUsers([] as UserInterface[]);
      }
    } catch (error) {
      console.log("Error fetching users data: ", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loadingUsers }}>
      {children}
    </UserContext.Provider>
  );
}
