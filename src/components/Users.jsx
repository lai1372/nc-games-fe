import { useState, useEffect } from "react";
import { fetchUsers } from "../../utils";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers()
      .then((users) => {
        setUsers(users.users);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="users-list">
      <h2>Users</h2>
      {users.map((user) => {
        return (
          <article className="user-card" key={user.username}>
            <p>Username: {user.username}</p>
            <p>Name: {user.name}</p>
            <img
              className="avatar-image"
              src={user.avatar_url}
              alt={`avatar for ${user.username}`}
            ></img>
          </article>
        );
      })}
    </section>
  );
};

export default Users;
