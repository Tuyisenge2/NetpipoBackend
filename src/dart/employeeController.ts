import { Request, Response } from "express";
import { User } from "../database/models/user";
import { ExpandedRequest } from "../middleware/authentication";



export default class employeeController {
  // Get all employees
  public async getEmployees(req: Request, res: Response) {
    try {
      const employees = await User.findAll();
      return res.json({
        status: 200,
        message: "Employees fetched successfully",
        employees,
      });
    } catch (error) {
      return res.status(500).json({
        status: "SERVER ERROR",
        message: "Something went wrong!",
        error,
      });
    }
  }

  //get single employee
  public async getOneEmployee(req: ExpandedRequest, res: Response) {
    const { id } = req.params;

    try {
      const employee =  req.user;
      return res.json({
        status: 200,
        message: "Employee fetched successfully",
        employee,
      });
    } catch (error) {
      return res.status(500).json({
        status: "SERVER ERROR",
        message: "Something went wrong!",
        error,
      });
    }
  }


  // Create a new employee
  public async createEmployee(req: Request, res: Response) {
    const { name, email, position, salary } = req.body;

    try {
      const newEmployee = await User.create({
        name,
        email,
        position,
        salary,
      });
      return res.status(201).json({
        status: 201,
        message: "Employee created successfully",
        employee: newEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        status: "SERVER ERROR",
        message: "Something went wrong while creating the employee",
        error,
      });
    }
  }

  // Update an existing employee
  public async updateEmployee(req: ExpandedRequest, res: Response) {
    const { id } = req.params;
    const { name, email, position, salary } = req.body;

    try {
    
      const employee = req.user;
      employee.name = name || employee.name;
      employee.email = email || employee.email;
      employee.position = position || employee.position;
      employee.salary = salary || employee.salary;

      await employee.save();

      return res.json({
        status: 200,
        message: "Employee updated successfully",
        employee,
      });
    } catch (error) {
      return res.status(500).json({
        status: "SERVER ERROR",
        message: "Something went wrong while updating the employee",
        error,
      });
    }
  }

  // Delete an employee
  public async deleteEmployee(req: ExpandedRequest, res: Response) {
    const { id } = req.params;

    try {
      const employee = req.user;
    
      await employee.destroy();

      return res.json({
        status: 200,
        message: "Employee deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "SERVER ERROR",
        message: "Something went wrong while deleting the employee",
        error,
      });
    }
  }
}
