import { IUser } from "./User";
import { DB } from "./DB";

import mongoose from "mongoose";

describe("User model", () => {
  beforeAll(async () => {});

  afterAll(async () => {
    mongoose.connection.close();
  });

  it("Should throw validation errors", () => {
    const user = new DB.Models.User();

    expect(user.validate).toThrow();
  });

  it("Should save a user", async () => {
    expect.assertions(3);

    const user: IUser = new DB.Models.User({
      method: "google",
      firstName: "Test first name",
      lastName: "Test last name",
      google: {
        googleId: "asdf",
        email: "test@example.com",
      },
    });
    const spy = jest.spyOn(user, "save");
    user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      method: "google",
      firstName: expect.any(String),
      lastName: expect.any(String),
      google: {
        googleId: expect.any(String),
        email: expect.any(String),
      },
    });
    if (user.google) {
      expect(user.google.email).toBe("test@example.com");
    }
  });
});
