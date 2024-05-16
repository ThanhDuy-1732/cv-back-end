/* eslint-disable @typescript-eslint/no-var-requires */
const prompt = require('prompt');
const mongoose = require('mongoose');
const uri =
  'mongodb+srv://thanhduyking1703:HDzq7Ulpc8f60F6u@clusterthankzcv.gb7lo06.mongodb.net/?retryWrites=true&w=majority&appName=ClusterThankZCV';
require('dotenv').config();
const clientOptions = {
  dbName: process.env.MONGO_DB_NAME,
};

prompt.start();

prompt.get(['schemaSrc', 'schemaDes'], async function (error, result) {
  try {
    await mongoose.connect(uri, clientOptions);

    console.log('result.schemaSrc', result.schemaSrc);
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log('success', collections);
  } catch (error) {
    console.log('error', error.message);
  } finally {
    await mongoose.disconnect();
  }
});

// import prompt from 'prompt';
// import typeorm from 'typeorm';
// import dotenv from 'dotenv';

// dotenv.config();
// const prompt = require('prompt');
// const typeorm = require('typeorm');
// require('dotenv').config();

// const uri =
//   'mongodb+srv://thanhduyking1703:HDzq7Ulpc8f60F6u@clusterthankzcv.gb7lo06.mongodb.net/?retryWrites=true&w=majority&appName=ClusterThankZCV';

// const MongoDBDataSource = new typeorm.DataSource({
//   type: 'mongodb',
//   url: uri,
//   synchronize: true,
//   logging: true,
//   ssl: true,
//   subscribers: [],
//   migrations: [],
//   database: process.env.MONGO_DB_NAME,
// });

// prompt.start();

// prompt.get(['schemaSrc', 'schemaDes'], function (error, result) {
//   MongoDBDataSource.initialize().then(async () => {
//     console.log('schemaSrc', result.schemaSrc);
//     const data = MongoDBDataSource.mongoManager.getMongoRepository('skill').find();
//     console.log('success', data);
//   });
// });
