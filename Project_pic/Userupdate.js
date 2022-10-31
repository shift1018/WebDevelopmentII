import React from 'react';
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";




function Userupdate() {
    const navigate = useNavigate();
    const {id} = useParams();
    const [userObject, setUserObject] = useState([]);
    useEffect(()=>{
      if (!localStorage.getItem("accessToken")) {
        navigate("/login");
    } else {
        axios.get(`http://localhost:3001/auth/byId/${id}`
        ).then((response)=>{
            setUserObject(response.data);
         
        });
      }
    },[])


    // const update = (data) => {
    //   axios.put(`http://localhost:3001/auth/update/${id}`, data
    //   ).then((response) => {
    //     navigate("/usermanage");
    //   });
    // };

    // `${userObject.username}`
    const initialValues = {
      username:"",
      email:"",
      phone:"",
      role:"user",
    
  };

        const onSubmit = (data) => {
          axios.put(`http://localhost:3001/auth/update/${id}`, data
          
          ).then((response) => {
            navigate("/usermanage");
          });
        };
      
        const validationSchema= Yup.object().shape({
          username:Yup.string().min(3).max(15).required(), 
          email:Yup.string().email().required(), 
          phone:Yup.string().required(), 
      
      }); 

  return (
    <div>
     
      <div className='form'>
          
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          >
        
          <Form className="formContainer">
            <label>User Name:</label>
            <ErrorMessage name="username" component="span" />
            <Field 
            id="inputCreateUser" 
            name="username" 
            placeholder={userObject.username}
            
            />
           
            <label>Email:</label>
            <ErrorMessage name="email" component="span" />
            <Field 
            id="inputCreateUser" 
            name="email" 
            placeholder={userObject.email}
            />

            <label>Phone:</label>
            <ErrorMessage name="phone" component="span" />
            <Field 
            id="inputCreateUser" 
            name="phone" 
            placeholder={userObject.phone}
            />


            <label>Role:</label>
            <ErrorMessage name="role" component="span" />
            <Field 
            id="inputCreateUser" 
            name="role" 
            placeholder={userObject.role}
            />

            <button className="btn btn-success col-12" type='submit' >Update</button>

          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default Userupdate



 





