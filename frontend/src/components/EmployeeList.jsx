import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const userRole = localStorage.getItem("role");

  const getEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  if (loading) return <h2 className="loading">Loading employees...</h2>;

  return (
    <div className="employee-container">
      <h1 className="title">Employee List</h1>
      {userRole === "admin" && (
        <Link to="/add-employee" className="add-btn">➕ Add Employee</Link>
      )}

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            {userRole === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              {userRole === "admin" && (
                <td>
                  <Link to={`/update-employee/${emp._id}`} className="update-btn">Update</Link>
                  <button className="delete-btn" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
