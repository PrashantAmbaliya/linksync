const { Schema, model, Collection } = require('mongoose')

const userSchema = new Schema({
    username: { type: String },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/3940/3940403.png' },
    password: { type: String, required: true },
    role: { type: String, enum: ['Creator', 'Admin'], default: 'Creator' },
    handle: { type: String, required: true, unique: true },
    links: [
        {
            url: { type: String },
            title: { type: String },
            icon: { type: String , default: '/images/linkIcon.png' }
        }
    ],
    socialMedia: {
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        linkedin: { type: String },
        github: { type: String },
    }
}, { timestamps: true }, {collection:'user-data-linksync'})

const userModel = model('user',userSchema)

module.exports = userModel