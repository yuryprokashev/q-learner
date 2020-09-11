module.exports = OneToManyMap;
function OneToManyMap(){
    let _map = new Map();
    let _keys = [];
    this.get = key =>{
        if(!_map.has(key)) _map.set(key, []);
        return _map.get(key);
    };
    this.set = (key, value)=>{
        if(!_map.has(key)) {
            _map.set(key, []);
            _keys.push(key);
        }
        _map.get(key).push(value);
    };
    this.has = key =>{
        return _map.has(key);
    };
    this.keys = ()=>{
        return _keys;
    };
}