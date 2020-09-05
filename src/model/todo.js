const isDate = require("date-fns/isDate");

export function TodoManager() {
	const todos = [];
	const projects = [];
	const contacts = [];
	const categories = [];

	const addTodo = function (name) {
		const todo = new Todo(name);
		todos.push(todo);
		return todo;
	};
	const addProject = function (name) {
		const project = new Project(name);
		projects.push(project);
		return project;
	};
	const addCategory = function (name) {
		const category = new Category(name);
		categories.push(category);
		return category;
	};
	const addContact = function (first, last) {
		const contact = new Contact(first, last);
		contacts.push(contact);
		return contact;
	};

	Object.defineProperties(this, {
		todos: {
			get() {
				const collection = [...todos];
				collection.collectionType = "todo";
				collection.add = addTodo;
				return collection;
			},
		},
		projects: {
			get() {
				const collection = [...projects];
				collection.collectionType = "project";
				collection.add = addProject;
				return collection;
			},
		},
		contacts: {
			get() {
				const collection = [...contacts];
				collection.collectionType = "contact";
				collection.add = addContact;
				return collection;
			},
		},
		categories: {
			get() {
				const collection = [...categories];
				collection.collectionType = "category";
				collection.add = addCategory;
				return collection;
			},
		},
	});
}

function Todo(name = "New Todo") {
	this.itemType = "todo";
	this.title = name;
	this.description = "";
	this.urgency = 0;
	this.isDone = false;
	this.dueDate = new TodoDate();
	this.scheduleDate = new TodoDate();
	this.tags = new TagList(this);
}

function Project(name = "New Project") {
	this.itemType = "project";
	this.title = name;
	this.description = "";
	this.favorite = false;
	this.urgency = 0;
	this.isDone = false;
	this.dueDate = new TodoDate();
	this.scheduleDate = new TodoDate();
	this.tags = new TagList(this);
	this._todoList = createTodoList(this);
	this.todoList = Object.create(this._todoList);

	this.todoList.add = (item) => {
		if (isOwnParent.call(this, item)) {
			throw new Error("Looping projects");
		}
		this._todoList.add(item);
	};
}

Project.prototype = {
	isChildOf(project) {
		let parentProjects = this.tags
			.list()
			.filter((tag) => tag.itemType === "project");
		return (
			!!parentProjects &&
			(parentProjects.includes(project) ||
				parentProjects.some((proj) => proj.isChildOf(project)))
		);
	},
};

function isOwnParent(item) {
	return (
		Object.getPrototypeOf(item) === Project.prototype &&
		this.isChildOf(item)
	);
}

function Contact(first = "New", last = "Contact") {
	this.itemType = "contact";
	this.contactName = { first, last };
	this.email = "";
	this.phone = "";
	this.organization = "";
	this.favorite = false;
	this.tags = new TagList(this);
	this.todoList = createTodoList(this);
}

function Category(categoryName = "New Category") {
	this.itemType = "category";
	this.title = categoryName;
	this.favorite = false;
	this.todoList = createTodoList(this);
}

function createTodoList(creatingObj) {
	let todos = [];

	let add = (todoItem) => {
		if (todos.includes(todoItem)) return;
		todos = [...todos, todoItem];
		todoItem.tags.add(creatingObj);
	};

	let remove = (todoItem) => {
		if (todos.includes(todoItem)) {
			let index = todos.indexOf(todoItem);
			todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
		}
		todoItem.tags.remove(todoItem);
	};

	let place = (todoItem, index) => {
		if (todos.includes(todoItem)) return;
		todos = [...todos.slice(0, index), todoItem, ...todos.slice(index)];
	};

	let sort = () => {
		todos.sort(todoUrgencySort);
	};

	let list = () => Array.from(todos);

	return { list, add, remove, place, sort };
}

function todoUrgencySort(todo1, todo2) {
	if (todo1.urgency < todo2.urgency) return 1;
	if (todo1.urgency > todo2.urgency) return -1;
	return 0;
}

function TodoDate() {
	let date = null;

	Object.defineProperties(this, {
		date: {
			get: function () {
				return date;
			},
			set: function (setDate) {
				if (!isDate(setDate))
					throw new Error("Must enter a valid Date");
				date = setDate;
			},
		},
	});

	this.remove = () => {
		date = null;
	};
}

function TagList(item) {
	this.tags = new Set();

	this.add = (tag) => {
		this.tags.add(tag);
		if(tag.todoList) tag.todoList.add(item);
	};

	this.remove = (tag) => {
		this.tags.delete(tag);
	};

	this.clear = () => {
		this.tags = new Set();
	};

	this.list = () => {
		return Array.from(this.tags);
	};
}
