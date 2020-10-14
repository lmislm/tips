// tiny simple parse compiler
/**
 * 
*                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
 * 
 */
/**
 * 分词，词法分析 Lexical Analysis
 * (add 2 (subtract 4 2))   =>   [{ type: 'paren', value: '(' }, ...]
 * @param {String} input 
 */
function tokenizer (input) {
	let current = 0; // index
	let tokens = [];

	while(current < input.length) {
		let char = input[current]
		// "("
		if (char === '(') {
			tokens.push({
				type: 'paren',
				value: '('
			})
			current++;
			continue; // next cycle of the loop
		}
		// ")"
		if (char === ')') {
			tokens.push({
				type: 'paren',
				value: ')'
			})
			current++;
			continue;
		}
		// white space
		let WHITESPACE = /\s/;
		if (WHITESPACE.test(char)) {
			current++;
			continue;
		}
		// numbers, 将整个字符序列作为一个token,如，(add 123 456)
		let NUMBERS = /0-9/;
		if (NUMBERS.test(char)) {
			let value = '';
			// 循环序列中的每个字符，直到匹配一个非数字，
			// 将每个字符赋值给`value`
			// 123 534 取得值“123”
			// 遇到一个字符为数字的，就while循环里往下继续遍历
			while(NUMBERS.test(char)) {
				value += char;
				char = input[++current];
			}
			tokens.push({
				type: 'number',
				value
			})
			continue;
		}
		// "
		if (char === '"') {
			let value = ''
			// 跳过 open double quote in our token
			char = input[++current]
			// 在两个“"”中间循环查找相应的字符
			while(char !== '"') {
				value += char;
				char = input[++current];
			}
			// skip the closing double quote
			char = input[++current];
			tokens.push({ type: 'string', value })
			continue;
		}
		// `name` token
		let LETTERS = /[a-z]/i
		if (LETTERS.test(char)) {
			let value = ''

			while(LETTERS.test(char)) {
				value += char;
				char = input[++current];
			}

			tokens.push({
				type: 'name',
				value
			})
			continue;
		}
		throw new TypeError('unKnow character' + char)
	}
	return tokens;
}
/**
 * 语法分析 Syntactic Analysis
 * For our parser we're going to take our array of tokens and turn it into an
 * AST.
 *
 *   [{ type: 'paren', value: '(' }, ...]   =>   { type: 'Program', body: [...] }
 *
 * @param {String} tokens 
 */
function parser(tokens) {
	let current = 0;
	// recursion 递归
	function walk () {
		let token = tokens[current];
		// number
		if (token.type === 'number') {
			current++;
			return {
				type: 'NumberLiteral',
				value: token.value
			}
		}
		// string
		if (token.type === 'string') {
			current++;
			return {
				type: 'StringLiteral',
				value: token.value
			}
		}
		// paren
		if (token.type === 'paren' && token.value === '(') {
			// ??????????????????????
			// increment 'current' to skip parenthesis
			token = tokens[++current];
			// set the name as the current token's value
			let node = {
				type: 'CallExpression',
				name: token.value,
				params: []
			};
			// again skip the name token
			token = tokens[++current]
			while(
				(token.type !== 'paren') ||
				(token.type === 'paren' && token.value !== ')')
			) {
				node.params.push(walk());
				token = tokens[current];
			}
	
			current++;
	
			return node;
		}

		throw new TypeError(token.type)
	}
	let ast = {
		type: 'Program',
		body: []
	}
	
	while (current < tokens.length) {
		ast.body.push(walk())
	}

	return ast
}


/**
 * 
 * traverser
 * 
 * So now we have our AST, and we want to be able to visit different nodes with
 * a visitor. We need to be able to call the methods on the visitor whenever we
 * encounter a node with a matching type.
 *
 *   traverse(ast, {
 *     Program: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     CallExpression: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *
 *     NumberLiteral: {
 *       enter(node, parent) {
 *         // ...
 *       },
 *       exit(node, parent) {
 *         // ...
 *       },
 *     },
 *   });
 */

function traverser(ast, visitor) {
	function traverseArray(array, parent) {
		array.forEach(child => {
			traverseNode(child, parent)
		})
	}

	function traverseNode(node, parent) {
		let methods = visitor[node.type]
		// method 是一个 enter 类型
		if (methods && methods.enter) {
			methods.enter(node, parent)
		}
		 // Next we are going to split things up by the current node type.
		 switch (node.type) {

      // We'll start with our top level `Program`. Since Program nodes have a
      // property named body that has an array of nodes, we will call
      // `traverseArray` to traverse down into them.
      //
      // (Remember that `traverseArray` will in turn call `traverseNode` so  we
      // are causing the tree to be traversed recursively)
      case 'Program':
        traverseArray(node.body, node);
        break;

      // Next we do the same with `CallExpression` and traverse their `params`.
      case 'CallExpression':
        traverseArray(node.params, node);
        break;

      // In the cases of `NumberLiteral` and `StringLiteral` we don't have any
      // child nodes to visit, so we'll just break.
      case 'NumberLiteral':
      case 'StringLiteral':
        break;

      // And again, if we haven't recognized the node type then we'll throw an
      // error.
      default:
        throw new TypeError(node.type);
    }

    // If there is an `exit` method for this node type we'll call it with the
    // `node` and its `parent`.
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
	}

	// Finally we kickstart the traverser by calling `traverseNode` with our ast
  // with no `parent` because the top level of the AST doesn't have a parent.
  traverseNode(ast, null);

}



// form: https://github.com/jamiebuilds/the-super-tiny-compiler