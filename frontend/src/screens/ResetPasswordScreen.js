// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';

// export default function ResetPasswordScreen(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const redirect = props.location.search
//     ? props.location.search.split("=")[1]
//     : "/";
//   const userForgotpassword = useSelector((state) => state.userForgotpassword);
//   const { userInfom , loading, error} = userForgotpassword;
//   const dispatch = useDispatch();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Password and confirm password are not match');
//     } else {
//       dispatch(forgotpassword( email, password));
//     }
//   };
//   useEffect(() => {
//     if (userInfom) {
//       props.history.push(redirect);
//     }
//   }, [props.history, redirect, userInfom]);
//     return (
//         <div>
//         <form className="form" onSubmit={submitHandler}>
//           <div>
//             <h1>Registration</h1>
//           </div>
//           {loading && <LoadingBox></LoadingBox>}
//           {error && <MessageBox variant="damn">{error}</MessageBox>}
//           <div>
//             <label htmlFor="email">Email: </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter email"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="password">Password: </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter password"
//               required
//               onChange={(e) => setPassword(e.target.value)}
//             ></input>
//           </div>
//           <div>
//             <label htmlFor="confirmPassword">Confirm Password: </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Enter confirm password"
//               required
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             ></input>
//           </div>
//           <div>
//             <label />
//             <button className="primary" type="submit">
//               Update
//             </button>
//           </div>
//           <div>
//             <label />
//             <div>
//             You already have an account, right? <Link to={`/login?redirect=${redirect}`}>Login Now !!!</Link>
//             </div>
//           </div>
//         </form>
//       </div>
//     )
// }
