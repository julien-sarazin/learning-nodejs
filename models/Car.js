module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarSchema = Schema({
        model: {
            type: String,
            default: 'unknown'
        },
        renters: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    });

    return mongoose.model('Car', CarSchema);
};