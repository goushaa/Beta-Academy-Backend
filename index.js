//imports
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const contactModel = require('./models/contact')
const courseModel = require('./models/courses')
const imageModel = require('./models/image')
const userModel = require('./models/users')
const loginInfo = require('./logincredentials.json');
const multer = require('multer')
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//mongoose connection
mongoose.connect('mongodb://127.0.0.1:27017/Beta', { useNewUrlParser: true })
    .then(function () {
        console.log("MONGO CONNECTION OPEN !!!");
    })
    .catch(function (err) {
        console.log("MONGO OH NO ERROR!!!");
        console.log(err);
    })
//ejs connection
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//contact and courses arrays
let Contacts = [];
let Courses = [];

//CONTACT US//

app.get('/contacts', async function (req, res) {
    let contacts = await contactModel.find({});
    res.send(contacts);

    //console.log(Contacts);

    //res.render('show', { Contacts })
})

app.post('/contacts', async function (req, res) {
    const { name, email, comment } = req.body;
    const newUser = await new contactModel({
        name,
        email,
        comment
    })
    await newUser.save().then(() => console.log('ADDED'));
    console.log(req.body);
    //Contacts.push(newUser);
    //res.redirect('http://localhost:3000/contact');
})

/////////////

//LOGIN FORM//

app.post('/login', async function (req, res) {
    const { username, password } = req.body;
    let isValid = false;
    let user = await userModel.find({ username, password });

    if (user.length > 0) {
        console.log(user);
        res.redirect('http://localhost:3001/currentCourses')
    }
    else {
        console.log(user);
        res.redirect('http://localhost:3001/')
    }

    /*  if (password === 'beta0000' && (username === 'kareem' || username === 'abdelrahman')) {
         res.redirect('http://localhost:3001/currentCourses')
         isValid = true;
     }
 
      for (let i = 0; i < loginInfo.length; i++) {
         if (username === loginInfo.Users[i].username && password === loginInfo[i].Users[i].password) {
             console.log(loginInfo.Users[0]);
             res.redirect('http://localhost:3000/currentCourses')
             isValid = true;
         }
     } 
     if (!isValid) {
         res.redirect('http://localhost:3001/')
     } */
})

/////////////

//ADDCOURSE FORM//

app.post('/addcourse', function (req, res) {
    const { name, image, description } = req.body;
    const newCourse = new courseModel({
        name,
        image,
        description
    })
    newCourse.save().then(() => console.log('ADDED'));
    console.log(req.body);
    Courses.push(newCourse);
    res.redirect('http://localhost:3001/currentCourses');
})

app.get('/courses', async function (req, res) {
    let courses = await courseModel.find({});
    res.send(courses);


})


/////////////

//UPLOAD IMAGE//

const storage = multer.diskStorage(
    {
        destination: 'uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    }
);

const upload = multer({
    storage: storage
}).single('testImage')

app.post('/upload', function (req, res) {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            const newImage = new imageModel(
                {
                    name: req.body.name,
                    image: {
                        data: req.file.filename,
                        contentType: 'image/jpg'
                    }
                }
            );
            newImage.save().then(function () {
                res.send('SUCCESSFULLY UPLOADED')
            }).catch(err => console.log(err))
        }

    })
})

/////////////

//CHOOSE PORT 5555 TO WORK ON

app.listen(5555, function () {
    console.log('app is listening on port 5555');
})

