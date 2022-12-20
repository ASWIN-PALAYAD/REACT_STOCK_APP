import React from 'react'
import { useState,useEffect,useContext } from 'react'
import finHub from '../apis/finHub'
import { WatchListContext } from '../context/watchListContext'

const AutoComplete = () => {

  const {addStock} = useContext(WatchListContext);

  const [search, setSearch] = useState('');
  const [result, setResult] = useState([])

  

  useEffect(() => {
    let isMounted = true;

    const fetchData = async() => {
      try {
        const response = await finHub.get('/search',{
          params : {
            q:search
          }
        })
        console.log(response);
        if(isMounted){
          setResult(response.data.result)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(search.length > 0){
      fetchData();
    }else{
      setResult([])
    }
    
    return () => (isMounted = false)
  }, [search])


  const renderDropdown = () => {
    const dropdownClass = search? "show" : null;
    return (
      <ul style={{
        height:"300px",
        overflowY:"scroll",
        overflowX:'hidden',
        cursor:'pointer' 
      }} className= {`dropdown-menu ${dropdownClass}`} >
        {result.map((item,index) => (
          <li className='dropdown-item' key={index} 
          onClick={()=> {
            addStock(item.symbol)
            setSearch('')
          } } >
            {item.description} ({item.symbol}) </li>
        ))}
      </ul>
    )
  }

  
  

  return (
    <div className='w-50 p-5 rounded mx-auto' >
      <div className='form-floating dropdown' >
        <input type="text" style={{backgroundColor:'rgba(145,158,171,0.04'}} id="search" className='form-control ' 
        placeholder='Search' autoComplete='off' value={search} onChange={(e)=> setSearch(e.target.value)}  />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
      </div>
    </div>   
  )
}

export default AutoComplete   