import { useEffect, useState } from "react";
import './App.css'

function Page() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const getProducts = async()=>{
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        if(data && data.products){
            setProducts(data.products);
            setPage(page);
        }
    }

    useEffect(()=>{
        getProducts();
    },[])

    const handleSelectPage = (selectedPage)=>{
        if(selectedPage>0 && selectedPage <= products.length / 10)
            setPage(selectedPage);
    }
  return (
    <div className="h-screen">
        <div className="w-3/4 m-auto p-5 border-2 flex gap-2 flex-wrap justify-between">
            {
                products.slice(page * 10 - 10, page * 10).map((item) => {
                    return(
                        <div key={item.id} className="w-40 h-56 flex flex-col items-center bg-zinc-300">
                            <img src={item.images} alt={item.title}/>
                            <span>{item.title}</span>
                        </div>
                    )
                })
            }
        </div>

        {
            (products.length > 0) && <div className="pagination bottom-0 p-4 m-auto text-2xl flex items-center justify-center">
                <span className={`px-2 ${(page === 1) && "hidden"}`} onClick={()=>handleSelectPage(page - 1)}>Prev</span>
                {
                    [...Array(products.length / 10)].map((_,index)=>(
                        <span key={index} className={`px-4 ${(page === index + 1) && "bg-blue-400"}`}
                        onClick={()=>handleSelectPage(index + 1)}>{index+1}</span>
                    ))
                }
                <span className={`px-2 ${(page === products.length / 10) && "hidden"}`}
                onClick={()=>handleSelectPage(page + 1)}
                >Next</span>
            </div>
        }
    </div>
  )
}

export default Page