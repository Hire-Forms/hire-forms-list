import React from "react";
import List from "../build";

let listValues = ["one", "two", "three", "four", "five"];

let app = (
	<div className="app">
		<h1>HireForms List</h1>
		<h2>Static list</h2>
		<List
			values={listValues.slice(0)} />
		<h2>Mutable list</h2>
		<List
			removable={true}
			values={listValues.slice(0)} />
		<h2>Editable list</h2>
		<List
			editable={true}
			values={listValues.slice(0)} />
		<h2>Mutable and editable list</h2>
		<List
			editable={true}
			removable={true}
			values={listValues.slice(0)} />
	</div>
);

document.addEventListener("DOMContentLoaded", () => {
	React.render(app, document.body);
});