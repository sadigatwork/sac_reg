import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import CertificateCard from "./CertificateCard";

function CertificateList() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/certificates"
        );
        setCertificates(response.data);
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const certificateLists =
    certificates.length === 0 ? (
      <div className="text-center mt-4">
        <h2>No certificates found</h2>
        <Link to="/add-certificate" className="btn btn-primary">
          Add Certificate
        </Link>
      </div>
    ) : (
      certificates.map((certificate, k) => (
        <CertificateCard key={k} certificate={certificate} />
      ))
    );

  return (
    <div className="CertificateList">
      <div className="container">
        <h1 className="text-center">Certificate List</h1>
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">Certificate List</h2>
          </div>
          <div className="col-md-11">
            <Link
              to="/create-certificate"
              className="btn btn-outline-warning float-right"
            >
              + Create Certificate
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="list">{certificateLists}</div>
      </div>
    </div>
  );
}

export default CertificateList;
