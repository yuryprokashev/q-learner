module.exports = File;
function File(path, content){
    this.getPath = ()=>{
        return path;
    };
    this.getName = ()=>{
        let arr = path.split("/");
        return arr[arr.length - 1];
    };
    this.getContent = ()=>{
        return content;
    };
}