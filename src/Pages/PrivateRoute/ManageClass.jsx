import React, { useContext, useState, useRef } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthContext } from '../../ContextProvider/AuthProvider'
import { Navigate, useLocation } from "react-router";
import axios from 'axios';
import Swal from 'sweetalert2'
import useTitle from '../../Hooks/useTitle'

const ManageClass = () => {
  useTitle('Manage Class')
  const modalRef = useRef(null);
  const {user} = useContext(AuthContext);

  const { refetch, data: allClass = [] } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
        const res = await axios.get(` https://server-a12.vercel.app/allClasses`)
        return res.data;
    },
})
// console.log(allClass);

const showModal = () => {
  modalRef.current.showModal();
};

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
      fetch(` https://server-a12.vercel.app/updateClassStatus/${itemID}`,{
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
    
       allClass && 
       <div>
          <h1 className='text-3xl font-semibold text-center my-5'>Admin Dashboard-  Manage Class</h1>
          <div className="overflow-x-auto ms-4 mt-8">
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
                        className="btn btn-outline btn-info" onClick={showModal}>Feedback</button>
                        <dialog ref={modalRef} className="modal">
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
                    </tr>
                  ))
                }
              </tbody> 
            </table>
          </div>
       </div>
    
  )
}

export default ManageClass