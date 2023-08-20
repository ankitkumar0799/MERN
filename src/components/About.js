import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import { useEffect } from 'react';

const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // esline-disable-next-line 
  }, [])
  
  return (
    <div>About this is {a.state.name}and gender is {a.state.gender} and age is 
    {a.age}</div>
  )
}

export default About