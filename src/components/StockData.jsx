import React,{useState,useEffect} from 'react'
import finHub from '../apis/finHub'

const StockData = ({symbol}) => {
    const [stockData, setStockData] = useState()

    useEffect(() => {
        let isMounted = true

        const fetchData = async() => {
            try {
                const response = await finHub.get('/stock/profile2',{
                    params:{
                        symbol
                    }
                })
                console.log(response);
                if(isMounted){
                    setStockData(response.data)
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
        return () => (isMounted = false)
      
    }, [symbol])
    


  return (
    <div>
          {stockData && (
            <div className='row border bg-white rounded shadow-sm p-4 mt-5' >
                <div className='col' >
                    <div>
                        <span className='fw-bold'>name:{stockData.name}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>country:{stockData.country}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>ticker:{stockData.ticker}</span>
                    </div>
                </div>

                <div className='col' >
                    <div>
                    <span className='fw-bold'>Exchange:{stockData.exchange}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>Industry:{stockData.finnhubIndustry}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>IPO:{stockData.ipo}</span>
                    </div>
                </div>

                <div className='col' >
                    <div>
                        <span className='fw-bold'>MarketCap:{stockData.marketCapitalization}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>Shares Outstanding:{stockData.shareOutstanding}</span>
                    </div>
                    <div>
                        <span className='fw-bold'>url: <span><a href={stockData.weburl}>{stockData.weburl} </a></span> </span>
                    </div>
                </div>
            </div>
          )}
    </div>
  )
}

export default StockData