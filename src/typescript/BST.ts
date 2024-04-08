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
		private parent: any;
		constructor (root: number) {
			this.root = root;
			this.left = null;
			this.right = null;
			this.parent = null;
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
		getParent() {
			return this.parent;
		}

		setLeft(node: BinaryTree) {
			this.left = node;
			this.left.setParent(this);
		}
		setRight(node: BinaryTree) {
			this.right = node;
			this.right.setParent(this);
		}
		setRoot(num: number) {
			this.root = num;
		}
		setParent(node: BinaryTree) {
			this.parent = node;
		}

		removeChild(node: BinaryTree) {
			if (this.left && node.getRoot() === this.left.getRoot()) {
				this.left = null;
			} else if (this.right && node.getRoot() === this.right.getRoot()) {
				this.right = null;
			}
		}

		insertLeft(num: number) {
			if (this.left === null) {
				this.left = new BinaryTree(num);

				this.left.setParent(this);
			}
		}
		insertRight(num: number) {
			if (this.right === null) {
				this.right = new BinaryTree(num);

				this.right.setParent(this);
			}
		}
	}

	function drawNode(ctx: CanvasRenderingContext2D, rootValue: number, position: Vector2D) {
		ctx.fillStyle = "#000000ff";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.font = "20px 'Manrope Variable', sans-serif"
		ctx.fillText(rootValue.toString(), position.x, position.y);

		ctx.fillStyle = "white";

		ctx.beginPath();
		ctx.arc(position.x, position.y, 20, 0, Math.PI * 2, true);

		ctx.fill();
	}
	function connectPoints(ctx: CanvasRenderingContext2D, position1: Vector2D, position2: Vector2D) {
		ctx.lineWidth = 5;

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
	function insert(tree: BinaryTree, value: number) {
		if (value > tree.getRoot()) {
			if ((tree.getLeft() === null && tree.getRight() === null) || tree.getRight() === null) {
				tree.insertRight(value);
			} else if (tree.getRight()) {
				insert(tree.getRight(), value);
			}
		} else {
			if (tree.getLeft() === null) {
				tree.insertLeft(value);
			} else {
				insert(tree.getLeft(), value);
			}
		}
	}
	function remove(tree: BinaryTree, value: number) {
		if (tree.getRoot() === value) {
			if (tree.getLeft() === null && tree.getRight() === null) {
				tree.getParent().removeChild(tree);
			} else if (tree.getLeft() === null && tree.getRight()) {
				tree.setRoot(tree.getRight().getRoot());
				tree.removeChild(tree.getRight());
			} else if (tree.getRight() == null && tree.getLeft()) {
				tree.setRoot(tree.getLeft().getRoot());
				tree.removeChild(tree.getLeft());
			} else {
				let minimum = minRoot(tree.getRight())
				remove(tree, minimum);
				tree.setRoot(minimum);
			}
		} else {
			if (tree.getRight()) {
				remove(tree.getRight(), value);
			}
			if (tree.getLeft()) {
				remove(tree.getLeft(), value);
			}
		}
	}
    function drawTree(ctx: CanvasRenderingContext2D, tree: BinaryTree, canvasWidth: number, scale: number, i=0, rootPosition: any=null) {          
        if (tree) {
            if (rootPosition === null) {
                rootPosition = new Vector2D(canvasWidth / 2, 50);
            }

			drawNode(ctx, tree.getRoot(), rootPosition);

            if (tree.getLeft()) {
                let leftPosition = new Vector2D(rootPosition.x - (100 / (i + 1)) * scale, rootPosition.y + 50);

				drawNode(ctx, tree.getLeft().getRoot(), leftPosition);
				connectPoints(ctx, rootPosition, leftPosition);
                drawTree(ctx, tree.getLeft(), canvasWidth, scale, i + 1, leftPosition);
            }
            if (tree.getRight()) {
                let rightPosition = new Vector2D(rootPosition.x + (100 / (i + 1)) * scale, rootPosition.y + 50);

				drawNode(ctx, tree.getRight().getRoot(), rightPosition);
				connectPoints(ctx, rootPosition, rightPosition);
                drawTree(ctx, tree.getRight(), canvasWidth, scale, i + 1, rightPosition);
            }
        }
    }
	function updateTraversals(tree: BinaryTree) {
		var preOrderElement = document.getElementById('preorder-list') as HTMLElement;
		preOrderElement.innerText = preOrder(tree).toString();

		var inOrderElement = document.getElementById('inorder-list') as HTMLElement;
		inOrderElement.innerText = inOrder(tree).toString();

		var postOrderElement = document.getElementById('postorder-list') as HTMLElement;
		postOrderElement.innerText = postOrder(tree).toString();
	}

	function buildCanvas() {
		if (canvas.getContext) {
			const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	
			var scale = 1;
			canvas.style.width = '50vw';
			canvas.style.height = '50vh';
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
	
			ctx.globalCompositeOperation='destination-over';
	
			ctx.fillStyle = "white";
			ctx.strokeStyle = "#fca311ff";
	
			// var tree = new BinaryTree(1);
			// tree.insertLeft(2);
			// tree.insertRight(7);
			// tree.getLeft().insertLeft(3);
			// tree.getLeft().insertRight(6);
			// tree.getLeft().getLeft().insertLeft(4);
			// tree.getLeft().getLeft().insertRight(5);
			// tree.getRight().insertLeft(8);
			// tree.getRight().insertRight(9);

			var tree = new BinaryTree(100);
			tree.insertLeft(20);
			tree.insertRight(500);
			tree.getLeft().insertLeft(10);
			tree.getLeft().insertRight(30);
	
			updateTraversals(tree);
	
			drawTree(ctx, tree, canvas.width, scale);

			var insertNumber = document.getElementById('insert-form-input') as HTMLInputElement;
			var insertNumberForm = document.getElementById('insert-form') as HTMLElement;

			var removeNumber = document.getElementById('remove-form-input') as HTMLInputElement;
			var removeNumberForm = document.getElementById('remove-form') as HTMLElement;

			insertNumberForm.addEventListener("submit", function (){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				insert(tree, parseInt(insertNumber.value))
				drawTree(ctx, tree, canvas.width, scale);
				updateTraversals(tree);
			}, false);

			removeNumberForm.addEventListener("submit", function (){
				ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
				remove(tree, parseInt(removeNumber.value))
				drawTree(ctx, tree, canvas.width, scale);
				updateTraversals(tree);
			}, false);
		}
	}

	buildCanvas();

	window.addEventListener("resize", buildCanvas);