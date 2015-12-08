import React from "react";
import List from "../build";
import Example from "./example";

let listValues = ["one", "two", "three", "four", "five"];

console.log(React.renderToStaticMarkup(<List
				values={listValues.slice(0)} />));
let app = (
	<div className="app">
		<h1>HireForms List</h1>

		<Example
			title="Static list"
			>
			<List
				values={listValues.slice(0)} />
		</Example>

		<Example
			title="Mutable list">
			<List
				mutable={true}
				values={listValues.slice(0)} />
		</Example>

		<Example
			title="Editable list">
			<List
				editable={true}
				values={listValues.slice(0)} />
		</Example>

		<Example
			title="Mutable and editable list">
			<List
				editable={true}
				mutable={true}
				values={listValues.slice(0)} />
		</Example>

		<Example
			title="Ordered list">
			<List
				ordered="true"
				values={listValues.slice(0)} />
		</Example>
	</div>
);

document.addEventListener("DOMContentLoaded", () => {
	React.render(app, document.body);
});