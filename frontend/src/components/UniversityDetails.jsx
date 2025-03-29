import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";
import UniversityCard from "./UniversityCard";

function UniversityDetails() {
  const [university, setUniversity] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/universities/${id}`)
      .then((res) => {
        setUniversity(res.data);
      })
      .catch((err) => {
        console.error("Error fetching university details", err);
      });
  }, [id]);

  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/universities/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Error deleting university", err);
      });
  };

  const universityItem = (
    <div>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th>University Name</th>
            <th>University English Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{university.university_name}</td>
            <td>{university.university_eng_name}</td>
            <td>{university.address}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
  return (
    <div className="UniversityDetails">
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <br />
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show University List
            </Link>
          </div>
          <br />
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">University Details</h1>
            <p className="lead text-center">
              Details of the selected university
            </p>
            {universityItem}
            <Link
              to={`/edit-university/${university._id}`}
              className="btn btn-outline-info float-right"
            >
              Edit University
            </Link>
            <hr />
            <br />
          </div>
          <div className="col-md-10 m-auto">{universityItem}</div>
          <div className="col-md-6 m-auto">
            <button
              type="button"
              onClick={() => onDeleteClick(university._id)}
              className="btn btn-outline-danger btn-lg btn-block"
            >
              Delete University
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UniversityDetails;
