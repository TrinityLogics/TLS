const board = document.querySelector('.grid')

// first number = column grid number where a pellet can be placed or pacman can be centered
// maze sqaure grid area bounderies are center -1 row, -1 column, +1 row, +1 column
// :1 = black space or in between spaces
// :2 = pellet
// :3 = booster
// :4 = ghost only
// :5 = ghost home
const maze = [
   { /* row 1 outer top wall*/ },
   { /* row 2 inner top wall */ },
   { /* row 3 top of first maze squares*/ },
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,15:1,16:2,17:1,18:2,19:1,20:2,21:1,22:2,23:1,24:2,25:1,26:2,32:2,33:1,34:2,35:1,36:2,37:1,38:2,39:1,40:2,41:1,42:2,43:1,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:2,14:2,26:2,32:2,44:2,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:3,14:2,26:2,32:2,44:2,54:3},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:2,14:2,26:2,32:2,44:2,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,15:1,16:2,17:1,18:2,19:1,20:2,21:1,22:2,23:1,24:2,25:1,26:2,27:1,28:2,29:1,30:2,31:1,32:2,33:1,34:2,35:1,36:2,37:1,38:2,39:1,40:2,41:1,42:2,43:1,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
   {4:1,14:1,20:1,38:1,44:1,54:1},
   {4:2,14:2,20:2,38:2,44:2,54:2},
   {4:1,14:1,20:1,38:1,44:1,54:1},
   {4:2,14:2,20:2,38:2,44:2,54:2},
   {4:1,14:1,20:1,38:1,44:1,54:1},
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,20:2,21:1,22:2,23:1,24:2,25:1,26:2,32:2,33:1,34:2,35:1,36:2,37:1,38:2,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
   {14:1,26:1,32:1,44:1},
   {14:2,26:1,32:1,44:2},
   {14:1,26:1,32:1,44:1},
   {14:2,26:1,32:1,44:2},
   {14:1,26:1,32:1,44:1},
   {14:2,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,29:1,30:1,31:1,32:1,33:1,34:1,35:1,36:1,37:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {4:1,5:1,6:1,7:1,8:1,9:1,10:1,11:1,12:1,13:1,14:2,15:1,16:1,17:1,18:1,19:1,20:1,38:1,39:1,40:1,41:1,42:1,43:1,44:2,45:1,46:1,47:1,48:1,49:1,50:1,51:1,52:1,53:1,54:1},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,21:1,22:1,23:1,24:1,25:1,26:1,27:1,28:1,29:1,30:1,31:1,32:1,33:1,34:1,35:1,36:1,37:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {14:2,20:1,38:1,44:2},
   {14:1,20:1,38:1,44:1},
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,15:1,16:2,17:1,18:2,19:1,20:2,21:1,22:2,23:1,24:2,25:1,26:2,32:2,33:1,34:2,35:1,36:2,37:1,38:2,39:1,40:2,41:1,42:2,43:1,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:2,14:2,26:2,32:2,44:2,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:2,14:2,26:2,32:2,44:2,54:2},
   {4:1,14:1,26:1,32:1,44:1,54:1},
   {4:3,5:1,6:2,7:1,8:2,14:2,15:1,16:2,17:1,18:2,19:1,20:2,21:1,22:2,23:1,24:2,25:1,26:2,27:1,28:1,29:1,30:1,31:1,32:2,33:1,34:2,35:1,36:2,37:1,38:2,39:1,40:2,41:1,42:2,43:1,44:2,50:2,51:1,52:2,53:1,54:3},
   {8:1,14:1,20:1,38:1,44:1,50:1},
   {8:2,14:2,20:2,38:2,44:2,50:2},
   {8:1,14:1,20:1,38:1,44:1,50:1},
   {8:2,14:2,20:2,38:2,44:2,50:2},
   {8:1,14:1,20:1,38:1,44:1,50:1},
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,20:2,21:1,22:2,23:1,24:2,25:1,26:2,32:2,33:1,34:2,35:1,36:2,37:1,38:2,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
   {4:1,26:1,32:1,54:1},
   {4:2,26:2,32:2,54:2},
   {4:1,26:1,32:1,54:1},
   {4:2,26:2,32:2,54:2},
   {4:1,26:1,32:1,54:1},
   {4:2,5:1,6:2,7:1,8:2,9:1,10:2,11:1,12:2,13:1,14:2,15:1,16:2,17:1,18:2,19:1,20:2,21:1,22:2,23:1,24:2,25:1,26:2,27:1,28:2,29:1,30:2,31:1,32:2,33:1,34:2,35:1,36:2,37:1,38:2,39:1,40:2,41:1,42:2,43:1,44:2,45:1,46:2,47:1,48:2,49:1,50:2,51:1,52:2,53:1,54:2},
]



