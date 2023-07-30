import React, { useState } from "react";
import { Container, Dropdown,Form,Button } from "react-bootstrap";

const queries = [
  { name: "Query1" },
  { name: "Query2" },
  { name: "Query3" },
  { name: "Query4" },
 
  // Add more dummy queries here
];


const generateRandomOutput = () => {
  // For demonstration purposes, we'll return some random output
  return Array.from({ length: 20 }, (_, idx) => ({
    id: idx + 1,
    randomData: Math.random().toString(36).substring(7),
  }));
};

const DummySQLApp = () => {
  const [selectedQuery, setSelectedQuery] = useState(queries[0]);
  const [queryResult, setQueryResult] = useState([]);
  const [isSelected,setIsSelected] = useState(0);
  const handleQueryChange = (query) => {
    setQueryResult([]);
    setIsSelected(1);
    setSelectedQuery(query);
  };
  const handleShowResult = () => {
    setIsSelected(1);
    // For demonstration, generate random output on button click
    const result = generateRandomOutput();
    setQueryResult(result);
  };



  const renderTable = () => {
    let data = generateRandomOutput();
    
    if(isSelected===0){
      data = null;
    }
   
    
    if (!data) return null;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };


  return (
    <Container>
      <h1 className="mt-4 mb-3">Dummy SQL Application</h1>
      <Form.Group controlId="formQuery">
        <Form.Label>Enter SQL Query:</Form.Label>
        <Form.Control className="mt-4 mb-1" as="textarea" rows={3} placeholder="Enter your query here" />
      </Form.Group>
      <Button className=" mb-5" variant="primary" onClick={handleShowResult}>
        Show Query Result
      </Button>

      <Dropdown className="mb-3">
        <Dropdown.Toggle variant="primary" id="dropdown-queries">
          SelectQuery
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {queries.map((query) => (
            <Dropdown.Item
              key={query.name}
              onClick={() => handleQueryChange(query)}
            >
              {query.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {renderTable()}
    </Container>
  );
};

export default DummySQLApp;
