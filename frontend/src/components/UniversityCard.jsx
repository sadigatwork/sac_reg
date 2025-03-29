import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UniversityCard = ({ university }) => {
  return (
    <div className="card-container mb-4" key={university._id}>
      <img
        src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
        alt="Universities"
      />
      <div className="desc">
        {/* <h2 className="card-title">{university.university_name}</h2> */}
        <h2>
          <Link
            to={`/show-university/${university._id}`}
            className="btn btn-primary"
          >
            {university.university_name}
          </Link>
        </h2>
        <p className="card-text">{university.address}</p>
      </div>
    </div>
  );
};

export default UniversityCard;
