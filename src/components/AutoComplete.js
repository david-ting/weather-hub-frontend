import React, { useState } from "react";
import escapeStringRegexp from "escape-string-regexp";

function AutoComplete({
  item,
  setItem,
  options,
  setOptions,
  label,
  children,
  loading,
  disabled,
}) {
  const [focus, setFocus] = useState(false);

  const searchHandler = (e) => {
    setItem(e.target.value);
  };

  const autoFillHandler = (e, c) => {
    e.stopPropagation();
    setItem(c);
    setFocus(false);
    if (label === "Country" || label === "Country Code") {
      setOptions([[], []]);
    }
  };

  const listItem =
    options.length === 0
      ? []
      : options.map((c) => {
          const re = new RegExp(`(${escapeStringRegexp(item)})`, "i");
          const splitArr = c.split(re);
          const boldIndex = splitArr.findIndex(
            (s) => s.toLowerCase() === item.toLowerCase()
          );

          return (
            <li key={c} className="autocomplete-options">
              <a href="#" onClick={(e) => autoFillHandler(e, c)}>
                {splitArr.map((s, i) => {
                  if (i === boldIndex) return <b key={i}>{s}</b>;
                  else return <span key={i}>{s}</span>;
                })}
              </a>
            </li>
          );
        });

  return (
    <fieldset className="autocomplete-fieldset">
      <label>
        <div className="align-vert-center-wrapper">
          {label}
          {loading && <div className="small-spinner"></div>}
        </div>
        <input
          disabled={disabled === true ? true : false}
          type="text"
          name={label}
          onChange={searchHandler}
          value={item}
          onFocus={() => setFocus(true)}
          onBlur={(event) => {
            if (
              event.relatedTarget !== null &&
              event.relatedTarget.parentElement !== null &&
              event.relatedTarget.parentElement.classList.contains(
                "autocomplete-options"
              )
            ) {
              return;
            } else {
              setFocus(false);
            }
          }}
        ></input>
        {focus && listItem.length > 0 ? (
          <ul className="autocomplete-options-container">{listItem}</ul>
        ) : null}
      </label>
      {children}
    </fieldset>
  );
}

export default AutoComplete;
