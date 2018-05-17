let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class cell{
	constructor(ctx){
		this.ctx = ctx	
		this.ctx.font = "30px sans-serif"
		this.ctx.textAlign = "center"	
		this.cells = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
		this.usedCell = []
	}

	render(){
		for(var k in this.cells){
			if (this.cells[k] == 0 || this.cells[k] == 4 || this.cells[k] == 8 || this.cells[k] == 16) {
				this.ctx.fillStyle = "#fff"
			}else{
				this.ctx.fillStyle = "#777"
			}
		    this.ctx.fillText(
		      this.cells[k],
		      screenWidth / 2 - 112 + 75*(k%4),
		      screenHeight / 2 - 40 + 75*(Math.floor(k/4))
		    )
		}
	}

	renderRect(){		
		for(var k in this.cells){
			if (this.cells[k] == 0) {
				this.ctx.fillStyle = "#c4af9c"
			}else if (this.cells[k] == 2) {
				this.ctx.fillStyle = "#eee4da"
			}else if (this.cells[k] == 4) {
				this.ctx.fillStyle = "#e3ba14"
			}else if (this.cells[k] == 8) {
				this.ctx.fillStyle = "#f0b17c"
			}else if (this.cells[k] == 16) {
				this.ctx.fillStyle = "#ea593a"
			}else{
				this.ctx.fillStyle = "#eee4da"
			}
		   this.ctx.fillRect(
		   	  screenWidth / 2 - 147 + 75*(k%4),
		      screenHeight / 2 - 87 + 75*(Math.floor(k/4)),
		      70,
		      70
		    )
		}
	}

	update(cell){
		this.cells[cell["p"]] = cell.val		
	}

	getUsedCell(){
		let usedCell = []
		for (let k in this.cells) {
			if (this.cells[k] == 0) {
				usedCell.push({
					p:k
				})
			}
		}
		if(usedCell.length) {
	      return usedCell[Math.floor(Math.random()*usedCell.length)];
	    }
	}

}