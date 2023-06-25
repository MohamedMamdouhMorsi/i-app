const users = {
    usersData: [],
    
    get(id) {
        let usersData_ = {id:0 , notUser:true}

        for(var i = 0 ; i < this.usersData.length ; i++){
            if(id == this.usersData[i].scureToken){
                usersData_ = this.usersData[i];
            }
        }
       
    return  usersData_;
    },
    set(userData_) {
        let isUserEixst = false;
        for(var i = 0 ; i < this.usersData.length ; i++){
            if(userData_.id === this.usersData[i].id ){
                this.usersData[i] = userData_;
                isUserEixst = true;
            }
        }
        if(!isUserEixst){
           
            this.usersData.push(userData_);
        }
      
    },
    del(id){
       let newUsers = [];
        for(var i = 0 ; i < this.usersData.length ; i++){
            if(id !== this.usersData[i].scureToken){
                newUsers.push( this.usersData[i]);
            }
        }
        this.usersData = newUsers;
    },
    onlineUsers(){
        return this.usersOnline;
    }
  };
  
  module.exports = users;