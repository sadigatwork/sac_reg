import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const CertificateCard = ({ certificate }) => {
  return (
    <div className="certificate-card">
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Certificate"
        height={200}
      />

      <div className="desc">
        <h3>
          <Link
            to={`/certificates/${certificate._id}`}
            className="btn btn-primary"
          >
            {certificate.collage_name}
          </Link>
        </h3>
        <p>GPA: {certificate.gpa}</p>
        <p>
          Graduation Date:{" "}
          {new Date(certificate.graduate_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
export default CertificateCard;
