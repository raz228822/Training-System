// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('excersices_types').insertMany([
    {type: 'SQUAT'},
    {type: 'PUSH'},
    {type: 'DEADLIFT'},
    {type: 'PULL'},
    {type: 'LUNGE'},
    {type: 'TWIST'}
]);

const allExercises = db.getCollection('exercises_types').find();

// Iterate over the cursor and print each exercise
allExercises.forEach(exercise => {
    printjson(exercise);
});

/*
db.getCollection('sales').insertMany([
    {excType: 'SQUAT(1)', bgColor: 'bg-gray-100', firstExc: 'סקוואט הטחות \u2190 קפיצה על תיבה', secondExc: 'בטן סטטית(הולו הולד) + ראשן טויסט', name1: '', name2: ''},
    {excType: 'PUSH(2)', bgColor: 'bg-pink-300', firstExc: 'לחיצות חזה + כפיפת ירך', secondExc: 'הפיכת צמיג', name1: '', name2: ''},
    {excType: 'DEADLIFT(3)', bgColor: 'bg-red-500', firstExc: 'דדליפט עם רגל אחת', secondExc: 'חבלי ניעור (באטל רופ)', name1: '', name2: ''},
    {excType: 'PULL(4)', bgColor: 'bg-blue-500', firstExc: 'HOIST מתח', secondExc: 'בטן כפיפת ירך בשכיבה(ידיות)', name1: '', name2: ''},
    {excType: 'LUNGE(5)', bgColor: 'bg-gray-300', firstExc: 'לאנג׳ \u2190 סקואט \u2190 לאנג׳', secondExc: 'פלאנק עליות על כפות ידיים', name1: '', name2: ''},
    {excType: 'TWIST(6)', bgColor: 'bg-yellow-300', firstExc: 'כפיפות צד', secondExc: 'חבל קפיצה על רגל אחת', name1: '', name2: ''}
  ]);










/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

/*

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);

*/