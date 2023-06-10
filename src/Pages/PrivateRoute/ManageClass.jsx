import React, { useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'

const ManageClass = () => {
  const {user} = useContext(AuthContext);

  const { refetch, data: allClass = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
        const res = await axios.get(`http://localhost:5000/allClasses`)
        return res.data;
    },
})
// console.log(allClass);

const handleFeedback = (event) =>{
  // event.preventDefault();
  const feed = event.target.feedback.value;
  const ID = event.target.itemID.value;
  const stat = event.target.status.value;
  updateStatus(ID, stat, feed)
} 


const updateStatus = (itemID, status, feedback) =>{
  const updatedItem = {status:status, feedback:feedback}
  console.log(updatedItem);
    
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fetch(`http://localhost:5000/updateClassStatus/${itemID}`,{
        method:'PUT',
        headers:{
          'content-type' : 'application/json'
        },
        body: JSON.stringify(updatedItem)
      })
      .then((res)=>res.json())
      .then(data =>{
         if(data.modifiedCount > 0) {
          Swal.fire('Information updated successfully!')
          refetch()
         }
        //  console.log(data);
      })
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })

}

  return (
    
       allClass && <div className="overflow-x-auto ms-4 mt-8">
        <table className="table table-xs">
          <thead className='table-head'>
            <tr >
              <th></th> 
              <th>Picture</th> 
              <th>Class Info</th> 
              <th>Seats</th> 
              <th>Price</th> 
              <th>Status</th> 
              <th>Update Status</th> 
            </tr>
          </thead> 
          <tbody>
            {
              allClass?.map((item, index)=>(
                <tr key={item._id} >
                   <th>{index + 1}</th>
                   <td > <img className='user-img' src={item.picture} alt={item.name} /> </td>
                   <td>
                      <p>Class name: {item.className.toUpperCase()} </p>
                      <p>Instructor name:  {item.instructorName.toUpperCase()} </p>
                      <p>Instructor email: {item.instructorEmail} </p>
                   </td>
                   <td>{item.seats}</td>
                   <td>{item.price}</td>
                   <td>{item.status}</td>
                   <td>
                     <button
                     className="btn btn-outline btn-primary me-4" 
                     disabled={item.status == `Pending` ? false : true}
                     onClick={()=> updateStatus(item._id, `Approved`, item.feedback)}>Approve</button>

                     <button
                     className="btn btn-outline btn-error me-4"
                     disabled={item.status == `Pending` ? false : true}
                     onClick={()=> updateStatus(item._id, `Denied`, item.feedback)}>Deny</button>

                     <button
                     className="btn btn-outline btn-info"    onClick={()=>window.my_modal_4.showModal()}>Feedback</button>

                <dialog id="my_modal_4" className="modal">
                      <form onSubmit={handleFeedback} method="dialog" className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg">Hello Mr. Admin!</h3>
                        <p className="py-4">Write Your Propestive feedback below</p>
                        <input className="hidden" type="text" name='itemID' defaultValue={item._id}  readOnly/>
                        <input className="hidden" type="text" name='status' defaultValue={item.status}  readOnly/>
                        <textarea className="textarea textarea-success w-full" name='feedback' placeholder="Feedback"></textarea>
                   
                        <div className="modal-action">
                          {/* if there is a button, it will close the modal */}
                          <button type='submit' className="btn">Send</button>
                        </div>
                      </form>
                </dialog>
                   </td>
                   {/* You can open the modal using ID.showModal() method */}
                    {/* <button className="btn" onClick={()=>window.my_modal_4.showModal()}>open modal</button> */}
                   
                </tr>
              ))
            }
          </tbody> 
        </table>
       
    </div>
    
  )
}

export default ManageClass