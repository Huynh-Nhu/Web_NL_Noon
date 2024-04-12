const bcrypt = require("bcrypt");
const authService = require("../services/authService");
const Staff = require("../models/Staff");
const { response } = require("express");

const setStaffController = {
    setPasswordStaff: async (req, res) => {
    try {
      const { email, password, passwordNew } = req.body.user;
      const staff = await authService.findOneStaff(email);
      if (!staff) {
        return res.status(404).json({message:"email is incorrect"});
      }

      if (!(await bcrypt.compare(password, staff.passwordStaff))) {
        return res.status(404).json({message:"password is incorrect"});
      }

      const salt = await bcrypt.genSalt(10);
      const newPassword = await bcrypt.hash(passwordNew, salt);
      staff.passwordStaff = newPassword;
      const setPasswordStaff = await authService.updatePassword(staff);
      return res.status(200).json({ message: "set password success" , setPasswordStaff });
    } catch (error) {
      console.log(error);
    }
  },

  // setAvatar: async(req, res) => {
  //   try {
  //     const {files, user} = req.body
  //     const staff = await authService.findOneStaff(user.emailStaff);
  //     console.log(staff);
  //     if(!staff) {
  //       return res.status(404).json({message: "Không tìm thấy staff"})
  //     }
  //     const setNewAvatar = files.toString()
  //     staff.avatarStaff = setNewAvatar;
  //     console.log(staff.avatarStaff);
  //     const setAvatar = await authService.setAvatarStaff(staff); 
  //     return res.status(200).json({message:"Cập nhật avatar thành công", setAvatar})
  //   } catch (error) {
  //     console.log(error);
  //   }
    
  // },
};
module.exports = setStaffController;
