function ListUserLayout(props) {
  const { customer } = props;
  return (
    <div>
      <table class="table text-center align-middle">
        <thead className="table-info">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Avarta</th>

            <th scope="col">Tên khách hàng</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Địa chỉ</th>
          </tr>
        </thead>
        <tbody>
          {customer?.map((user, index) => (
            <tr key={user._id}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  style={{ width: "50px", borderRadius: "100px" }}
                  src={user.avatarCustomer}
                />
              </td>
              <td>{user.nameCustomer}</td>
              <td>{user.emailCustomer}</td>
              <td>{user.phoneCustomer}</td>
              <td>{user.idAddress.nameAddress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUserLayout;
