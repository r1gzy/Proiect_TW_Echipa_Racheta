const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { isEmpty } = require('validator');
const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
const { User } = require('../config/database');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (isEmpty(email)) {
            return res.status(400).json({ message: 'You need to add an email!' });
        }

        const userExists = await User.findOne({ where: { email: email.toLowerCase() }});
        if (userExists) {
            return res.status(400).json({ message: 'Email Already Registered!' });
        }

        if (isEmpty(password)) {
            return res.status(400).json({ message: 'You need to add a password!' });
        }

        if (!regex.test(password)) {
            return res.status(400).json({ message: 'Password must contain 8 characters, 1 uppercase character and 1 symbol!' });
        }

        console.log("inainte de creare user");
        //const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email: email.toLowerCase(), password: password, name: name });

        console.log("user creat");
        // Tokenul JWT nu mai este generat sau trimis înapoi
        return res.status(200).json({ message: 'User Created', user: { id: newUser.id, email: newUser.email, name: newUser.name, password: newUser.password } });

    } catch (err) {
        console.error('Eroare la înregistrarea utilizatorului:', err);
        return res.status(500).json({ message: 'A apărut o eroare internă de server.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isEmpty(email)) {
            return res.status(400).json({ message: 'You need to add an email!' });
        }

        const user = await User.findOne({ where: { email: email.toLowerCase() }});
        if (!user) {
            return res.status(400).json({ message: "Email Doesn't Exist!" });
        }

        if (isEmpty(password)) {
            return res.status(400).json({ message: 'You need to add a password!' });
        }

        // Aici presupunem că ai comentat linia pentru criptarea parolei în codul de register
        // Deci, trebuie să comparăm doar textul parolii
        // Dacă ai criptat parola, folosește bcrypt.compare
        if (password !== user.password) {
            return res.status(400).json({ message: 'Password is incorrect!' });
        }

        // Nu mai generăm sau trimitem tokenul JWT
        // Trimite înapoi un mesaj de succes și orice alte date necesare
        return res.status(200).json({
            message: 'Successful authentication',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });

    } catch (err) {
        console.error('Eroare la login:', err);
        return res.status(500).json({ message: 'A apărut o eroare internă de server.' });
    }
});


module.exports = router;