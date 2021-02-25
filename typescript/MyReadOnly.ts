interface Todo1 {
  title: string
  description: string
}

const todo1: MyReadonly<Todo1> = {
  title: "Hey",
  description: "foobar"
}
type MyReadonly<T, K extends keyof T = keyof T> = {
	readonly [P in K]: T[P]
}
todo1.title = "Hello" // Error: cannot reassign a readonly property
todo1.description = "barFoo" // Error: cannot reassign a readonly property