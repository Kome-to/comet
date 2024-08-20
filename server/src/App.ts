import express, { type Express } from 'express';

const port = process.env.PORT || 4044;

export class App {
  private app: Express;

  constructor() {
    this.app = express();

    this.app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  }

  getExpress = () => {
    return this.app;
  };
}
