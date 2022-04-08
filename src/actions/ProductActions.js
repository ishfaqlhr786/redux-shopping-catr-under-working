import axios from 'axios'
import React ,{useState} from 'react'


export const GetProductList = () => async (dispatch) => {
   // const [items,setItems]= useState([])
 //  var items=[]
  const id=2

   try {
      dispatch({
        type: "LIST_LOADING",
      });
      const res = await axios.get(
        `https://fakestoreapi.com/products`
      )
      console.log(res.data)
  
   
     dispatch({
        type: "LIST_SUCCESS",
        payload:res.data,
      
     
      });
      
      
    } catch (e) {
      console.log(e.message, "error");
      dispatch({
        type: "LIST_FAIL",
      });
    }

  };
