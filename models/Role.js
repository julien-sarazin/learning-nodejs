module.exports = (api) => {
    const mongoose = api.mongoose;
    const Schema = mongoose.Schema;

    let RoleSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        level: {
            type: Number,
            required: true
        }
    });

    return mongoose.model('Role', RoleSchema);
};