
import { useParams, Link } from 'react-router-dom';
import axios from './api/axios';
import { useEffect, useState } from "react";


export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(() => {
        alert("User not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container mt-5">Loading...</div>;

  if (!user) return <div className="container mt-5">No user data.</div>;

  return (
    <div className="container mt-5">
      <h2>User Details</h2>
      <div className="card p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        {/* <p><strong>Company:</strong> {user.company}</p> */}
        <p><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        {/* <p><strong>Geo:</strong> Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}</p> */}
      </div>
      <Link to="/" className="btn btn-secondary mt-3">Back to Dashboard</Link>
    </div>
  );
}
