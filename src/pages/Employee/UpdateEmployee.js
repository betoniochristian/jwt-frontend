import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';  // Import useLocation
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchEmployeeById, updateEmployee } from '../Api/Api';

const UpdateEmployee = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const location = useLocation();  

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        jobTitle: "",
        salary: ""
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (location.state?.employeeData) {
            setFormData(location.state.employeeData);
        } else {
            const loadEmployee = async () => {
                try {
                    const employeeData = await fetchEmployeeById(id);
                    setFormData(employeeData);
                } catch (error) {
                    console.error("Error fetching employee:", error);
                }
            };
            loadEmployee();
        }
    }, [id, location.state]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(id, formData);
            console.log("User updated successfully");
            setShowModal(true);
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    return (
        <div className="center-form">
            <h1>Edit Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder='Enter Name'
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder='Enter Email'
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Control
                        type="text"
                        name="jobTitle"
                        placeholder='Enter Job Title'
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicDepartment">
                    <Form.Control
                        type="text"
                        name="salary"
                        placeholder='Enter Salary'
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Update Employee</Button>
                <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Employee updated successfully!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={() => navigate("/dashboard")}>Go to Home</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UpdateEmployee;
