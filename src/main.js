import { add } from "./js/t1";
import { greet, arrow } from "./js/t2";
import { obj } from "./js/t3.ts"
// require("!style-loader!css-loader!./css/red.css");
// import("./css/red.css")
require("./css/red.css")
import "./css/myscss.scss"

console.log(add(2, 3));
console.log(greet);
console.log(arrow([1, 2, 3]));

console.log(obj);