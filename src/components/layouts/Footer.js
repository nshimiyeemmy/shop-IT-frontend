import React, { Fragment } from 'react'
import '../../App.css'
const Footer = () => {
    return (
        <Fragment>      
<footer className="container-fluid bg-grey pb-2 pt-5">
    <div className="foot">
   <div className="row">
      <div className="col-md-6">
         <div className="row">
            <div className="col-md-6 col-p-2 ">
               <div className="logo-part">
                  <img src="./images/logo.png" className="w-50 logo-footer" />
                  <p>7637 Laurel Dr. King Of Prussia, PA 19406</p>
                  <p>Use this tool as test data for an automated system or find your next pen</p>
               </div>
            </div>
            <div className="col-md-6 px-4">
               <h5> About Company</h5>
               <p>But horizontal lines can only be a full pixel high.</p>
               <a href="#" className="btn-footer"> More Info </a><br/>
               <a href="#" className="btn-footer"> Contact Us</a>
            </div>
         </div>
      </div>
      <div className="col-md-6">
         <div className="row">
            <div className="col-md-3 px-4">
               <h5> Help us</h5>
               <div className="row ">
                  <div className="col-md-6">
                     <ul>
                        <li> <a href="#"> Home</a> </li>
                        <li> <a href="#"> About</a> </li>
                        <li> <a href="#"> Service</a> </li>
                        <li> <a href="#"> Team</a> </li>
                        <li> <a href="#"> Help</a> </li>
                        <li> <a href="#"> Contact</a> </li>
                     </ul>
                  </div>
               </div>
            </div>




            <div className="col-md-3 px-4">
               <h5> Other links</h5>
               <div className="row ">
                  <div className="col-md-6">
                     <ul>
                       <li> <a href="#"> Collaboration</a> </li>
                        <li> <a href="#"> Fax</a> </li>
                        <li> <a href="#"> Terms</a> </li>
                        <li> <a href="#"> Policy</a> </li>
                        <li> <a href="#"> Refunds</a> </li>
                        <li> <a href="#"> Paypal</a> </li>
                     </ul>
                  </div>
               </div>
            </div>


            <div className="col-md-6 ">
               <h5> Newsletter</h5>
               <div className="social">
                  <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                  <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
               </div>
               <form className="form-footer my-3">
                  <input type="text"  placeholder="search here...." name="search"/>
                  <input type="button" value="Go" />
               </form>
               <p>That's technology limitation of LCD monitors</p>
               </div>
               </div>
              </div>
            </div>
            </div>
            <div className="text-center mt-1">Shopping Cart 2021-2020, All rights reserved</div>
            </footer>
                    </Fragment>
                )
            }

export default Footer
