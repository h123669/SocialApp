"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 6 characters')
      .matches(/[A-Z]/, 'Password must be start with uppercase letter') 
      .required('Password is required'),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required')
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''
    },
    validationSchema, 
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
      <Paper elevation={6}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ marginBottom: '20px', width: '100%' }}>
              <TextField
                sx={{ width: "100%" }}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="name"
                label="Enter Your Name"
                name="name"
                variant="filled"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }}>
              <TextField
                sx={{ width: "100%" }}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id="email"
                label="Enter Your Email"
                name="email"
                variant="filled"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }}>
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
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }}>
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
                error={formik.touched.rePassword && Boolean(formik.errors.rePassword)}
                helperText={formik.touched.rePassword && formik.errors.rePassword}
              />
            </Box>

            <Box sx={{ marginBottom: '20px', width: '100%' }}>
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

            <Box sx={{ marginBottom: '1px', width: '100%' }}>
              <FormControl sx={{ m: 1, minWidth: 100, width: '99%' }}>
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
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#1769aa',
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
