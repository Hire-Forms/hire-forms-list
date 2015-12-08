let staticListCode =
	`<List
		values={listValues} />`;

let mutableListCode =
	`<List
		mutable={true}
		values={listValues} />`;

let editableListCode =
	`<List
		editable={true}
		values={listValues} />`;

let mutableAndEditableListCode =
	`<List
		editable={true}
		mutable={true}
		values={listValues} />`;

export default {
	staticListCode,
	mutableListCode,
	editableListCode,
	mutableAndEditableListCode
};