import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UpdateCertificate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [certificate, setCertificate] = useState({
    name: "",
    description: "",
    universityId: "",
  });

  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch the certificate data
    axios
      .get(`http://localhost:8080/api/certificate/${id}`)
      .then((response) => {
        setCertificate(response.data);
      })
      .catch((error) => {
        console.error("Error fetching certificate data:", error);
      });

    // Fetch the list of universities
    axios
      .get("http://localhost:8080/api/university")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching universities:", error);
      });
  }, [id]);

  const onChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/certificate/${id}`, certificate)
      .then(() => {
        navigate("/certificate");
      })
      .catch((error) => {
        console.error("Error updating certificate:", error);
      });
  };
  return (
    <div className="container mt-5">
      <h2>Update Certificate</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Certificate Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={certificate.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={certificate.description}
            onChange={onChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="universityId" className="form-label">
            University
          </label>
          <select
            className="form-select"
            id="universityId"
            name="universityId"
            value={certificate.universityId}
            onChange={onChange}
            required
          >
            <option value="">Select University</option>
            {universities.map((university) => (
              <option key={university.id} value={university.id}>
                {university.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Certificate
        </button>
        <Link to="/certificate" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
}
export default UpdateCertificate;
