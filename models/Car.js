let AUTO_INCREMENT_ID = 0;

function Car(dict) {
  AUTO_INCREMENT_ID ++;
  this.id = AUTO_INCREMENT_ID;
  this.model = dict.model;
  this.rented = false;
}

Car.prototype = {
  id: Number,
  model: String
};

Car.prototype.rent = function() {
  if (this.rented) {
    return false;
  }

  return this.rented = true;
}

Car.prototype.back = function() {
  if (!this.rented) {
    return false
  }

  this.rented = false;
  return true;
}

module.exports = Car;
