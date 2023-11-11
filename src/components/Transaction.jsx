import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { typography } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';
import configHost from '../config';
import Typography from '@mui/material/Typography';
import { createDate, toFullDate } from '../modules/dateModules';
import axios from 'axios';
export default function Transaction() {

    const [transaction, setTransaction] = useState([])
    const fetchTransactionAll = () => {
        fetch(`${configHost}/transaction/all`)
            .then(res => res.json())
            .then(
                (result) => {
                    setTransaction(result.transaction);
                    console.log(result.transaction)
                },
            ).catch((err) => {
                console.log(err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err
                });
            })
    }
    useEffect(() => {
        fetchTransactionAll()
    }, [])

    const deleteTransactionById = (id, file) => {
        Swal.fire({
            title: "ลบธุรกรรม",
            text: "ต้องการลบธุรกรรมนี้ใช่ หรือไม่ ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${configHost}/transaction/delete/${id}/${file}`)
                    .then((response) => {
                        if (response.status == 200) {
                            Swal.fire({
                                position: "top",
                                icon: "success",
                                title: "ลบเรียบร้อย",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        fetchTransactionAll()
                    }).catch((err) => {
                        console.log(err)
                        Swal.fire({
                            icon: "error",
                            title: "ลบข้อมูลล้มเหลว",
                            text: err
                        })
                    }
                    );
            }
        })
    }
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ display: 'flex' }}>
                    <Box m={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="h2">
                            รายการใช้-จ่าย
                        </Typography>
                    </Box>
                    <Box m={2}>
                        <Link href="/add">
                            <Button variant="contained">
                                เพิ่ม
                            </Button>
                        </Link>

                    </Box>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>เลขที่</TableCell>
                                <TableCell align='center' ></TableCell>
                                <TableCell>ชื่อธุรกรรม</TableCell>

                                <TableCell>วันที่ทำรายการ</TableCell>
                                <TableCell >วันทีี่เพิ่มรายการ</TableCell>
                                <TableCell>ประเภทธุรกรรม</TableCell>
                                <TableCell align="right">จำนวน</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transaction.map((row) => (
                                <TableRow
                                    key={row.transaction_id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.transaction_id}</TableCell>
                                    <TableCell align='center'>
                                        <img className='transaction-img' src={`${configHost}/${row.transaction_file}`} />
                                    </TableCell>
                                    <TableCell >
                                        {row.transaction_name}
                                    </TableCell>
                                    <TableCell>{toFullDate(row.transaction_date)}</TableCell>
                                    <TableCell>{toFullDate(row.create_at)}</TableCell>
                                    <TableCell>{row.transaction_type == 'income' ? 'รายรับ' : 'รายจ่าย'}</TableCell>
                                    <TableCell align="right">{row.transaction_amount}</TableCell>
                                    <TableCell align="center">
                                        <ButtonGroup variant="outline" sx={{ color: 'primary.main' }} aria-label="outlined primary button group">
                                            <Button href={`edit/${row.transaction_id}`} >Edit</Button>
                                            <Button onClick={(e) => deleteTransactionById(row.transaction_id, row.transaction_file)}>Delete</Button>
                                        </ButtonGroup></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );

}