const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Course.find()
        .populate('userId', 'email name')
        .select('img price title');


    try {
        res.render('courses', {
            title: 'All courses',
            isCourses: true,
            courses
        })
      } catch (e) {
        console.log(e)
      }
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return req.redirect('/');
    }

    const course = await Course.findById(req.params.id);

    res.render("course-edit", {
        title: `Edit ${course.title}`,
        course
    })
});

router.post('/edit', async (req, res) => {
    try {
        const { id } = req.body;
        delete req.body.id
        const course = await Course.findByIdAndUpdate(id, req.body);
        
        await course.save()
        res.redirect('/courses')
      } catch (e) {
        console.log(e)
      }
});

router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.body.id });
        res.redirect('/courses');
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        res.render('course', {
            layout: 'empty',
            title: `Курс ${course.title}`,
            course
        })
    } catch (e) {
        console.log(e)
    }
});

module.exports = router;
