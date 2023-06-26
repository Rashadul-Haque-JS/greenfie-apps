import mongoose, { ConnectOptions } from "mongoose";

class Database {
  private static instance: Database;
  private isConnected: boolean;

  private constructor() {
    this.isConnected = false;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connectToDB(
    uri: string,
    options: ConnectOptions
  ): Promise<void> {
    if (this.isConnected) {
      return;
    }
    try {
      await mongoose.connect(uri, options);
      this.isConnected = true;
      console.log("MongoDB connected");
    } catch (err: any) {
      console.error(err.message);
      throw err;
    }
  }

  public isConnectedToDB(): boolean {
    return this.isConnected;
  }
}

export default Database;
