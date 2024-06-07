'use client'
// adding necessary imports
import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Addtable from './AddTable';
import Search from './Search';

// below are the styles for above elements
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TableDoc() {

  // initialization of state hooks for necessary state changes
  const [userinfo, setUserInfo] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  
  // used useeffect to fetch json data, initially userinfo is the json variable to recieve content from dummyjson api
  useEffect(() => {
    async function geturldata() {
      const data = (await (await fetch('http://dummyjson.com/users')).json()).users;
      console.log(data)
      setMainData(data);
      setUserInfo(data);
    }
    geturldata();
  }, []);

  //Functions for pagination is handled here
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = userinfo.slice(firstIndex, lastIndex);
  const npage = Math.ceil(userinfo.length / recordsPerPage);
  const firstpage = 1;
  const lastpage = userinfo.length / recordsPerPage;

  // Functions for seting current page on pressing PrevPage button
  function prevPage() {
    if (currentPage !== firstpage) {
      setCurrentPage(currentPage - 1);
    }
  }

  // Functions for seting current page on pressing nextPage button
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // To add a new row, the function callback is handled here
  const addUserCallback = (newRow) => {
    setMainData((state) => {
      return [...state, newRow];
    });
  };

  // The search operation function which is called in search.js is handled here.
  const searchOpperation = (newName) => {
    const newData = mainData.filter(row => {
      if (row.firstName.toLowerCase().includes(newName.toLowerCase()) ||
        row.lastName.toLowerCase().includes(newName.toLowerCase())
      )
        return true
      return false
    })
    setUserInfo((state) => {
      return newData
    });
  };

  return (
    <>
      {/* Search Content is here handled, passing the function searchOpperation used in search.js page and handled in TableDoc.js after line 49 */}
      <Search searchOpperation={searchOpperation} />
      {/* Table Content is here handled */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Aadhar ID</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Birthday</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Email ID</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              records?.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.id}</StyledTableCell>
                  <StyledTableCell align="center">{row.firstName}</StyledTableCell>
                  <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                  <StyledTableCell align="center">{row.birthDate}</StyledTableCell>
                  <StyledTableCell align="center">{row.age}</StyledTableCell>
                  <StyledTableCell align="center">{row.email}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p></p>
      {/* To Add a new user, feature is handled here, passing   the function addUserCallback used in addTable.js page and handled in TableDoc.js after line 42 */}
      <Addtable addUserCallback={addUserCallback} />
      {/* Pagination which is handled here including a dropdown method*/}

      {/* here in we need to add previous and next tpage element to implement  */}

      <Button 
        onClick={prevPage}
      >Prev
      </Button>
      <Button
        onClick={nextPage}
      >Next
      </Button>
      current page no. {currentPage} of {npage}.

      <label>
        <select
          value={recordsPerPage}
          onChange={e => setRecordsPerPage(e.target.value)}
        >
          <option value='5'>5</option>
          <option value='15'>15</option>
          <option value='20'>20</option>
        </select>
      </label>

    </>
  )

}

