import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('MongoDb is already Connected');
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: process.env.MONGODB_DB,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = true;
		console.log('mongoDb is Connected');
	} catch (error) {
		console.log('Error connecting to MongoDB', error);
	}
};
