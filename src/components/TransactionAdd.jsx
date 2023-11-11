import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { typography } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import configHost from '../config';

export default function TransactionAdd() {
    const [transactionName, setTransactionName] = useState()
    const [amount, setAmount] = useState()
    const [transactionType, setTransactionType] = useState()
    const [transactionFile, setTransactionFile] = useState()
    const [transactionDate, setTransactionDate] = useState()
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Box justifyContent={'end'} sx={{ display: 'flex' }}>
                    <Box m={2} sx={{ color: 'primary.main' }}>
                        <Button className='MuiButton-textInfo' variant="outline" href='/'>
                            หน้าแรก
                        </Button>
                    </Box>
                </Box>

                <div>
                    <Box m={2}>
                        <TextField onChange={(e) => setTransactionName(e.target.value)} label="ชื่อรายการ" variant="standard" fullWidth />
                    </Box>
                    <Box m={2}><p id='transactionNameErr' className='validate-err'></p></Box>

                    <Box m={2}>
                        <input onChange={(e) => setAmount(e.target.value)} type="number" min={1} name="" id="" />
                    </Box>
                    <Box m={2}><p id='transactionAmountErr' className='validate-err'></p></Box>
                    <Box m={2}>
                        <input onChange={(e) => setTransactionFile(e.target.files[0])} type='file'></input>
                    </Box>
                    <Box m={2}><p id='transactionFileErr' className='validate-err'></p></Box>
                    <Box m={2}>
                        <input onChange={(e) => setTransactionDate(e.target.value)} type="datetime-local" name="" id="" />
                    </Box>

                    <Box m={2}><p id='transactionDateErr' className='validate-err'></p></Box>
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">ประเภทธุรกรรม</FormLabel>
                        <RadioGroup
                            row
                            name="transaction-type"
                            onChange={(e) => setTransactionType(e.target.value)}
                        >
                            <FormControlLabel value="income" control={<Radio />} label="รายรับ" />
                            <FormControlLabel value="expense" control={<Radio />} label="รายจ่าย" />
                        </RadioGroup>
                    </FormControl>

                    <Box m={2}><p id='transactionTypeErr' className='validate-err'></p></Box>
                    <Box m={2}>
                        <Button onClick={handleSubmit} variant="contained">บันทึกรายการ</Button>
                    </Box>
                </div>
            </Container>
        </React.Fragment>
    );
    function handleSubmit() {

        const transactionForm = [
            { value: transactionName, 'validate': document.getElementById('transactionNameErr'), 'msg': 'ป้อนชื่อรายการทำธุรกรรม' },
            { formtype: "number", value: amount, 'validate': document.getElementById('transactionAmountErr'), 'msg': 'ป้อนชื่อจำนวนเงิน' },
            { value: transactionDate, 'validate': document.getElementById('transactionDateErr'), 'msg': 'ป้อนวันที่ และเวลารายการ' },
            { value: transactionType, 'validate': document.getElementById('transactionTypeErr'), 'msg': 'เลือกประเภทรายการ' },
            { value: transactionFile, 'validate': document.getElementById('transactionFileErr'), 'msg': 'เลือกไฟล์' },
        ]

        transactionForm.forEach((fd) => {
            const { value, validate, msg, formtype } = fd
            console.log(value)
            if (!value) {
                validate.innerText = msg
                validate.style.display = 'block'
            }
            if (value) {
                validate.innerText = ''
                validate.style.display = 'none'
            }
        })

        if (transactionForm.filter((v) => !v.value).length == 0) {
            const formData = new FormData()
            formData.append('transaction_name', transactionName)
            formData.append('transaction_date', transactionDate)
            formData.append('transaction_type', transactionType)
            formData.append('transaction_amount', amount)
            formData.append('transaction_file', transactionFile)

            axios.post(`${configHost}/transaction/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                if (response.status == 201) {
                    Swal.fire({
                        position: "top",
                        icon: "success",
                        title: "บันทึกเรียบร้อย",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setInterval(() => {
                        window.location.reload()
                    }, 1500)
                }
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "บันทึกข้อมูลล้มเหลว",
                    text: err
                })
            })
        }


    }
}