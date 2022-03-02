let bar = {
    myName : "小强",
    test1 : 1
}
function foo(){
    this.myName = "小明"
}

foo.call(bar)
console.log(bar)
console.log(myName)