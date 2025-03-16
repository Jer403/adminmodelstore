import { useCallback, useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";
import { UserInterface } from "../types";
import { createDateTextFromLanguage } from "../utils";
import { Search } from "lucide-react";

function UserCard({ user }: { user: UserInterface }) {
  const date = new Date(user.created_at);
  console.log();

  return (
    <div className="w-full flex flex-col p-2 bg-white dark:bg-gray-80 border-2 shadow-md hover:shadow-lg hover:scale-[101%] transition-[scale,box-shadow] border-gray-400 dark:border-gray-5 gap-1 rounded-lg">
      <div className="flex">
        <div className="w-full mx-4 flex flex-row justify-between">
          <div className="flex flex-col justify-between items-start">
            <p className="w-full text-lg md:text-2xl flex items-start dark:text-gray-5">
              Username:{" "}
              <span className="ml-3 font-medium">{user.username}</span>
            </p>
            <p className="w-full text-lg md:text-2xl flex items-center justify-start dark:text-gray-5">
              Email: <span className="ml-4 font-medium">{user.email}</span>
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="w-full text-lg md:text-2xl flex justify-end dark:text-gray-5">
              <span className="ml-4 text-xl text-indigo-800">{user.id}</span>
            </p>
            <p className="w-full text-lg md:text-2xl flex justify-end  dark:text-gray-5">
              Creado el {createDateTextFromLanguage("es", date)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Users() {
  const { users, loadingUsers } = useUser();
  const [filter, setFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserInterface[] | null>(
    []
  );

  const filterUsers = useCallback(() => {
    if (filter == "" || !users) return users;
    return users.filter(
      (u) =>
        u.username.localeCompare(filter) != -1 ||
        u.email.localeCompare(filter) != -1
    );
  }, [filter, users]);

  const search = useCallback(() => {
    setFilteredUsers(filterUsers());
  }, [filterUsers]);

  useEffect(() => {
    search();
  }, []);

  return (
    <>
      <div className="w-full p-10  mt-3 max-w-[1330px] flex flex-col gap-4 items-center">
        <div className="w-full bg-white rounded-lg shadow flex items-center">
          <input
            type="text"
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              if (e.target.value == "") search();
            }}
            placeholder="Buscar usuario"
            className="w-full text-2xl rounded-l-lg h-14 p-4 focus:outline-indigo-500"
          />
          <button
            className="w-16 h-14 flex items-center justify-center hover:bg-indigo-100 group rounded-r-lg"
            onClick={() => search()}
          >
            <Search className="w-8 h-8 group-hover:text-indigo-500"></Search>
          </button>
        </div>
        {loadingUsers ? (
          <span className="text-2xl">Cargando usuarios...</span>
        ) : users && users.length > 0 ? (
          <>
            {filteredUsers &&
              filteredUsers.map((user) => {
                return <UserCard user={user}></UserCard>;
              })}
          </>
        ) : (
          <span className="text-2xl">No se encontro ningun usuario</span>
        )}
      </div>
    </>
  );
}
