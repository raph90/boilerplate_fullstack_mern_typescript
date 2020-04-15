import { Connection } from "./Connection";
import { IUser } from "./interfaces";
import mongoose from "mongoose";
import User from "./User";

describe("User model", () => {
  beforeAll(async () => {
    await Connection.testConnection();
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("Should throw validation errors", () => {
    const user = new User();

    expect(user.validate).toThrow();
  });

  it("Should save a user", async () => {
    expect.assertions(3);

    const user: IUser = new User({
      firstName: "Test first name",
      lastName: "Test last name",
      email: "test@example.com",
    });
    const spy = jest.spyOn(user, "save");
    user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      firstName: expect.any(String),
      lastName: expect.any(String),
      email: expect.any(String),
    });

    expect(user.email).toBe("test@example.com");
  });
});
