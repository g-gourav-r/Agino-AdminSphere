import { useEffect, useState } from "react";
import createApiCall, { GET, PUT } from "../api/api";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        const fetchUsersApi = createApiCall("users", GET);
        setLoading(true);
        try {
            const res = await fetchUsersApi({
                headers: {
                    Authorization : `Bearer ${token}`,
                }
            });
            setUsers(res.users);
            console.log(res);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []); 

    return (
        loading ? (
            <h1>Loading</h1>
        ) : (
            <>
                {users && users.length > 0 ? (
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users found.</p>
                )}
            </>
        )
    );
}

export default Users;
