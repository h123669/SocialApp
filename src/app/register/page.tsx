"use client";
import React from 'react';
import { useFormik } from 'formik';
import { Container, Paper, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';
import { submitRegister } from '@/lib/redux/authSlice';
import { useDispatch } from 'react-redux';
import { store } from '@/lib/redux/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string; 
  gender: string;
}

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch<typeof store.dispatch>();

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    onSubmit: (values) => {
      dispatch(submitRegister(values))
        .then((response) => {
          console.log(response);
          if(response?.payload?.data?.message === "success"){
            toast.success('Success...!');
            router.push("/login");
          } else {
            toast.error('Invalid email or password...');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={24}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ marginBlock: "20px" }}>
            <TextField
              sx={{ width: "100%" }}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="name"
              label="Enter Your Name"
              name="name"
              variant="filled"
            />
          </Box>

          <Box sx={{ marginBlock: "20px" }}>
            <TextField
              sx={{ width: "100%" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              label="Enter Your Email"
              name="email"
              variant="filled"
            />
          </Box>

          <Box sx={{ marginBlock: "20px" }}>
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              id="password"
              label="Enter Your Password"
              name="password"
              variant="filled"
              type="password"
            />
          </Box>

          <Box sx={{ marginBlock: "20px" }}>
            <TextField
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              sx={{ width: "100%" }}
              id="rePassword"
              label="Confirm Your Password"
              name="rePassword"
              variant="filled"
              type="password"
            />
          </Box>

          <Box sx={{ marginBlock: '20px' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Enter Your Birthday"
                id="dateOfBirth"
                value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
                onChange={(date) => {
                  if (date && date.isValid()) {
                    formik.setFieldValue('dateOfBirth', date.format());
                  } else {
                    formik.setFieldValue('dateOfBirth', '');
                  }
                }}
                onBlur={formik.handleBlur}
                sx={{ width: '100%' }}
              />
            </LocalizationProvider>
          </Box>

          <Box sx={{ marginBlock: "20px" }}>
            <FormControl sx={{ m: 1, minWidth: 100 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="gender"
                autoWidth
                label="Gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          
          <Button type="submit" variant="contained">Submit</Button>
        </form>
      </Paper>
    </Container>
  );
}

