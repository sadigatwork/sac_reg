import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import UniversityCard from "./UniversityCard";

function UniversityList() {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/universities"
        );
        setUniversities(response.data);
      } catch (error) {
        console.error("Error fetching universities:", error);
      }
    };

    fetchUniversities();
  }, []);

  const universityList =
    universities.length === 0
      ? "there are no universities available."
      : universities.map((university, k) => (
          <UniversityCard key={k} university={university} />
        ));

  return (
    <div className="UniversityList">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br />
            <h2 className="display-4 text-center">University List</h2>
          </div>
          <div className="col-md-11">
            <Link
              to="/create-university"
              className="btn btn-outline-warning float-left"
            >
              + Add University
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className="list">{universityList}</div>
      </div>
    </div>
  );
}
export default UniversityList;
