module.exports = function(server){
  var Schema = server.models.mongoose.Schema;
  var AuthTokenSchema = Schema({
      userId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now
      }
  });

  return server.models.mongoose.model('AuthToken', AuthTokenSchema);
}
