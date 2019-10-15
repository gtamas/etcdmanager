class User {


    
    constructor(){
        this.username = Math.random().toString(36).substring(7);
        this.password = "Teszt123!";
    }



    getUsername() {
        return this.username;
    }

    setUsername(value) {
        this.username = value;
    }

    getPassword(){
       return this.password;
    }

    setPassword(value){
        this.password = value
    }
}

module.exports = User;