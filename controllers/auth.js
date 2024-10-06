// controllers/auth.js
const bcrypt = require("bcrypt");
const User = require("../models/User");

const saltRounds = 10; 

exports.register = async (req, res, next) => {
    const {
        nom,
        prenom,
        email,
        datenaissance,
        telephone,
        adresse,
        mot_passe,
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);

        const user = await User.create({
            nom,
            prenom,
            email,
            datenaissance,
            telephone,
            adresse,
            mot_passe: hashedPassword,
        });

        console.log(user);
        res.status(201).json({ success: true, message: "Utilisateur ajouté avec succès", user });
    } catch (error) {
        console.error(error); 
        next(error);
    }
};

exports.test = async(req,res,next)=>{
    res.status(201).json({ success: true, message: "Utilisateur ajouté avec succès" });
}
