import Cell from './base/cell.js'
import Back from './base/back.js'
let ctx = canvas.getContext('2d')

let screenHeight = window.innerHeight
let screenWidth  = window.innerWidth


export default class main{
	constructor(){
		this.score = 0
		this.gameOver = false
		this.init()				
	}

	init(){
		this.Back = new Back(ctx)
		this.Cell = new Cell(ctx)
		for(let i = 0;i<4;i++){
			this.addRandomData()
		}
		this.Cell.renderRect()
		this.Cell.render()
		this.touch()
		ctx.fillText(
		      this.score,
		      screenWidth / 2 -20 ,
		      120
		)			
	}

	touch(){
		let that = this;
		wx.onTouchStart(function (e) {
		   that.startX = e.touches[0].clientX
		   that.startY = e.touches[0].clientY
		})
		wx.onTouchMove(function (e) {
		    that.endX = e.touches[0].clientX
		    that.endY = e.touches[0].clientY
		})
		wx.onTouchEnd(function (e) {
		   let mx = that.endX-that.startX
		   let my = that.endY-that.startY
		   let move = 0 // 0右，1左，2上，3下
		   if (Math.abs(mx)<5 || Math.abs(my)<5) {
		   	return;
		   }
		   if (Math.abs(mx)>Math.abs(my)) {
		       if (mx > 0) {
		       	move = 0
		       }else{
		       	move = 1
		       }
		   }else{
		   		if (my >0 ) {
		   			move = 3
		   		}else{
		   			move = 2
		   		}
		   }
		   that.render(that.getCell(move))
		})
	}

	getCell(move){
		let cell = this.Cell.cells
		let temp = [[],[],[],[]]		
		switch (move){
			case 0:
				temp[0] = this.caculCell(cell.slice(0,4),0,false)
				temp[1] = this.caculCell(cell.slice(4,8),0,false)
				temp[2] = this.caculCell(cell.slice(8,12),0,false)
				temp[3] = this.caculCell(cell.slice(12,16),0,false)
				break;
			case 1:
				temp[0] = this.caculCell(cell.slice(0,4),0,true)
				temp[1] = this.caculCell(cell.slice(4,8),0,true)
				temp[2] = this.caculCell(cell.slice(8,12),0,true)
				temp[3] = this.caculCell(cell.slice(12,16),0,true)
				break;
			case 2:				
				temp[0] = [cell[0],cell[4],cell[8],cell[12]]
				temp[0] = this.caculCell(temp[0],0,true)
				temp[1] = [cell[1],cell[5],cell[9],cell[13]]
				temp[1] = this.caculCell(temp[1],0,true)
				temp[2] = [cell[2],cell[6],cell[10],cell[14]]
				temp[2] = this.caculCell(temp[2],0,true)
				temp[3] = [cell[3],cell[7],cell[11],cell[15]]
				temp[3] = this.caculCell(temp[3],0,true)
				break;
			case 3:			
				temp[0] = [cell[0],cell[4],cell[8],cell[12]]
				temp[0] = this.caculCell(temp[0],0,false)
				temp[1] = [cell[1],cell[5],cell[9],cell[13]]
				temp[1] = this.caculCell(temp[1],0,false)
				temp[2] = [cell[2],cell[6],cell[10],cell[14]]
				temp[2] = this.caculCell(temp[2],0,false)
				temp[3] = [cell[3],cell[7],cell[11],cell[15]]
				temp[3] = this.caculCell(temp[3],0,false)
				break;
		}
		if(move == 0 || move == 1){
			this.Cell.cells = temp.join(',').split(',')
		}else{
			this.Cell.cells = []
			let a1 = [],a2 = [],a3 = [],a4 = []
			for(let k in temp){				
				a1.push(temp[k][0])
				a2.push(temp[k][1])
				a3.push(temp[k][2])
				a4.push(temp[k][3])
			}
			this.Cell.cells = (a1+","+a2+","+a3+","+a4).split(',')
		}
		return this.Cell.cells.join(',') == cell.join(',');
	}

	caculCell(item,times,order){
		let cnt = 0
		if (order) {			
			for(let i=0;i<4;i++){
				if (item[i] != 0) {
					item[cnt++] = item[i]	
					continue;
				}
			}
			for(let j =cnt;j<4;j++){
				item[j] = 0
			}
		}else{
			cnt = 3
			for(let i=3;i>=0;i--){
				
				if (item[i] != 0) {							
					item[cnt--] = item[i]	
					continue;
				}
			}
			for(let j =cnt;j>=0;j--){
				item[j] = 0			
			}
		}

		for(let x = 1;x<4;x++){
			if(item[x-1] == item[x] && item[x] != 0){
				this.score += parseInt(item[x-1]);
				item[x-1] =parseInt(item[x-1]) + parseInt(item[x]);
          		item[x] = 0; 
			}
		}
		if (times>1) {
			return item
		}else{
			times++
			this.caculCell(item,times,order)
		}
		
		return item
	}

	addRandomData() { //填充数据
	    let value = Math.random() < 0.8 ? 2 : 4;
	    let cell = this.Cell.getUsedCell(); 
	    if (!cell) {
	    	if (this.isOver()) {	    		
	    		this.gameOver = true
	    	}    	
	    }else{
	    	cell.val = value; 
	  		this.Cell.update(cell);
	    }
      	
	}

	isOver() {  // 
		let cell = this.Cell.cells
	    for (var i = 1; i < cell.length; i++){ // 左右不等
    		if (cell[i-1] == cell[i]) {
    			return false;
    		}

    		if (cell[i-1] == cell[i+3]) {
    			return false;
    		}
	    }	    
	    return true;
	} 

	renderOver(){		
		ctx.fillText(
		      this.score,
		      screenWidth / 2 -20 ,
		      120
		)
		ctx.fillStyle = "#fff"
		ctx.fillText(
		      "游戏结束",
		      screenWidth / 2 -20 ,
		      screenHeight/2 + 80
		)
	}

	/*绘制*/
	render(isrender){
		ctx.clearRect(0, 0, screenWidth, screenHeight)
		this.Back.render()
		ctx.fillStyle = "#777"
		ctx.fillText(
		      this.score,
		      screenWidth / 2 -20 ,
		      120
		)

		/*判定结束*/
		let cell = this.Cell.getUsedCell(); 
	    if (!cell) {
	    	if (this.isOver()) {	   		
	    		this.gameOver = true
	    		this.renderOver()
				return
	    	}    	
	    }
		
		/*判定是否需要重新渲染*/		
		if(!isrender){
			for(let i = 0;i<2;i++){
				this.addRandomData()
			}
		}
		
		this.Cell.renderRect()
		this.Cell.render()		
	}

}