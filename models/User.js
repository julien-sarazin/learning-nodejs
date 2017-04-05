module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let UserSchema = Schema({
        name: {
            type: String,
            default: 'unknown'
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        rent: {
            type: Schema.Types.ObjectId,
            ref: 'Car'
        }
    });

    return mongoose.model('User', UserSchema);
};