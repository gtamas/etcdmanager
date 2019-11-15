class Role {


    
    constructor(){
        this.name = Math.random().toString(36).substring(7);
        this.permissionKey = Math.random().toString(36).substring(7);
    }

    getName(){
        return this.name;
    }

    getPermissionKey(){
       return this.permissionKey;
    }

}

module.exports = Role;