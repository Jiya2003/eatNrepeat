const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://eatomern:jiya123@cluster0.csrmh8c.mongodb.net/eato?retryWrites=true&w=majority'

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB");

    const data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

    global.food_items = data;
    global.foodCategory = catData;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDB;
