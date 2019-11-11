/*
	2 ways execute function immediately
	arrow function can only use (()=>{})(), function without name can use both
	(function(){})() or (function(){}());
*/
var a = (() => {
	function a() {
		console.log("abc");
	};
	a.prototype.hello = () =>{
		console.log("hello1");
	}
	return a;
})();
var obj = (function () {
	function obj(){};
	obj.prototype.hello = function(){
		console.log("hello2");
	}
	return obj;
}());

let c = new obj;
c.hello();
let b = new a;
b.hello();
// const express = require("express");
// const router = express.Router();
// console.log(typeof router);
