module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = api.mongoose.Schema;

    let CarSchema = Schema({
        model: {
            type: String,
            default: 'unknown'
        },
        rented: {
            type: Boolean,
            default: false
        }
    });

    return mongoose.model('Car', CarSchema);
};