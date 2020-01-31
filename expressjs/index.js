const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');

const app = express();


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);



const passwordDb = 'jXkdW12nbWf6Uycq';
const connectString = `mongodb+srv://maksim:${passwordDb}@cluster0-umekr.mongodb.net/test?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const passwordDb = 'jXkdW12nbWf6Uycq';
        const connectString = `mongodb+srv://maksim:${passwordDb}@cluster0-umekr.mongodb.net/test?retryWrites=true&w=majority`;
        await mongoose.connect(connectString, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();


