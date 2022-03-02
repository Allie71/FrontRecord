var bar = {
    myName:"小明",
    printName: function () {
        console.log(myName)
    }
}
function foo() {
    let myName = "小强"
    return bar.printName
}
let myName = "小王"
let _printName = foo()
_printName()
bar.printName()