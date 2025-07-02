import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend-assets/assets'

function ExploreMenu({ category, setCategory }) {
  return (
    <div className="exploreMenu" id="exploreMenu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        Choose from a delectable array of dishes crafted with the finest
        ingredients and culinary expertise
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt="menu-img"
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu