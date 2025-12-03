import { useState, useEffect } from "react";
import axios from "axios";

function EmployeeForm({ selectedEmployee, reload, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    salary: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (selectedEmployee) {
      setForm(selectedEmployee);
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedEmployee) {
        await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/employees", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      reload();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <h3>{selectedEmployee ? "Update Employee" : "Add Employee"}</h3>
      <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required/>
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required/>
      <input type="text" placeholder="Position" value={form.position} onChange={e => setForm({...form, position: e.target.value})} required/>
      <input type="text" placeholder="Department" value={form.department} onChange={e => setForm({...form, department: e.target.value})} required/>
      <input type="number" placeholder="Salary" value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} required/>

      <button type="submit">Save</button>
      <button type="button" onClick={onClose} style={{ marginLeft: "10px" }}>Cancel</button>
    </form>
  );
}

export default EmployeeForm;