const walls = [
   // top outer wall to the middle
   {r:1,h:1,c:3,w:24,s:["top-wall","bottom-wall"]},
   {r:1,h:2,c:1,w:2,s:["top-wall","left-wall","top-left-corner"]},
   {r:2,h:1,c:2,w:1,s:["top-wall","left-wall","top-left-inside-corner","top-left-margin"]},
   {r:2,h:1,c:27,w:1,s:["top-wall","right-wall","top-right-inside-corner","top-right-margin"]},
   // top middle U
   {r:1,h:1,c:27,w:4,s:["top-wall"]},
   {r:3,h:7,c:28,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   // top outer wall from the middle
   {r:1,h:1,c:31,w:24,s:["top-wall","bottom-wall"]},
   {r:2,h:1,c:30,w:1,s:["top-wall","left-wall","top-left-inside-corner","top-left-margin"]},
   {r:1,h:2,c:55,w:2,s:["top-wall","right-wall","top-right-corner"]},
   {r:2,h:1,c:55,w:1,s:["top-wall","right-wall","top-right-inside-corner","top-right-margin"]},
   // bottom outer wall
   {r:62,h:1,c:3,w:52,s:["top-wall","bottom-wall"]},
   {r:61,h:2,c:1,w:2,s:["bottom-wall","left-wall","bottom-left-corner"]},
   {r:61,h:1,c:2,w:1,s:["bottom-wall","left-wall","bottom-left-inside-corner","bottom-left-margin"]},
   {r:61,h:2,c:55,h:2,s:["right-wall","bottom-wall","bottom-right-corner"]},
   {r:61,h:1,c:55,w:1,s:["right-wall","bottom-wall","bottom-right-inside-corner","bottom-right-margin"]},
   // top left outer wall
   {r:3,h:16,c:1,w:1,s:["right-wall","left-wall"]},
   // left top U
   {r:19,h:2,c:1,w:1,s:["bottom-wall","left-wall","bottom-left-corner","bottom-margin"]},
   {r:19,h:1,c:2,w:1,s:["bottom-wall","left-wall","bottom-left-inside-corner","bottom-left-margin"]},
   {r:20,h:8,c:3,w:9,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:21,h:6,c:2,w:9,s:["top-wall","right-wall","bottom-wall","top-right-inside-corner","bottom-right-inside-corner"]},
   {r:27,h:1,c:2,w:1,s:["bottom-wall"]},
   // left bottom U
   {r:32,h:1,c:2,w:1,s:["top-wall"]},
   {r:33,h:1,c:2,w:1,s:["top-wall"]},
   {r:32,h:8,c:3,w:9,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:33,h:6,c:3,w:8,s:["top-wall","right-wall","bottom-wall","top-right-inside-corner","bottom-right-inside-corner"]},
   {r:39,h:2,c:1,w:2,s:["top-wall","left-wall","top-left-corner","top-margin"]},
   {r:40,h:1,c:2,w:1,s:["top-wall","left-wall","top-left-inside-corner","top-left-margin"]},
   // right top U
   {r:19,h:1,c:55,w:1,s:["right-wall","bottom-wall","bottom-right-inside-corner","bottom-right-margin"]},
   {r:19,h:2,c:56,w:1,s:["right-wall","bottom-wall","bottom-right-corner","bottom-margin"]},
   {r:20,h:8,c:46,w:9,s:["top-wall","bottom-wall","left-wall","top-left-corner","bottom-left-corner"]},
   {r:21,h:6,c:47,w:9,s:["top-wall","bottom-wall","left-wall","top-left-inside-corner","bottom-left-inside-corner"]},
   {r:27,h:1,c:55,w:1,s:["bottom-wall"]},
   // right bottom U
   {r:32,h:1,c:55,w:1,s:["top-wall"]},
   {r:32,h:8,c:46,w:9,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:33,h:6,c:47,w:9,s:["top-wall","bottom-wall","left-wall","bottom-left-inside-corner","top-left-inside-corner"]},
   {r:40,h:1,c:55,w:1,s:["top-wall","right-wall","top-right-inside-corner","top-right-margin"]},
   {r:39,h:2,c:56,w:1,s:["top-wall","right-wall","top-right-corner","top-margin"]},
   // bottom left outer wall
   {r:41,h:20,c:1,w:1,s:["right-wall","left-wall"]},
   // top right outer wall
   {r:3,h:16,c:56,w:1,s:["right-wall","left-wall"]},
   // bottom right outer wall
   {r:41,h:20,c:56,w:1,s:["right-wall","left-wall"]},
   // rectangles
   {r:6,h:4,c:6,w:6,s:["box"]},
   {r:6,h:4,c:16,w:8,s:["box"]},
   {r:6,h:4,c:34,w:8,s:["box"]},
   {r:6,h:4,c:46,w:6,s:["box"]},
   {r:14,h:2,c:6,w:6,s:["box"]},
   {r:14,h:2,c:46,w:6,s:["box"]},
   {r:44,h:2,c:16,w:8,s:["box"]},
   {r:44,h:2,c:34,w:8,s:["box"]},
   {r:32,h:8,c:40,w:2,s:["box"]},
   {r:32,h:8,c:16,w:2,s:["box"]},
   // T's
   // top left ccw-rotation
   {r:14,h:5,c:16,w:2,s:["top-wall","right-wall","left-wall","top-right-corner","top-left-corner"]},
   {r:19,h:4,c:16,w:1,s:["left-wall"]},
   {r:23,h:5,c:16,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:19,h:1,c:18,w:1,s:["bottom-wall","left-wall","bottom-left-inside-corner","bottom-left-margin"]},
   {r:20,h:2,c:19,w:5,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:22,h:1,c:18,w:1,s:["top-wall","left-wall","top-left-inside-corner","top-left-margin"]},
   // top T
   {r:14,h:2,c:22,w:5,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:14,h:1,c:27,w:4,s:["top-wall"]},
   {r:14,h:2,c:31,w:5,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:16,h:1,c:27,w:1,s:["top-wall","right-wall","top-right-inside-corner","top-right-margin"]},
   {r:17,h:5,c:28,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:16,h:1,c:30,w:1,s:["top-wall","left-wall","top-left-inside-corner","top-left-margin"]},
   // top right cw-rotation
   {r:14,h:5,c:40,w:2,s:["top-wall","right-wall","left-wall","top-right-corner","top-left-corner"]},
   {r:19,h:4,c:41,w:1,s:["right-wall"]},
   {r:23,h:5,c:40,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:20,h:2,c:34,w:5,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:19,h:1,c:39,w:1,s:["right-wall","bottom-wall","bottom-right-margin","bottom-right-inside-corner"]},
   {r:22,h:1,c:39,w:1,s:["top-wall","right-wall","top-right-margin","top-right-inside-corner"]},

   // ghost home
   {r:27,h:7,c:22,w:14,s:["right-wall","bottom-wall","left-wall"]},
   {r:26,h:1,c:22,w:2,s:["top-wall","left-wall"]},
   {r:27,h:1,c:23,w:1,s:["top-wall","left-wall","top-margin"]},
   {r:26,h:1,c:24,w:2,s:["top-wall","bottom-wall"]},
   {r:28,h:5,c:23,w:12,s:["right-wall","bottom-wall","left-wall"]},
   {r:26,h:1,c:32,w:2,s:["top-wall","bottom-wall"]},
   {r:26,h:1,c:34,w:2,s:["top-wall","right-wall"]},
   {r:27,h:1,c:34,w:1,s:["top-wall","right-wall","top-margin"]},
   {r:26,h:1,c:26,w:6,s:["ghost-exit"]},

   // T below ghost home
   {r:38,h:2,c:22,w:5,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:38,h:1,c:27,w:4,s:["top-wall"]},
   {r:38,h:2,c:31,w:5,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:40,h:1,c:30,w:1,s:["top-wall","left-wall","top-left-margin","top-left-inside-corner"]},
   {r:41,h:5,c:28,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:40,h:1,c:27,w:1,s:["top-wall","right-wall","top-right-margin","top-right-inside-corner"]},
   // Next // T
   {r:50,h:2,c:22,w:5,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:50,h:1,c:27,w:4,s:["top-wall"]},
   {r:50,h:2,c:31,w:5,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:52,h:1,c:30,w:1,s:["top-wall","left-wall","top-left-margin","top-left-inside-corner"]},
   {r:53,h:5,c:28,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:52,h:1,c:27,w:1,s:["top-wall","right-wall","top-right-margin","top-right-inside-corner"]},
   // L left bottom
   {r:44,h:2,c:6,w:3,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:44,h:3,c:9,w:3,s:["top-wall","right-wall","top-right-corner"]},
   {r:47,h:4,c:10,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   {r:46,h:1,c:9,w:1,s:["top-wall","right-wall","top-right-margin","top-right-inside-corner"]},
   // L right bottom
   {r:44,h:3,c:46,w:3,s:["top-wall","left-wall","top-left-corner"]},
   {r:44,h:2,c:49,w:3,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:46,h:1,c:48,w:1,s:["top-wall","left-wall","top-left-margin","top-left-inside-corner"]},
   {r:47,h:4,c:46,w:2,s:["right-wall","bottom-wall","left-wall","bottom-right-corner","bottom-left-corner"]},
   // T bottom left oblong
   {r:56,h:2,c:19,w:5,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:57,h:1,c:15,w:4,s:["bottom-wall"]},
   {r:56,h:2,c:6,w:9,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:55,h:1,c:15,w:1,s:["right-wall","bottom-wall","bottom-right-margin","bottom-right-inside-corner"]},
   {r:50,h:5,c:16,w:2,s:["top-wall","right-wall","left-wall","top-left-corner","top-right-corner"]},
   {r:55,h:1,c:18,w:1,s:["bottom-wall","left-wall","bottom-left-margin","bottom-left-inside-corner"]},
   // T bottom right oblong
   {r:56,h:2,c:43,w:9,s:["top-wall","right-wall","bottom-wall","top-right-corner","bottom-right-corner"]},
   {r:57,h:1,c:39,w:4,s:["bottom-wall"]},
   {r:56,h:2,c:34,w:5,s:["top-wall","bottom-wall","left-wall","bottom-left-corner","top-left-corner"]},
   {r:55,h:1,c:39,w:1,s:["right-wall","bottom-wall","bottom-right-margin","bottom-right-inside-corner"]},
   {r:50,h:5,c:40,w:2,s:["top-wall","right-wall","left-wall","top-left-corner","top-right-corner"]},
   {r:55,h:1,c:42,w:1,s:["bottom-wall","left-wall","bottom-left-margin","bottom-left-inside-corner"]}
]

// token starting location for level 1
// chomper, rosy, rob, rover, and plum
const tokens = {
   chomper: {name: 'chomper', row: 48, col: 29, color: 'yellow', class: 'chompee', speed: 200},
   rosy: {name:'rosy', row: 24, col: 29, color: 'red', class: 'ghost', speed: 200},
   rob: {name:'rob', row: 31, col: 25, color: 'lightblue', class: 'ghost', speed: 400},
   rover: {name: 'rover', row: 31, col: 29, color: 'tan', class: 'ghost', speed: 200},
   plum: {name: 'plum', row: 31, col: 33, color: 'purple', class: 'ghost', speed: 300}
}
