module.exports = function(server){
  var Schema = server.models.mongoose.Schema;
  var UserSchema = Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    firstName: {
      type: String,
      default: 'foo'
    },
    lastName: {
      type: String,
      default: 'bar'
    },
    offers: [{
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }]
  });

  return server.models.mongoose.model('User', UserSchema);
}
