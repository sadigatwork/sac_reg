import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateCertificate = () => {
  const navigate = useNavigate();
  const [certificate, setCertificate] = useState({
    university: "",
    college_name: "",
    gpa: "",
    graduate_date: "",
  });
  const [universities, setUniversities] = useState([]);
  const [isLoadingUniversities, setIsLoadingUniversities] = useState(true);
  const [fetchError, setFetchError] = useState("");

  // Fetch list of universities for the dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8082/api/universities")
      .then((response) => {
        // Adjust if the response data is not a plain array
        const universityData = Array.isArray(response.data)
          ? response.data
          : response.data.universities;
        setUniversities(universityData);
        setIsLoadingUniversities(false);
      })
      .catch((err) => {
        console.error("Error fetching universities", err);
        setFetchError("Unable to fetch universities. Please try again later.");
        setIsLoadingUniversities(false);
      });
  }, []);

  // Handle input changes
  const onChange = (e) => {
    setCertificate({ ...certificate, [e.target.name]: e.target.value });
  };

  // Submission handler sends the selected university's ID along with the certificate data
  const onSubmit = (e) => {
    e.preventDefault();

    // Basic validation for demonstration purposes
    if (
      !certificate.university ||
      !certificate.college_name ||
      !certificate.gpa ||
      !certificate.graduate_date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    axios
      .post("http://localhost:8082/api/certificates", certificate)
      .then(() => {
        // Clear form and navigate upon success
        setCertificate({
          university: "",
          college_name: "",
          gpa: "",
          graduate_date: "",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error("Error creating certificate", err);
      });
  };

  return (
    <div className="createCertificate">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link
              to="/certificates"
              className="btn btn-outline-warning float-left"
            >
              Show Certificate List
            </Link>
          </div>
          <div className="col-md-10 m-auto">
            <h1 className="display-4 text-center">Create Certificate</h1>
            <p className="lead text-center">Create new certificate</p>
            <form noValidate onSubmit={onSubmit}>
              {/* Dropdown for selecting a university */}
              <div className="form-group">
                <select
                  name="university"
                  value={certificate.university}
                  onChange={onChange}
                  className="form-control"
                  required
                  disabled={isLoadingUniversities}
                >
                  <option value="">
                    {isLoadingUniversities
                      ? "Loading universities..."
                      : "Select University"}
                  </option>
                  {universities.map((uni) => (
                    <option key={uni._id} value={uni._id}>
                      {uni.university_name}
                    </option>
                  ))}
                </select>
                {fetchError && (
                  <small className="text-danger">{fetchError}</small>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="college_name"
                  placeholder="College Name"
                  value={certificate.college_name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  step="0.01"
                  name="gpa"
                  className="form-control form-control-lg"
                  placeholder="GPA"
                  value={certificate.gpa}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  name="graduate_date"
                  className="form-control form-control-lg"
                  value={certificate.graduate_date}
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <input
                type="submit"
                className="btn btn-warning btn-block mt-4"
                value="Create Certificate"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;
