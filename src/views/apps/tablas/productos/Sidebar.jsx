import React from 'react'

const Sidebar = (props) => {
  const {open,toggle, type}=props;

  if(type==="edit"){
    console.log("Este modal es para editar");
  }else{
    console.log("este modal es para agregar");
  }
  
  return (
    <div></div>
  )
}

export default Sidebar
