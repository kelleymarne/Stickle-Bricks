const { Schema, model, Types } = require('mongoose');
const Item = require('./Item');

const categorySchema = new Schema(
    {
        categoryId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        category_name: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Category = model('Category', categorySchema);

module.exports = Category;