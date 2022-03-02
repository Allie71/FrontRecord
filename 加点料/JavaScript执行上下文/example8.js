function CreateObj(){
    this.name = "xiaoming";
    console.log(this);
}
var myObj = new CreateObj()
console.log(myObj.name);