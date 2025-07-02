import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

function List({ url }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error("Error fetching list:", err);
    }
    setLoading(false);
  };

  const removeItem = async (foodId) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${url}/api/food/remove/${foodId}`, {
        headers: { "Content-Type": "application/json" },
      });
      await fetchList(); // Refresh the list after deletion
      if (response.data.success) {
        toast.success("Item removed successfully");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      toast.error("Failed to remove item");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-formate title">
          <b>Image</b>
          <b>Name</b>
          <b>Price</b>
          <b>Category</b>
          <b>Action</b>
        </div>
        {loading ? (
          <div className="tomato-loader-container">
            <div className="tomato-loader"></div>
            <p style={{ color: "tomato", marginTop: "10px" }}>Loading...</p>
          </div>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-formate">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{item.category}</p>
              <div className="action">
                <button className="delete" onClick={() => removeItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;
