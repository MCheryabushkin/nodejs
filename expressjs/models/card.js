const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'card.json'
);

class Card {

    static async add(course) {
        const card = await Card.fetch();

        const iDx = card.courses.findIndex(c => c.id === course.id);
        const candidate = card.courses[iDx];

        if (candidate) {
            candidate.count++;
            card.courses[iDx] = candidate;
        } else {
            course.count = 1;
            card.courses.push(course);
        }

        card.price += +course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    static async remove (id) {
        const card = await Card.fetch();

        const iDx = card.courses.findIndex(c => c.id === id);
        const course = card.courses[iDx];

        if (course.count === 1) {
            // Remove
            card.courses = card.courses.filter(c => c.id !== id);
        } else {
            // change count
            card.courses[iDx].count--;
        }

        card.price -= course.price;

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(card), err => {
                if(err) {
                    reject(err);
                } else {
                    resolve(card);
                }
            })
        })
    }

    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(content));
                }
            })
        })
    }
}

module.exports = Card;