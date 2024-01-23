import React, { useState } from 'react';
import './createCampaign.css';
export const CreateCampaign = () => {
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: ''
  })

   return (
    <form style={{padding:'10px', display:'flex', flexDirection:'column', gap:'20px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='name' className='formFieldTitle'>Your Name <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='name' placeholder='John Doe' className='formField'/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='title' className='formFieldTitle'>Campaign Title <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='title' placeholder={'Enter Your Campaign Title'} className='formField'/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='story' className='formFieldTitle' >Your Story <span style={{color:'#00ff00'}}>*</span></label>
            <textarea rows={'10'} id='story' placeholder={'Enter Your Campaign Story'} className='formField'/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='goal' className='formFieldTitle'>Goal <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' placeholder={'1 Eth'} id='goal' className='formField'/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='deadline' className='formFieldTitle'>Deadline <span style={{color:'#00ff00'}}>*</span></label>
            <input type='date' id='deadline' className='formField'/>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap:'5px', width:'100%', alignItems:'center'}}>
            <label htmlFor='image' className='formFieldTitle'>Image <span style={{color:'#00ff00'}}>*</span></label>
            <input type='text' id='image' placeholder={'Enter Your Image Url'} className='formField'/>
        </div>
    </form>
  )
}
