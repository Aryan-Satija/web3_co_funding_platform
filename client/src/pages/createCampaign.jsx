import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useStateContext } from '../utils';
import './createCampaign.css';
export const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    story: '',
    goal: '',
    deadline: '',
    image: ''
  })
  const {publishCampaign} = useStateContext();
  const submitHandler = async(event)=>{
    event.preventDefault();
    const img = new Image();
    img.src = form.image;
    if(img.complete){
    }
    img.onload = async() => {
        await publishCampaign({...form, goal: ethers.utils.parseUnits(form.goal, 18)});
    }
    img.onerror = ()=>{
        console.log('invalid image....')
    }
  }
  const changeHandler = (event)=>{
    setForm(prev => {
        return {
            ...prev,
            [event.target.id]: event.target.value 
        }
    });
  }
   return (
    <form style={{padding:'10px', display:'flex', flexDirection:'column', gap:'20px'}} onSubmit={submitHandler}>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='name' className='formFieldTitle'>Your Name <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='name' placeholder='John Doe' className='formField' onChange={changeHandler} autoComplete='off' required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='title' className='formFieldTitle'>Campaign Title <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='title' placeholder={'Enter Your Campaign Title'} className='formField' autoComplete='off' onChange={changeHandler} required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='story' className='formFieldTitle' >Your Story <span style={{color:'#00ff00'}}>*</span></label>
            <textarea rows={'10'} id='story' placeholder={'Enter Your Campaign Story'} className='formField' autoComplete='off' onChange={changeHandler} required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='goal' className='formFieldTitle'>Goal <span style={{color:'#00ff00'}}>*</span></label>
            <input type='number' placeholder={'1 Eth'} step={0.1} id='goal' className='formField' autoComplete='off' onChange={changeHandler} required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='deadline' className='formFieldTitle'>Deadline <span style={{color:'#00ff00'}}>*</span></label>
            <input type='date' id='deadline' className='formField' autoComplete='off' onChange={changeHandler} required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='image' className='formFieldTitle'>Image <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='image' placeholder={'Enter Your Image Url'} className='formField' autoComplete='off' onChange={changeHandler} required/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <button className='btn' type='submit'>
                SUBMIT
            </button>
        </div>
    </form>
  )
}
