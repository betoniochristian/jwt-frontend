import { useState } from 'react';
import './AddEmployee.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from "../Api/Api";

const PostEmployee = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        jobTitle: "",
        salary: ""
    });

    const [showModal, setShowModal] = useState(false); // Modal state

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addEmployee(formData);
            setShowModal(true); // Show success modal
        } catch (error) {
            console.log("Error creating employee", error.message);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ name: "", email: "", jobTitle: "", salary: "" }); // Reset form fields
    };

    return (
        <div className="center-form">
            <h1>Add New Employee</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Control 
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicJobTitle">
                    <Form.Control 
                        type="text"
                        name="jobTitle"
                        placeholder="Enter Job Title"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicSalary">
                    <Form.Control 
                        type="text"
                        name="salary"
                        placeholder="Enter Salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">Add Employee</Button>
                <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
            </Form>

            {/* Success Modal */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Employee has been successfully added!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PostEmployee;
