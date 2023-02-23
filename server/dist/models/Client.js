import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        minLength: 10
    },
    phone: {
        type: String,
        required: true,
        minLength: 8
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ]
});
ClientSchema.plugin(uniqueValidator);
export default mongoose.model('Client', ClientSchema);
