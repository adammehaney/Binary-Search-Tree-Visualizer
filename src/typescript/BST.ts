const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;

	class Vector2D {
		public x: number;
		public y: number;
		constructor (x: number, y: number) {
			this.x = x;
			this.y = y;
		}
	}

	class BinaryTree {
		private root: number;
		private left: any;
		private right: any;
		constructor (root: number) {
			this.root = root;
			this.left = null;
			this.right = null;
		}

		getLeft() {
			return this.left;
		}
		getRight() {
			return this.right;
		}
		getRoot() {
			return this.root;
		}

		setLeft(node: BinaryTree) {
			this.left = node;
		}
		setRight(node: BinaryTree) {
			this.right = node;
		}
		setRoot(num: number) {
			this.root = num;
		}

		insertLeft(num: number) {
			if (this.left === null) {
				this.left = new BinaryTree(num);
			} else {
				const tree = new BinaryTree(num);
				tree.left = this.left;
				this.left = tree;
			}
		}
		insertRight(num: number) {
			if (this.right === null) {
				this.right = new BinaryTree(num);
			} else {
				const tree = new BinaryTree(num);
				tree.right = this.right;
				this.right = tree;
			}
		}
	}

	function drawNode(ctx: CanvasRenderingContext2D, position: Vector2D) {
		ctx.beginPath();
		ctx.arc(position.x, position.y, 10, 0, Math.PI * 2, true);

		ctx.fill();
	}
	function connectPoints(ctx: CanvasRenderingContext2D, position1: Vector2D, position2: Vector2D) {
		ctx.beginPath();
		ctx.moveTo(position1.x, position1.y);
		ctx.lineTo(position2.x, position2.y);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(position2.x, position2.y);
		ctx.lineTo(position1.x, position1.y);
		ctx.stroke();
	}
	function preOrder(tree: any): any[number] {
		let result = [];
		result.push(tree.getRoot());
		if (tree.getLeft()) {
			result = result.concat(preOrder(tree.getLeft()));
		}
		if (tree.getRight()) {
			result = result.concat(preOrder(tree.getRight()));
		}
		return result;
	}
	function inOrder(tree: any): any[number] {
		let result: any[number] = [];
		if (tree.getLeft()) {
			result = result.concat(inOrder(tree.getLeft()));
		}
		result.push(tree.getRoot());
		if (tree.getRight()) {
			result = result.concat(inOrder(tree.getRight()));
		}
		return result;
	}
	function postOrder(tree: any): any[number] {
		let result: any[number] = [];
		if (tree.getLeft()) {
			result = result.concat(postOrder(tree.getLeft()));
		}
		if (tree.getRight()) {
			result = result.concat(postOrder(tree.getRight()));
		}
		result.push(tree.getRoot());
		return result;
	}
	function minRoot(tree: BinaryTree): number {
		let result: number = Infinity;
		if (tree) {
			result = tree.getRoot();

			let left_result = minRoot(tree.getLeft());
			let right_result = minRoot(tree.getRight());

			result = Math.min(result, left_result, right_result);
		}

		return result
	}
	function maxRoot(tree: BinaryTree): number {
		let result: number = -Infinity;
		if (tree) {
			result = tree.getRoot();

			let left_result = maxRoot(tree.getLeft());
			let right_result = maxRoot(tree.getRight());

			result = Math.max(result, left_result, right_result);
		}

		return result
	}

	if (canvas.getContext) {
		const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

		var scale = 1;
		canvas.style.width = '50vw';
		canvas.style.height = '50vh';
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetHeight;

		ctx.fillStyle = "white";
		ctx.strokeStyle = "#fca311ff";

		// const points = [
		// 	[canvas.offsetWidth / 2, 10],
		// 	[canvas.offsetWidth / 4, 100],
		// 	[canvas.offsetWidth / 1.5, 100],
		// 	[canvas.offsetWidth / 8, 200],
		// 	[canvas.offsetWidth / 2.5, 200],
		// 	[canvas.offsetWidth / 1.2, 200],
		// 	[canvas.offsetWidth / 16, 300],
		// 	[canvas.offsetWidth / 4.5, 300],
		// ];

		// points.forEach((point) => {
		// 	drawLine(ctx, point[0], point[1]);
		// });

		// points.forEach((point) => {
		// 	drawNode(ctx, point[0], point[1]);
		// });

		var tree = new BinaryTree(1)
		tree.insertLeft(2)
		tree.insertRight(7)
		tree.getLeft().insertLeft(3)
		tree.getLeft().insertRight(6)
		tree.getLeft().getLeft().insertLeft(4)
		tree.getLeft().getLeft().insertRight(5)
		tree.getRight().insertLeft(8)
		tree.getRight().insertRight(9)

		let preOrderTree = postOrder(tree);
		for (let i = 0; i < preOrderTree.length; i++) {
			console.log(preOrderTree[i]);
		}

		console.log("MIN", minRoot(tree));
		console.log("MAX", maxRoot(tree));
	}