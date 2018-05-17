let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth

export default class back{
	constructor(ctx){
		this.ctx = ctx
		this.render()
	}

	render(){
		this.ctx.fillStyle = "#faf8ee";
		this.ctx.fillRect(0,0,screenWidth,screenHeight)
		this.ctx.fillStyle = "#bbada0";
		this.ctx.fillRect(screenWidth / 2 - 160,screenHeight / 2 - 100,320,320)
	}
}