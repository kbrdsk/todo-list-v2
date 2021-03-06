import { itemManager } from "../index.js";

//----------save-----------

function save() {
	itemManager.storageId = itemManager.storageId || 1;
	const packedArray = [];
	for (let collection of [
		itemManager.todos,
		itemManager.projects,
		itemManager.categories,
		itemManager.contacts,
	]) {
		packedArray.push(collection.map(packObject));
	}
	packedArray.push(itemManager.storageId);
	localStorage.itemManagerDataString = JSON.stringify(packedArray);
	console.log("Saved");
}

function packObject(todoListObject) {
	todoListObject.storageId =
		todoListObject.storageId || itemManager.storageId++;
	let packedObject = Object.assign({}, todoListObject);
	if (todoListObject.todoList) {
		packedObject.todoListStorageData = todoListObject.todoList
			.list()
			.map((todo) => todo.storageId);
	}

	for (let packedProperty of [
		"todoList",
		"_todoList",
		"tags",
		"dueDate",
		"scheduleDate",
		"createTag",
	]) {
		delete packedObject[packedProperty];
	}
	return packedObject;
}

//----------load-----------

function load(dataString = localStorage.itemManagerDataString) {
	if (!dataString) return;

	let dataArray = JSON.parse(dataString);

	itemManager.storageId = dataArray.pop();

	const todos = dataArray[0].map((obj) => loadObject(obj, itemManager.todos));
	dataArray[1].map((obj) => loadObject(obj, itemManager.projects));
	dataArray[2].map((obj) => loadObject(obj, itemManager.categories));
	dataArray[3].map((obj) => loadObject(obj, itemManager.contacts));

	let todoObjectArray = [...todos, ...itemManager.projects];

	for (let collection of [
		itemManager.projects,
		itemManager.categories,
		itemManager.contacts,
	]) {
		collection.map((obj) => loadTodoList(obj, todoObjectArray));
	}

	console.log("Loaded");
}

function loadObject(dataObject, collection) {
	let object = collection.add();
	Object.assign(object, dataObject);
	return object;
}

function loadTodoList(loadingObject, todoObjectArray) {
	for (let storageId of loadingObject.todoListStorageData) {
		let todoObject = todoObjectArray.find(
			(obj) => obj.storageId === storageId
		);
		loadingObject.todoList.add(todoObject);
	}
}

//----------reset-----------

function reset() {
	localStorage.itemManagerDataString = "";
}

//----------exports-----------

export { save, load, reset };
