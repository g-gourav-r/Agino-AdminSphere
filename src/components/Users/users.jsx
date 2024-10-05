import { useEffect, useState } from "react";
import createApiCall, { GET, PUT } from "../api/api";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState({});
    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        const fetchUsersApi = createApiCall("api/admin/getusers", GET);
        setLoading(true);
        try {
            const res = await fetchUsersApi({
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUsers(res.data); // Ensure to access the data array correctly
            console.log(res);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    const handleToggle = async (userId) => {
        const togglePermission = createApiCall(`api/admin/verifyuser/${userId}`, PUT);        
        // Set the specific button to loading
        setBtnLoading((prev) => ({ ...prev, [userId]: true }));

        try {
            await togglePermission({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Refetch the users after toggling the verification
            fetchUsers();
        } catch (error) {
            console.error('Error toggling user verification:', error);
        } finally {
            setBtnLoading((prev) => ({ ...prev, [userId]: false }));
        }
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
                                <th>Verified</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                                    <td>
                                        <button
                                            className={`btn btn-${user.isVerified ? 'success' : 'danger'}`}
                                            onClick={() => handleToggle(user._id)} 
                                            disabled={btnLoading[user._id]}
                                        >
                                            {btnLoading[user._id] ? "Loading" : (user.isVerified ? 'Yes' : 'No')}
                                        </button>
                                    </td>
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
