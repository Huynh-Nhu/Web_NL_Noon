import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBrand } from "../../Redux/apiProduct";

function ListBrand() {
  const Brand = useSelector((state) => state.brands.getAllBrand?.allBrand);
  const [brand, setBrand] = useState(Brand);
  const filter = Brand?.filter((item) => item !== null);
  const dispatch = useDispatch();
  useEffect(() => {
    setBrand(Brand);
  }, [Brand]);
  useEffect(() => {
    getAllBrand(dispatch);
  }, [dispatch]);
  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: "2%",
          transform: "translateY(-50%)",
          right: 0,
          textAlign: "end",
          zIndex: 1,
        }}
      >
        <Link style={{ color: "coral" }} to="/brand">
          <i
            style={{ fontSize: "30px", borderRadius: "100%" }}
            className="fa-solid fa-square-plus"
          ></i>
        </Link>
      </div>
      <div className="sum-brand">
       <h3> Tổng Brand: <span>{filter?.length}</span></h3>
      </div>
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>STT</th>
            <th>Code Brand</th>
            <th>Name Brand</th>
            <th>Image Brand</th>
          </tr>
        </thead>
        <tbody>
          {filter &&
            filter.map((brand, index ) => (
              <tr key={brand?.codeBrand}>
                <td>
                  <Link
                    to={{
                      pathname: "/updateBrand",
                      search: `?id=${brand._id}`,
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
                <td>{index + 1}</td>
                <td>{brand?.codeBrand}</td>
                <td>{brand?.nameBrand}</td>
                <td>
                  <img
                    style={{ width: "100px", height: "50px" }}
                    src={brand?.imgBrand}
                    alt={brand?.nameBrand}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListBrand;
