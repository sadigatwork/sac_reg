import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function CertificateDetails() {
  const [certificate, setCertificate] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/certificate/${id}`)
      .then((res) => {
        setCertificate(res.data);
      })
      .catch((err) => {
        console.error("Error fetching certificate details", err);
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8080/api/certificate/${id}`)
      .then(() => {
        navigate("/certificate");
      })
      .catch((err) => {
        console.error("Error deleting certificate", err);
      });
  };

  const certificateItem = (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>Certificate Name</th>
            <th>Description</th>
            <th>University ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{certificate.name}</td>
            <td>{certificate.description}</td>
            <td>{certificate.universityId}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="CertificateDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br />
            <br />
            {certificateItem}
            <Link to={`/edit-certificate/${id}`} className="btn btn-primary">
              Edit
            </Link>
            <button
              onClick={() => onDeleteClick(id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CertificateDetails;
