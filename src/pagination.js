import React, { useContext, useState ,useEffect} from 'react'


function Pagination({nPages, setCurrentPage}) {
   
  let pages=[];
  for(let i=1; i<=Math.ceil(nPages); i++){
    pages.push(i);
   }

  return (
    <div> {pages.map((pageNumber,index)=><button onClick={()=>setCurrentPage(pageNumber)} >{pageNumber}</button>)}</div>
  )
}

export default Pagination