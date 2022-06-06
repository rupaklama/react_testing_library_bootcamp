import React from "react";

const Filter = () => {
  return (
    <section className="pet-filter-container">
      <div className="filter-container">
        <label htmlFor="favorite">Favorite</label>
        <select name="favorite" id="favorite" className="form-select">
          <option value="any">Any</option>
          <option value="liked">Liked</option>
          <option value="disliked">Disliked</option>
        </select>

        <div>
          <label htmlFor="gender">Gender</label>
          <select name="gender" id="gender">
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filter;