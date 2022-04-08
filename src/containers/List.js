import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useSelector,useDispatch}  from 'react-redux'
import  Drawer  from '@material-ui/core/Drawer'
import {GetProductList}  from '../actions/ProductActions'
import {Pagination}  from './Pagination'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'
import {CartItem} from './CartItem'
export const List = () => {
    const dispatch= useDispatch()
  const [posts,setPosts]=useState([]);
  const [cartOpen,setCartOpen]=useState(false);
  const [limit,setLimit]=useState(10)
  const [showPerPage,setShowPerPage]= useState(limit)
  const list= useSelector((state)=>state.List)
  console.log(list.data)
  const [startPage,setStartPage]= useState(0)
  const [pagination,setPagination]=useState({
    start:0,
    end:showPerPage
  })
  const [cartItem,setCartItem]= useState([] );
  const CalculateTotal1=(items) => 
  
  
  items.reduce((ack,item)=> ack + item.amount ,0);
  
  const getTotalItems=(items)=>
    { items.reduce((ack,item)=> ack +item.amount,0)}
  //console.log(getTotalItems)
  const handleAddToCart=(clickedItem)=>{
    setCartItem(prev=>{
      const isItemInCart=prev.find(item=>item.id===clickedItem.id)
      
      
      if(isItemInCart){
        console.log("items ain cart is",isItemInCart)
        return prev.map(item=> item.id===clickedItem.id?{...item,amount:item.amount +1}: item
        );
      }
      return [...prev,{...clickedItem,amount:1}]
    })
  }
  const handleRemoveFromCart=(id)=>{
    setCartItem(prev => prev.reduce((ack,item)=>{
    if(item.id===id){
      if(item.amount===1)  return ack;
      return [...ack,{...item,amount:item.amount -1}];
    }  else {
      return [...ack,item];
    }
    },[] )
    
    )
    
    
    
      }
  const onPageChange=(start,end)=>{
   
    console.log(start,end)
    setPagination({start:start,end:end})
  }
  const handleLimit=(e)=>{
   e.preventDefault()
    setLimit(e.target.value)
    setShowPerPage(e.target.value)
    onPageChange(0,e.target.value)
   
   
  }
  console.log("limit is",limit)
 // setShowPerPage(limit)
  console.log("show per page is", showPerPage)
 // console.log(posts)
  const FetchData=()=>{
    // const res= await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    // console.log(res.data)
    // setPosts(res.data)


  }
  //console.log("posts ",list)
 
 

 
useEffect(()=>{
    dispatch(GetProductList())
},[limit])
const handleAdd=(e,id)=>{
    e.preventDefault()
    console.log("id is",id)
}
  return (
    <div className="App" >
        <Drawer anchor="right" 
        style={{width:"500px",color:"black",zIndex:"100"}}
        open ={cartOpen} onClose={()=>{
       setCartOpen(false)
     }}>
      ur carthhhhjhfhfhf
      <CartItem cartItems={cartItem} addToCart={handleAddToCart}
       removeFromCart={handleRemoveFromCart}
       />
      
        </Drawer>
        <button onClick={()=>
       setCartOpen(true)
     }> 
     <Badge badgeContent={CalculateTotal1(cartItem).toFixed(0)} color="error">
       <AddShoppingCartIcon/>
     
     </Badge>
    
     </button>
      <div className="row">
     {
       list.data.slice(pagination.start,pagination.end).map(item=>{
         return (<>
         <div className="col-md-3 mb3" key={item.id}>
           <div className="card">
             <div className="card-body">
               <h3>{item.id}   {item.category}</h3>
               <p>
                 {item.title}
               </p>
           <span>
               <img src={item.image} alt="ll" height="100px"  width="100px"/>
           </span>
 <button className="btn btn-md btn-success" onClick={()=>handleAddToCart()}>Add to Cart</button>
             </div>
           </div>
         </div>
         </>)
       })
     }
      </div>
      <select style={{height:"50px"}}
               value={limit}
                name="limit"
              //  placeholder={placeholder}
                onChange={handleLimit}
                
              >
                
                <option value="10">10</option>
                <option value="20">
                  20
                  </option>
                <option value="5">5</option>
              </select>
      <Pagination showPerPage={showPerPage} onPageChange={onPageChange}
      total={list.data.length} limit={limit}
      />
    </div>
  )
}
