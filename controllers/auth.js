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
exports.updateUserByEmail = async (req, res, next) => {
    const { email, nom, prenom, datenaissance, telephone, adresse, mot_passe } = req.body; // Récupération de l'e-mail dans le corps

    console.log("Email reçu pour mise à jour:", email); // Log de l'e-mail reçu

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() }); // Normalisation de l'e-mail
        console.log("Utilisateur trouvé:", existingUser); // Log de l'utilisateur trouvé

        if (!existingUser) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        // Logique de mise à jour...
        existingUser.nom = nom || existingUser.nom;
        existingUser.prenom = prenom || existingUser.prenom;
        existingUser.datenaissance = datenaissance || existingUser.datenaissance;
        existingUser.telephone = telephone || existingUser.telephone;
        existingUser.adresse = adresse || existingUser.adresse;

        if (mot_passe) {
            const hashedPassword = await bcrypt.hash(mot_passe, saltRounds);
            existingUser.mot_passe = hashedPassword;
        }

        await existingUser.save();

        res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès", user: existingUser });
    } catch (error) {
        console.error(error);
        next(error);
    }
};




