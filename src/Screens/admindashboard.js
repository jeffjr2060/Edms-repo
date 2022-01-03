import React from 'react'
import MaterialTable  from 'material-table';
import '../styles/admin.css'


function Admindashboard() {
    const { useState } = React;
  
    const [columns, setColumns] = useState([
      { title: 'Employee Name', field: 'name' },
      { title: 'Employee ID', field: 'id', type: 'numeric' },
      { title: 'Department', field: 'department'  },
      { title: 'Employee email', field: 'email',},
      { title: 'Status', field: 'status',},
    ]);
  
    const [data, setData] = useState([
      { name: 'Sam Mureithi', department: 'ICT', id: 12567, email: 'Sammureithi@invesco.co.ke', status: 'Active Duty' },
      { name: 'Simon Mwangi', department: 'Claims', id: 4683, email: 'Simonmwangi@invesco.co.ke', status: 'On Leave' },
    ]);
  
    return (
        <div className="adminContainer">
        <nav className='navbar'>
           <div className='navLeft'>
            <h1 style={{ color: '#fff', }}>Admin Panel</h1>
           </div>

          <div className='navRight'>
            <h2>email</h2>
            <h2>signOut</h2>
          </div>

        </nav> 
    <div className="userTable">
       <MaterialTable
        title="Invesco Employees"
        columns={columns}
        data={data}
        
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                
                resolve()
              }, 1000)
            }),
        }}
      />
     </div> 
     </div> 
    )
  }
  

export default Admindashboard
