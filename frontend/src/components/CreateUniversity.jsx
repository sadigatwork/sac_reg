import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUniversity = (props) => {
  const navigate = useNavigate();
  const [university, setUniversity] = useState({
    university_name: "",
    university_eng_name: "",
    address: "",
  });

  const onChange = (e) => {
    setUniversity({ ...university, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8082/api/universities", university)
      .then((res) => {
        // console.log(res.data);
        setUniversity({
          university_name: "",
          university_eng_name: "",
          address: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error("Error in Crate University", err);
      });
  };

  return (
    <div className="createUniversity">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <br />
            <Link to="/" className="btn btn-ouyline-warning float-left">
              Show University List
            </Link>
          </div>
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create University</h1>
            <p className="lead text-center">Create new university</p>
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
                  required
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
                  required
                />
              </div>
              <br />
              <input
                type="submit"
                className="btn btn-warning btn-block mt-4"
                value="Create University"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateUniversity;
