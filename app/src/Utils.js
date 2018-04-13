import React from "react";
import "./index.css";


export const Logo = () =>
  <div style={{ margin: '1rem auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
    For more examples, visit {''}
  <br />
    <a href="https://github.com/react-tools/react-table" target="_blank">
      <img
        src="https://github.com/react-tools/media/raw/master/logo-react-table.png"
        style={{ width: `150px`, margin: ".5em auto .3em" }}
      />
    </a>
  </div>;

export const Tips = (props) =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort! { props.filtered.length }</em>
  </div>;

export const path = (p, o) => {
    const reducerFunction = (xs, x) => {
      return (xs && xs[x]) ? xs[x] : null;
    };
    return p.reduce(reducerFunction, o);
  };

  export const formatDate = (date, format) => {
	const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
	let month = dateObj.getMonth() + 1;
	month = month > 10 ? month : "0"+month;
	if(format === "dd/mm/yyyy"){
		return day + "/" + month + "/" + year;
	} else if(format === "yyyy-mm-dd"){
		return year + "-" + month + "-" + day;
	} else {
		return year + "-" + month + "-" + day;
	}
  }
  