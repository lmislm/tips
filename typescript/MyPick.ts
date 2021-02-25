interface Todo {
	title: string
	description: string
	computed: boolean
}

type TodoPreview = MyPick<Todo, 'title' | 'computed'>

const todo: TodoPreview = {
	title: 'title',
	computed: false
}

type MyPick<T, K extends keyof T> = {
	[P in K]: T[P]
}