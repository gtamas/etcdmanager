class Key {
  
    constructor(){
        this.key = Math.random().toString(36).substring(7);
        this.value = Math.random().toString(36).substring(7);
    }

    getKey(){
        return this.key;
    }

    getValue(){
       return this.value;
    }

}

module.exports = Key;