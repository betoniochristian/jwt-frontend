import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach JWT token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Get token from local storage

        if (!token) {
            console.error("⚠️ No token found in localStorage!");
        } else {
            console.log("✅ Retrieved Token from Storage:", token);
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);

// Fetch all employees
export const fetchEmployees = async () => {
    try {
        const response = await api.get("/employees");
        return response.data;
    } catch (error) {
        console.error("Error fetching employees:", error.response?.data || error.message);
        throw error;
    }
};

// Fetch employee by ID
export const fetchEmployeeById = async (employeeId) => {
    try {
        const response = await api.get(`/employees/${employeeId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching employee:", error.response?.data || error.message);
        throw error;
    }
};

export const addEmployee = async (employeeData) => {
    try {
        const token = localStorage.getItem("token"); // Get token manually
        const response = await axios.post("http://localhost:8080/api/employees", employeeData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding employee:", error.response?.data || error.message);
        throw error;
    }
};

// Update an employee
export const updateEmployee = async (employeeId, updatedData) => {
    try {
        const response = await api.put(`/employees/${employeeId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating employee:", error.response?.data || error.message);
        throw error;
    }
};

// Delete an employee
export const deleteEmployee = async (employeeId) => {
    try {
        await api.delete(`/employees/${employeeId}`);
        return employeeId;
    } catch (error) {
        console.error("Error deleting employee:", error.response?.data || error.message);
        throw error;
    }
};

export default api;
