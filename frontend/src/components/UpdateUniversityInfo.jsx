import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

function UpdateUniversityInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState({
    university_name: "",
    university_eng_name: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8082/api/universities/${id}`)
      .then((res) => {
        setUniversity(res.data);
      })
      .catch((err) => {
        console.error("Error fetching university data", err);
      });
  }, [id]);

  const onChange = (e) => {
    setUniversity({ ...university, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8082/api/universities/${id}`, university)
      .then(() => {
        setUniversity({
          university_name: "",
          university_eng_name: "",
          address: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error("Error updating university", err);
      });
  };

  return (
    <div className="updateUniversity">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-outline-warning float-left">
              Show University List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Update University</h1>
            <p className="lead text-center">Update existing university</p>
            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="University Name"
                  name="university_name"
                  value={university.university_name}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="University English Name"
                  name="university_eng_name"
                  value={university.university_eng_name}
                  onChange={onChange}
                />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Address"
                  name="address"
                  value={university.address}
                  onChange={onChange}
                />
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-lg btn-info btn-block mt-4"
              >
                Update University
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUniversityInfo;
