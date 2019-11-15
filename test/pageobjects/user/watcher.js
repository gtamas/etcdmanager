class Watcher {
    
    constructor(){
        this.watcher_name = Math.random().toString(36).substring(7);
        this.key = Math.random().toString(36).substring(7);
    }

    getName() {
        return this.watcher_name;
    }

    getKey(){
       return this.password;
    }
}

module.exports = Watcher;