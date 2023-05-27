import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableSortLabel,
  Typography,
  Box,
  TablePagination,
  IconButton,
  Popover,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./CustomTable.style.css";
import { fetchStudentDetails } from "../api/apiAgent";
import FilterListIcon from "@mui/icons-material/FilterList";
import Loader from "./Loader";

const studentsTableColumns = ["Student Id", "Name", "Total Marks"];

const CustomTable = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [count, setCount] = useState<number>(0);
  const [studetsData, setStudentsData] = useState<any>([]);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const [filterColumnValue, setfilterColumnValue] = useState({
    studentId: "",
    name: "",
    totalMarks: 0,
  });

  const [loader, setLoader] = useState<Boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    const params = {
      pageNumber: newPage,
      limit: rowsPerPage,
    };
    getStudentDetails(params);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const params = {
      pageNumber: 0,
      limit: +event.target.value,
    };
    getStudentDetails(params);
  };

  const getStudentDetails = async (params?: any) => {
    try {
      setLoader(true);
      const result = await fetchStudentDetails(params);
      setPage(result.data.metadata.currentPage);
      setRowsPerPage(result.data.metadata.studentsPerPage);
      setCount(result.data.metadata.totalStudents);
      setStudentsData(result.data);
    } catch (error: any) {
      console.log("Error in fetching student details", error);
    } finally {
      setLoader(false);
    }
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
    setfilterColumnValue({
      studentId: "",
      name: "",
      totalMarks: 0,
    });
  };

  const handleFilterChage = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;
    setfilterColumnValue((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleColumnFilterSearch = () => {
    const params = {
      pageNumber: page,
      limit: rowsPerPage,
      studentId: filterColumnValue.studentId || undefined,
      name: filterColumnValue.name || undefined,
      totalMarks: filterColumnValue.totalMarks || undefined,
    };

    handleFilterClose();
    getStudentDetails(params);
  };

  const handleRemoveFilters = () => {
    handleFilterClose();
    getStudentDetails({ pageNumber: page, limit: rowsPerPage });
  };

  useEffect(() => {
    getStudentDetails({ pageNumber: page, limit: rowsPerPage });
  }, [page, rowsPerPage]);
  return (
    <>
      <Box className="students-table-box">
        <Paper className="paper-container">
          <Box className="table-labels-container">
            <Typography variant="h5" className="table-title">
              Students Details
            </Typography>
            <IconButton onClick={handleFilterClick}>
              <FilterListIcon />
            </IconButton>
          </Box>
          {loader ? (
            <Box className="laoder-container">
              <Loader />
            </Box>
          ) : (
            <>
              <TableContainer className="table-container">
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {studentsTableColumns.map(
                        (columnName: any, index: number) => (
                          <TableCell key={index} style={{ minWidth: "2rem" }}>
                            {columnName}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody className="table-body">
                    {studetsData.studentsDetails?.length > 0 &&
                      studetsData.studentsDetails.map(
                        (row: any, index: number) => {
                          return (
                            <TableRow hover key={index}>
                              <TableCell>{row.studentId}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.totalMarks}</TableCell>
                            </TableRow>
                          );
                        }
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

          <TablePagination
            rowsPerPageOptions={[5, 10, 20, 30, 50]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box className="popover-container">
          <Button onClick={handleRemoveFilters}>Remove Filters</Button>
          <TextField
            placeholder="Filter by Id"
            name="studentId"
            variant="standard"
            value={filterColumnValue.studentId}
            onChange={handleFilterChage}
          />
          <TextField
            placeholder="Filter by name"
            name="name"
            variant="standard"
            value={filterColumnValue.name}
            onChange={handleFilterChage}
          />
          <TextField
            placeholder="Filter by totalMarks"
            name="totalMarks"
            variant="standard"
            value={filterColumnValue.totalMarks || ""}
            onChange={handleFilterChage}
          />
          <Button variant="contained" onClick={handleColumnFilterSearch}>
            Filter
          </Button>
        </Box>
      </Popover>
    </>
  );
};
export default CustomTable;
