import React from 'react';
import { useState,useEffect,useContext } from 'react';
import finHub from '../apis/finHub';
import { useNavigate } from 'react-router-dom';
import { BsFillCaretUpFill} from "react-icons/bs";
import { BsFillCaretDownFill} from "react-icons/bs";
import { WatchListContext } from '../context/watchListContext';


const StockList = () => {

    const [stock, setStock] = useState();
    const {watchList,deleteStock} = useContext(WatchListContext);
    const navigate = useNavigate();
    

    useEffect(() => {
      let isMounted = true;
      const fetchData = async() =>{
        try {
          const response = await Promise.all(watchList.map((stock)=> {
            return finHub.get('/quote',{
              params:{
                symbol:stock
              }
            })
          }))
          console.log(response);
          const data = response.map((response)=> {
            return {
              data:response.data,
              symbol:response.config.params.symbol
            }
          })
          console.log(data);
          if(isMounted){
            setStock(data)
          }
        } catch (error) {
            
        }
      }
      fetchData();

      return ()=> (isMounted = false)

    }, [watchList]) 

    const changeColor = (change) => {
      return change > 0 ? "success" : "danger"
    }

    const renderIcon = (change) => {
      return change > 0 ? <BsFillCaretUpFill/> : <BsFillCaretDownFill/>
    }

    const handleStockSelect = (symbol) => {
      navigate(`/detail/${symbol}`)
    }
    

  return (
    <div>
      <table className='table hover mt-5' >
        <thead style={{color:"rgb(79,89,102)"}} >
          <tr>
            <th className='col' >Name</th>
            <th className='col' >Last</th>
            <th className='col' >Chg</th>
            <th className='col' >Chg%</th>
            <th className='col' >High</th>
            <th className='col' >Low</th>
            <th className='col' >Open</th>
            <th className='col' >Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock?.map((stockData)=>{
            return (
              <tr onClick={()=> handleStockSelect(stockData.symbol)} style={{cursor:'pointer'}} className='table-row' key={stockData.symbol} >
                <th>{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`} >
                  {stockData.data.d} {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dd)}`} >
                  {stockData.data.dp} {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc} 
                    <button onClick={(e)=> {
                        e.stopPropagation()
                        deleteStock(stockData.symbol) 
                    }} 
                    className='btn btn-danger btn-sm mx-3 d-inline-block delete-button' >Remove</button> 
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StockList