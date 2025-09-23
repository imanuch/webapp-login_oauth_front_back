const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function createUser() {
  try {
    await mongoose.connect('mongodb://localhost:27017/nestjs-social-auth-refresh');

    const email = 'coucou@example.com';
    const password = 'StrongPass123@3';

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const newUser = {
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongoose.connection.db.collection('users').insertOne(newUser);

    console.log('Utilisateur créé avec succès !');
    console.log('ID:', result.insertedId);
    console.log('Email:', email);

  } catch (error) {
    if (error.code === 11000) {
      console.log('Erreur: Un utilisateur avec cet email existe déjà');
    } else {
      console.log('Erreur:', error.message);
    }
  } finally {
    mongoose.disconnect();
  }
}

createUser();