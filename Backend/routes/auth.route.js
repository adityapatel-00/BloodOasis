const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const User = require("../Models/user.model");
const Donor = require("../Models/donor.model");
const FeedB = require("../Models/feedback.model");
const {
  authSchema,
  authLogin,
  authEditDetails,
} = require("../helpers/validation_schema");

router.post("/register", async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);

    const doesExist = await User.findOne({ email: result.email });
    if (doesExist)
      throw createError.Conflict(`${result.email} is already been registered!`);

    const user = new User(result);
    await user.save();

    res.send({ message: "successfully registered" });
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await authLogin.validateAsync(req.body);
    const user = await User.findOne({ email: result.email });

    if (!user) throw createError.NotFound("User not registered");
    const isMatch = await user.isValidPassword(result.password);

    if (!isMatch)
      throw createError.Unauthorized("Username/Password is not valid");

    const id = user.id;
    res.send({ id });
  } catch (error) {
    if (error.isJoi)
      return next(createError.BadRequest("Invalid Username/Password"));
    next(error);
  }
});

router.post("/getDetails", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userFound = await User.findOne({ _id: userId });
    if (!userFound) {
      throw createError.Unauthorized(`${email} is not registered!`);
    }
    const reqUser = {
      fullName: userFound.fullName,
      phoneNumber: userFound.phoneNumber,
      email: userFound.email,
      state: userFound.state,
      city: userFound.city,
      bloodGroup: userFound.bloodGroup,
    };
    res.send(reqUser);
  } catch (error) {
    next(error);
  }
});

router.post("/editDetails", async (req, res, next) => {
  try {
    const verResult = await authEditDetails.validateAsync(req.body);
    const { email, fullName, phoneNumber, bloodGroup, state, city } = verResult;
    const { userId } = req.body;
    const userFound = await User.findOne({ _id: userId });
    const oldEmail = userFound.email;
    if (!userFound) {
      throw createError.Unauthorized(`${email} is not registered!`);
    }
    // const newEmail = email ? email : userFound.email;
    // const newName = fullName ? fullName : userFound.fullName;
    // const newPhoneNumber = phoneNumber ? phoneNumber : userFound.phoneNumber;
    // const newBloodGroup = bloodGroup ? bloodGroup : userFound.bloodGroup;
    // const newState = state ? state : userFound.state;
    // const newCity = city ? city : userFound.city;
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          email,
          fullName,
          phoneNumber,
          bloodGroup,
          state,
          city,
        },
      }
    );
    const updatedUser = await User.findOne({ email });

    // Update Donor
    const doesExistDonor = await Donor.findOne({ email: oldEmail });
    if (doesExistDonor) {
      await Donor.updateOne(
        { email: oldEmail },
        {
          $set: {
            email,
            fullName,
            bloodGroup,
            state,
            city,
            phoneNumber,
          },
        }
      );
    }
    res.send({
      status: 188,
      message: "Details updated successfully",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/registerDonor", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userFound = await User.findOne({ _id: userId });
    if (!userFound) {
      throw createError.Unauthorized("Create and account first!");
    }
    if (userFound.isDonor) {
      throw createError.Conflict(
        `${userFound.fullName} is already registered as Donor`
      );
    }
    const newDonor = new Donor({
      email: userFound.email,
      fullName: userFound.fullName,
      bloodGroup: userFound.bloodGroup,
      state: userFound.state,
      city: userFound.city,
      phoneNumber: userFound.phoneNumber,
    });

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          isDonor: true,
        },
      }
    );

    await newDonor.save();
    res.send({
      status: 399,
      message: "Successfully registered as Donor",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/findDonors", async (req, res, next) => {
  try {
    const { bloodGroup, state, city } = req.body;
    const donors = await Donor.find({ bloodGroup, state, city });

    const donorsFound = donors.map((don) => {
      return {
        fullName: don.fullName,
        bloodGroup: don.bloodGroup,
        city: don.city,
        phoneNumber: don.phoneNumber,
      };
    });
    res.send(donorsFound);
  } catch (error) {
    next(error);
  }
});

router.post("/unregisterDonor", async (req, res, next) => {
  try {
    const { userId } = req.body;
    const userFound = await User.findOne({ _id: userId });
    if (!userFound) {
      throw createError.BadRequest("Create an account first!");
    }
    if (!userFound.isDonor) {
      throw createError.Unauthorized(
        `${userFound.fullName} is not registered as donor!`
      );
    }
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          isDonor: false,
        },
      }
    );
    await Donor.findOneAndDelete({ email: userFound.email });
    res.send({
      status: 299,
      message: "Unregistered successfully!",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/checkDonor", async (req, res, next) => {
  try {
    const { userId } = req.body;

    const userFound = await User.findOne({ _id: userId });
    if (userFound.isDonor) {
      res.send({ isDonor: true });
    } else {
      res.send({ isDonor: false });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/feedback", async (req, res, next) => {
  try {
    const { Name, feedback } = req.body;
    const newF = new FeedB({
      Name,
      feedback,
    });
    await newF.save();
    res.send({
      status: 111,
      message: "Thank you for your feedback!🤩 It means a lot.",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
