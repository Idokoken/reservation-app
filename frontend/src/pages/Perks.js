import React from "react";

function Perks({ perks, setPerks }) {
  const handleCBClick = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks([...perks.filter((selName) => selName !== name)]);
    }
  };

  return (
    <div>
      <h2>Perks</h2>
      <p>Select all Perks</p>
      <div className="perks">
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("wifi")}
            name="wifi"
            onChange={handleCBClick}
          />
          <i className="fa-solid fa-wifi icon"></i>
          <span>Wifi</span>
        </label>
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("parking")}
            name="parking"
            onChange={handleCBClick}
          />
          <i className="fa-soild fa-car icon"></i>
          <span>free parking spot</span>
        </label>
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("tv")}
            name="tv"
            onChange={handleCBClick}
          />
          <i className="fa-solid fa-tv icon"></i>
          <span>TV</span>
        </label>
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("radio")}
            name="radio"
            onChange={handleCBClick}
          />
          <i className="fa-soild fa-signal icon"></i>
          <span>Radio</span>
        </label>
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("pets")}
            name="pets"
            onChange={handleCBClick}
          />
          <i className="fa fa-thumbs-up icon"></i>
          <span>Pets</span>
        </label>
        <label className="perk-item">
          <input
            type="checkbox"
            checked={perks.includes("entrance")}
            name="entrance"
            onChange={handleCBClick}
          />
          <i className="fa-solid fa-arrow-right icon"></i>
          <span>Private entrance</span>
        </label>
      </div>
    </div>
  );
}

export default Perks;
