import React from 'react'
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoCreate } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import logo from "../assets/logo.svg";
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
export const Navbar = () => {
  const navigate = useNavigate();
    return (
    <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '20px', paddingRight: '20px', paddingTop: '5px', paddingBottom: '5px', boxShadow: '20px 2px 10px #111111'}}>
        <div className='icon'>
            <img src={logo}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '4rem'}}>
            <div className='icon' onClick={()=>{
                navigate('/');
            }}>
                <FaHome size={'25px'}/>
            </div>
            <div className='icon' onClick={()=>{
                navigate('/createCampaign');
            }}>
                <IoCreate size={'25px'}/>
            </div>
            <div className='icon'>
                <CgProfile size={'25px'}/>
            </div>
        </div>
        <div className='icon'>
            <GoSignOut size={'25px'}/>
        </div>
    </div>
  )
}
