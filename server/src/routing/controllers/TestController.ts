import { Request, Response } from "express";
import { get, controller, post, bodyValidator } from "./decorators";

@controller<typeof TestController>("")

/*
Note: decorators are executed by Node when the class is read. 
When the TestController is read, 
the "get" decorator is called. 
get takes a path (here /) 
*/
class TestController {
  @get("/")
  // here, getLogin is being decorated
  getLogin(req: Request, res: Response) {
    res.send(`
    <div>
    <form method="POST">
    <input name="name">
    <input name="password">
    <button type="submit">Submit</button>
    </form>
    </div>
    `);
  }

  @post("/")
  @bodyValidator("name", "password")
  postStart(req: Request, res: Response) {
    console.log(req.body);
  }
}
