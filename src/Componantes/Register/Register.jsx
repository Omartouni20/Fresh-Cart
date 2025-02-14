import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { ThreeDots } from 'react-loader-spinner';


export default function Register() {

  const navigate = useNavigate() ;
  const [errorMessage, seterrorMessage] = useState(null) ;
  const [isSuccess, setisSuccess] = useState(false) ;
  const [isClicked, setisClicked] = useState(false) ;
  
 async function registerSubmit ( values ) {
    //console.log('Hello From Formikkkk...', values);

  setisClicked (true) ;
   axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup' , values )

   .then( function (res) {
    console.log('sa7' , res);
    setisSuccess (true) ;
    setisClicked(false) ;
    setTimeout(() => {
      
      navigate('/login')

    }, 2000);
    
   } )
   .catch( function (err) {
    console.log('8lt' , err);
    seterrorMessage(err.response.data.message) ;
    setisClicked(false) ;
    setTimeout(() => {
      
      seterrorMessage(null) ;

    }, 3000);
     
   } )

    
  }
let registerFormik =  useFormik(
  {
    initialValues : {
      name:'',
      email: '' ,
      phone: '' ,
      password: '' ,
      rePassword: '' ,
    } , 
    onSubmit: registerSubmit ,
    //validate: function (valdtionData) {
    //  const errors = {};
    //  const nameRegex = /^[A-z][a-z]{3,8}$/ ;
    //  const phoneRegex = /^(20)?01[0125][0-9]{8}$/ ;
    //  if (! nameRegex.test(valdtionData.name)) {
    //    errors.name = "Name Must Start With Capital Latter !"
    //  }
    //  if (valdtionData.email.includes('@') == false|| valdtionData.email.includes('.') == false ) {
    //    errors.email = "Invalid Email"
    //  }
    //  if (  phoneRegex.test(valdtionData.phone) == false ) {
    //    errors.phone = "Phone Number Must Be Egyptian"
    //  }
    //  if (valdtionData.password.length < 6 || valdtionData.password.length > 12) {
    //    errors.password = "Password Must Be From 6 To 12 Charcater"
    //  }
    //  if (valdtionData.password != valdtionData.rePassword) {
    //    errors.rePassword = "Password and re password doesn't Match"
    //  }      
    //  
    // return errors ; 
    //}
    validationSchema: yup.object().shape({

      name: yup.string().required('Name Is Required').min(3,'Min Chars (3)').max(12,'Max Chars (12)') ,
      phone: yup.string().required('Phone REquired').matches(/^01[0125][0-9]{8}$/) ,
      email: yup.string().required('Email Required').email('Invalid Email') ,
      password: yup.string().required('Password Required').min(6,'Min is 6 Chars').max(12 , 'Max is 12 Chars') ,
      rePassword: yup.string().required('Required').oneOf([ yup.ref  ('password') ] , 're passwoed doesnt match')       

    }) 

  }
)


  return (
    <>

     

<form className="max-w-md mx-auto p-5" onSubmit={ registerFormik.handleSubmit }>
  <h1 className="text-center p-4">Register Now!</h1>

    {isSuccess ? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-green-400" role="alert">

Congratulations

</div> :  '' }

    {errorMessage ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

    {errorMessage}

    </div> : '' }
  <div className="relative z-0 w-full mb-5 group">
    <input type="text" name="name" value={registerFormik.values.name} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>

    {registerFormik.errors.name  && registerFormik.touched.name ? 
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

      {registerFormik.errors.name}

    </div> : '' }

  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input type="email" name="email" value={registerFormik.values.email} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>

    {registerFormik.errors.email && registerFormik.touched.email ?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

      {registerFormik.errors.email}

    </div> : '' }

  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input type="tel" name="phone" value={registerFormik.values.phone} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>

    {registerFormik.errors.phone && registerFormik.touched.phone ?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

      {registerFormik.errors.phone}

    </div> : '' }

  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="password" value={registerFormik.values.password} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

    {registerFormik.errors.password && registerFormik.touched.password ?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

      {registerFormik.errors.password}

    </div> : '' }

  </div>


  <div className="relative z-0 w-full mb-5 group">
    <input type="password" name="rePassword" value={registerFormik.values.rePassword} onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>

    {registerFormik.errors.rePassword && registerFormik.touched.rePassword ?
    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">

      {registerFormik.errors.rePassword}

    </div> : '' }

  </div>


  <button type="submit" className="text-white bg-green-400 hover:bg-green-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    
    { !isClicked ? "Submit" :<ThreeDots
  visible={true}
  height="20"
  width="40"
  color="#fff"
  radius="10"
  ariaLabel="three-dots-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /> }
    
  </button>



</form>


    </>
  )
}
