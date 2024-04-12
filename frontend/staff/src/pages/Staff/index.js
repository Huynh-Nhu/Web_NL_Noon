import { useEffect, useState } from "react";
import { getAllStaff, updateStaff } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { createAxios } from "../../Redux/createdInstance";
import { loginSuccess, refreshTokenSuccess } from "../../Redux/authSlice";
import UpdateStaff from "../../components/UpdateStaff";

function Staff() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const ListStaff = useSelector((state) => state.user.getAllUsers?.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  let axiosJWT = createAxios(user, dispatch, refreshTokenSuccess);
  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [name, setName] = useState("");
 

  const handleNameChange = (name) => {
    setName(name);
  };
  
  const handleShowModal = (staff) => {
    setSelectedStaffId(staff);
    setShow(true)
  }
  const handleCloseModal = () => {
    setSelectedStaffId(null)
    setShow(false)
  }

 
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (user?.accessToken) {
      getAllStaff(user?.accessToken, dispatch, axiosJWT);
    }
  }, [dispatch]);

  return (
   <div>
      <div className="list_staff">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên nhân viên</th>
              <th scope="col">SĐT</th>
              <th scope="col">Email</th>
              <th scope="col">Địa chỉ</th>
              <th scope="col">Vai trò</th>
              <th scope="col">Công cụ</th>
            </tr>
          </thead>
          <tbody>
            {ListStaff?.map((allUsers, index) => (
              <tr key={allUsers.id}>
                <th scope="row">{index + 1}</th>
                <td>{allUsers?.idStaff?.nameStaff}</td>
                <td>{allUsers?.idStaff?.phoneStaff}</td>
                <td>{allUsers?.idStaff?.emailStaff}</td>
                <td>{allUsers?.idStaff?.addressStaff}</td>
                <td>{allUsers.nameAuth}</td>
                <td onClick={() => handleShowModal(allUsers)}>edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <UpdateStaff axiosJWT={axiosJWT} accessToken={user?.accessToken} show={show} handleCloseModal={handleCloseModal} selectedStaffId={selectedStaffId} handleNameChange={handleNameChange}/>
      </div>
   </div>
  );
}

export default Staff;
