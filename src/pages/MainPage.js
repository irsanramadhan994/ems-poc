// src/MainPage.js
import React, { useState } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import { FormDialog } from '../components/FormDialog';
import {signOut} from 'aws-amplify/auth'
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [brandCode, setBrandCode] = useState('');
  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigate();
  const [rows, setRows] = useState([
    {
      "id": 1,
      "brandCode": "A123",
      "name": "Product 1",
      "order": 100,
      "mainRewards": ["A", "B", "C"],
      "additionalRewards": ["D"],
      "sku": ["Marlboro"],
      "leadTime": 1,
      "startDate": "21/12/2024",
      "endDate": "22/12/2024",
      "priority": "special",
      "location": ["Kazakhstan"],
      "activity": ["Watching Video"]
    },
    {
      "id": 2,
      "brandCode": "B456",
      "name": "Product 2",
      "order": 200,
      "mainRewards": ["E", "F"],
      "additionalRewards": ["G"],
      "sku": ["Camel"],
      "leadTime": 2,
      "startDate": "01/11/2024",
      "endDate": "05/11/2024",
      "priority": "high",
      "location": ["USA"],
      "activity": ["Purchasing Product"]
    },
    {
      "id": 3,
      "brandCode": "C789",
      "name": "Product 3",
      "order": 150,
      "mainRewards": ["H", "I", "J"],
      "additionalRewards": ["K"],
      "sku": ["Winston"],
      "leadTime": 3,
      "startDate": "15/10/2024",
      "endDate": "20/10/2024",
      "priority": "medium",
      "location": ["Germany"],
      "activity": ["Participating in Survey"]
    },
    {
      "id": 4,
      "brandCode": "D101",
      "name": "Product 4",
      "order": 120,
      "mainRewards": ["L", "M"],
      "additionalRewards": ["N"],
      "sku": ["Parliament"],
      "leadTime": 4,
      "startDate": "10/09/2024",
      "endDate": "12/09/2024",
      "priority": "low",
      "location": ["Canada"],
      "activity": ["Social Media Sharing"]
    },
    {
      "id": 5,
      "brandCode": "E234",
      "name": "Product 5",
      "order": 300,
      "mainRewards": ["O", "P"],
      "additionalRewards": ["Q"],
      "sku": ["Lucky Strike"],
      "leadTime": 1,
      "startDate": "05/08/2024",
      "endDate": "10/08/2024",
      "priority": "special",
      "location": ["Japan"],
      "activity": ["Watching Video"]
    },
    {
      "id": 6,
      "brandCode": "F567",
      "name": "Product 6",
      "order": 220,
      "mainRewards": ["R", "S"],
      "additionalRewards": ["T"],
      "sku": ["Kent"],
      "leadTime": 2,
      "startDate": "01/07/2024",
      "endDate": "03/07/2024",
      "priority": "high",
      "location": ["France"],
      "activity": ["Purchasing Product"]
    },
    {
      "id": 7,
      "brandCode": "G890",
      "name": "Product 7",
      "order": 130,
      "mainRewards": ["U", "V"],
      "additionalRewards": ["W"],
      "sku": ["Pall Mall"],
      "leadTime": 3,
      "startDate": "20/06/2024",
      "endDate": "25/06/2024",
      "priority": "medium",
      "location": ["Australia"],
      "activity": ["Participating in Survey"]
    },
    {
      "id": 8,
      "brandCode": "H112",
      "name": "Product 8",
      "order": 400,
      "mainRewards": ["X", "Y", "Z"],
      "additionalRewards": ["A1"],
      "sku": ["Davidoff"],
      "leadTime": 4,
      "startDate": "10/05/2024",
      "endDate": "15/05/2024",
      "priority": "low",
      "location": ["India"],
      "activity": ["Social Media Sharing"]
    },
    {
      "id": 9,
      "brandCode": "I345",
      "name": "Product 9",
      "order": 180,
      "mainRewards": ["B1", "C1"],
      "additionalRewards": ["D1"],
      "sku": ["Chesterfield"],
      "leadTime": 1,
      "startDate": "01/04/2024",
      "endDate": "05/04/2024",
      "priority": "special",
      "location": ["Russia"],
      "activity": ["Watching Video"]
    },
    {
      "id": 10,
      "brandCode": "J678",
      "name": "Product 10",
      "order": 250,
      "mainRewards": ["E1", "F1"],
      "additionalRewards": ["G1"],
      "sku": ["L&M"],
      "leadTime": 2,
      "startDate": "15/03/2024",
      "endDate": "20/03/2024",
      "priority": "high",
      "location": ["China"],
      "activity": ["Purchasing Product"]
    }
  ]
  );
  const [columns] = useState([
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Stream Name', width: 200 },
    { field: 'order', headerName: 'Order', width: 150 },
    { field: 'mainRewards', headerName: 'Main Rewards', width: 150 },
    { field: 'additionalRewards', headerName: 'Additional Rewards', width: 150 },
    { field: 'sku', headerName: 'SKU', width: 150 },
    { field: 'leadTime', headerName: 'Lead Times', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 150 },
    { field: 'endDate', headerName: 'End Date', width: 150 },
    { field: 'priority', headerName: 'Priority', width: 150 },
    { field: 'location', headerName: 'Locations', width: 150 },
    { field: 'activity', headerName: 'Activities', width: 150 },

  ]);

  const handleCreate = () => {
    
    setOpen(true)
  };

  const handleDelete = () => {
    if (selectedRow) {
      setRows(rows.filter((row) => row.id !== selectedRow.id));
      setSelectedRow(null);
    }
  };

  const handleCloseDialog = () =>{
    setOpen(false)
  }



  const handleLogout = () =>{
    signOut({global:true}).then((res) => {
        console.log(res)
        localStorage.clear();
        sessionStorage.clear();
        navigation("/login")
      }).catch((e) => {
          console.log(e)
         
      })
  }

  const [selectedRow, setSelectedRow] = useState(null);

  const handleSearch = () => {
    return rows.filter((row) => row.name.toLowerCase().includes(searchText.toLowerCase()));
  };

  const filteredRows = handleSearch();

  return (
    <Container>
      <Row className='align-items-center mb-4 p-3'>
        <Col md={6}>
        <h2>Stream Configuration</h2>
        </Col>
        <Col md={6} className='text-end'>
        <Button variant="danger" onClick={handleLogout} >Log Out</Button>{' '}
        </Col>
      
      </Row>

      <Row>
      <Col>
         
         <Button variant="success" onClick={handleCreate}>Create</Button>{' '}
         <Button variant="danger" onClick={handleDelete} disabled={!selectedRow}>Delete</Button>{' '}
         <Button variant="primary" disabled={!selectedRow}>Edit</Button>
       </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={4}>
          <Form.Control
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col xs={4}>
          <Form.Control
            as="select"
            value={brandCode}
            onChange={(e) => setBrandCode(e.target.value)}
          >
            <option value="">Select Brand Code</option>
            <option value="A123">A123</option>
            <option value="B456">B456</option>
          </Form.Control>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              selectionModel={selectedRow}
              pageSize={5}
              checkboxSelection
              onRowClick={(params) => setSelectedRow(params.row)}
            />
          </div>
        </Col>
      </Row>

      <FormDialog handleClose={handleCloseDialog} open={open} />
    </Container>
  );
};

export default MainPage;
