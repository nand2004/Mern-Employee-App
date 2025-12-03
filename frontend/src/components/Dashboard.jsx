import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const loadEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Employee Dashboard</h2>

      {role === "admin" && (
        <button onClick={() => { setSelectedEmployee(null); setShowForm(true); }} className="add-btn">
          ➕ Add Employee
        </button>
      )}

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Dept</th>
            <th>Salary</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>{emp.salary}</td>
              {role === "admin" && (
                <td>
                  <button onClick={() => { setSelectedEmployee(emp); setShowForm(true); }} className="update-btn">
                    Update
                  </button>
                  <button onClick={() => deleteEmployee(emp._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <EmployeeForm
              selectedEmployee={selectedEmployee}
              reload={loadEmployees}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
