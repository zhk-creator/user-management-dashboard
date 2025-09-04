import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";  // Import here

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (error) {
      alert("Error fetching users");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        alert("Failed to delete user");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Navbar /> {/* Add Navbar here */}

      <div className="container mt-5">
        <h2 className="mb-4">User Dashboard</h2>
        <Link to="/create" className="btn btn-primary mb-3">Add New User</Link>

        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan="4" className="text-center">No users found</td></tr>
            )}
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.company}</td>
                <td>
                  <Link to={`/user/${user._id}`} className="btn btn-sm btn-info me-2">View</Link>
                  <Link to={`/edit/${user._id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                  <button onClick={() => deleteUser(user._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
