
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from './api/axios';

export default function UserForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" },
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:5000/api/users/${id}`)
        .then(res => setFormData(res.data))
        .catch(() => alert("Failed to load user"));
    }
  }, [id, isEdit]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Email is invalid";
    // Add more validations as needed
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else if (name.startsWith("geo.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          geo: { ...prev.address.geo, [key]: value }
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/users/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/users", formData);
      }
      navigate("/");
    } catch (error) {
      alert("Failed to save user");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEdit ? "Edit User" : "Create New User"}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Name *</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            className="form-control"
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
        </div>

        <h5>Address</h5>
        <div className="mb-3">
          <label className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Zipcode</label>
          <input
            type="text"
            className="form-control"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
          />
        </div>

        <h6>Geo</h6>
        <div className="row">
          <div className="col">
            <label className="form-label">Latitude</label>
            <input
              type="text"
              className="form-control"
              name="geo.lat"
              value={formData.address.geo.lat}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label className="form-label">Longitude</label>
            <input
              type="text"
              className="form-control"
              name="geo.lng"
              value={formData.address.geo.lng}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success mt-4">
          {isEdit ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
