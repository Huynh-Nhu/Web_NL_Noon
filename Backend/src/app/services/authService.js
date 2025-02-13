const Staff = require("../models/Staff");
const Authorities = require("../models/Authorities");
const Customer = require("../models/Customer");
const Address = require("../models/Address");

class AuthService {
  // Staff
  //create a new staff
  async createdStaff(staffData) {
    try {
      const staff = new Staff(staffData);
      const createdStaff = await staff.save();
      return createdStaff;
    } catch (error) {
      throw new Error(error);
    }
  }
  // created authorities
  async createdAuth(authData) {
    try {
      const auth = new Authorities(authData);
      const createdAuth = await auth.save();
      return createdAuth;
    } catch (error) {
      throw new Error(error);
    }
  }
  // find authorities
  async getAuthorities(staffId) {
    try {
      const authorities = await Authorities.findOne({ idStaff: staffId });
      return authorities;
    } catch (error) {
      throw new Error("can not find authorities", error);
    }
  }
  // login staff
  async findOneStaff(email) {
    try {
      const foundUser = await Staff.findOne({ emailStaff: email });
      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  // update password
  async updatePassword(staffData) {
    try {
      const setPasswordStaff = await Staff.findOneAndUpdate(
        staffData._id,
        { passwordStaff: staffData.passwordStaff },
        { new: true }
      );
      return setPasswordStaff;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updatePasswordCustomer(customerData) {
    try {
      const setPasswordStaff = await Customer.findOneAndUpdate(
        customerData._id,
        { passwordCustomer: customerData.passwordCustomer },
        { new: true }
      );
      return setPasswordStaff;
    } catch (error) {
      throw new Error(error);
    }
  }
  // set avatar
  // async setAvatarStaff(staffData) {
  //   try {
  //       const setAvatar = await Staff.findOneAndUpdate(
  //           staffData._id,
  //           {avatarStaff: staffData.avatarStaff},
  //           {new: true}
  //       )
  //       return setAvatar;
  //   } catch (error) {
  //       throw new Error(error);
  //   }
  // }
  // get all staff
  async findAllStaff() {
    try {
      const authorities = await Authorities.find({ nameAuth: { $ne: "admin" } })
        .populate({
          path: "idStaff",

          select: "-passwordStaff",
        })
        .exec();

      return authorities;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findShipper() {
    try {
      const shippers = await Authorities.find({ nameAuth: "shipper" })
        .populate({
          path: "idStaff",
          select: "nameStaff",
        })
        .exec();
      return shippers;
    } catch (error) {
      throw new Error(error);
    }
  }
  //delete staff
  async deleteStaff(id) {
    try {
      const staff = await Staff.findById(id);
      return staff;
    } catch (error) {
      throw new Error(error);
    }
  }

  // customer
  // created
  async createdCustomer(customerData) {
    try {
      const customer = new Customer(customerData);
      const createdCustomer = await customer.save();
      return createdCustomer;
    } catch (error) {
      throw new Error(error);
    }
  }
  // address
  async createdAddress(addressData) {
    try {
      const address = new Address(addressData);
      const createdAddress = await address.save();
      return createdAddress;
    } catch (error) {
      throw new Error(error);
    }
  }
  //login customer
  async findOneCustomerEmail(email) {
    try {
      const foundUser = await Customer.findOne({ emailCustomer: email });
      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneCustomerPhone(phone) {
    try {
      const foundUser = await Customer.findOne({ phoneCustomer: phone });
      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findOneCustomer(emailOrPhone) {
    try {
      const foundUser = await Customer.findOne({
        $or: [{ emailCustomer: emailOrPhone }, { phoneCustomer: emailOrPhone }],
      }).populate("idAddress");
      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllCustomer() {
    try {
      const customer = await Customer.find().populate("idAddress").select("-passwordCustomer");
      return customer;
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new AuthService();
