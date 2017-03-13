let AUTO_INCREMENT_ID = 0;

function User(json){
    AUTO_INCREMENT_ID ++;
    this.id = AUTO_INCREMENT_ID
    this.name = json.name;
}

User.prototype = {
    id: Number,
    name: String
};

module.exports = User
