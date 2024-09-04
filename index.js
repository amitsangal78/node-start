import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

const employeeArr = [];
let employeeId = 0;

app.post("/employee", (req, res) => {
  const { name, price } = req.body;
  employeeArr.push({ id: employeeArr.length + 1, name: name, price: price });
  res.status(201).send({
    status: "sucess",
    message: "Empoloyee record created",
    data: { id: employeeArr.length , name: name, price: price },
  });
});

app.get("/employees", (req, res) => {
  res.status(200).send({
    status: "sucess",
    message: "All Employees Records Returned",
    data: employeeArr,
  });
});

app.get("/employee/:id", (req, res) => {
  const getEmp = employeeArr.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!getEmp) {
    res.status(404).send({
      status: "failed",
      message: "No Employee Found",
      data: {},
    });
  }
  res.status(200).send({
    status: "sucess",
    message: "All Employees Records Returned",
    data: getEmp,
  });
});

app.put("/employee/:id", (req, res) => {
  const getEmpIndex = employeeArr.findIndex(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (getEmpIndex < 0) {
    res.status(200).send({
      status: "failed",
      message: "No Employee Found with given id",
      data: {},
    });
  }
  const { name, price } = req.body;
  const updatedEmpData = { id: employeeArr[getEmpIndex].id, price, name };
  employeeArr.splice(getEmpIndex, 1, updatedEmpData);
  res.status(200).send({
    status: "sucess",
    message: "Employee record updated successfully",
    data: updatedEmpData,
  });
});

app.delete("/employee/:id", (req, res) => {
  const getEmpIndex = employeeArr.findIndex(
    (employee) => employee.id === parseInt(req.params.id)
  );
  employeeArr.splice(getEmpIndex, 1);
  res.status(200).send({
    status: "sucess",
    message: "Employee deleted successfully",
    data: employeeArr,
  });
});

app.listen(port, () => {
  console.log(`server started and listening on ${port} ...`);
});
