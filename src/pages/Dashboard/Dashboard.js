import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { fetchEmployees, deleteEmployee} from "../Api/Api"

const Dashboard = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadEmployees = async () => {
            try {
                const data = await fetchEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };

        loadEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            await deleteEmployee(employeeId);
            setEmployees((prev) => prev.filter(emp => emp.id !== employeeId));
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    const handleUpdate = (employee) => {
        navigate(`/employee/${employee.id}`, { state: { employeeData: employee } });
    };
    

    const handleAdd = () => {
        navigate("/employee"); 
    };

    return (
        <Container className="mt-5">
            <Row className="mb-3">
                <Col className="d-flex justify-content-between">
                    <h1>Employees</h1>
                    <Button variant="primary" onClick={handleAdd}>Add Employee</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job Title</th>
                                <th>Salary</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>   
                                    <td>{employee.jobTitle}</td>
                                    <td>{employee.salary}</td>
                                    <td>
                                        <Button variant="outline-secondary" style={{ marginRight: '10px' }} onClick={() => handleUpdate(employee)}>Update</Button>
                                        <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
