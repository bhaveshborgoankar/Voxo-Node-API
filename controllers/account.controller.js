import bcrypt from 'bcryptjs';
import { of } from 'await-of';
import { User } from '../models/user.model.js';
import { ReE, ReS } from '../helper/utils.js';

const accountController = {

    // Get User Details
    getUserDetails: async (req, res) => {
      try {
          const { user_id } = req.body;

          const user = await User.findById(user_id);
          if (!user) {
              throw new Error("User not found");
          }

          return ReS(res, 200, { data: user });

      } catch (error) {
          return ReE(res, 400, { msg: error.message });
      }
    },


    // Update Profile
    updateProfile: async (req, res) => {
      try {
          const { user_id, name, email, phone } = req.body;

          const [updateResult, updateError] = await of(
              User.updateOne(
                  { _id: mongoose.Types.ObjectId(user_id) },
                  { $set: { name, email, phone } }
              )
          );
          if (updateError) throw updateError;
          return ReS(res, 200, { msg: "Profile updated successfully" });

      } catch (error) {
          return ReE(res, 400, { msg: error.message });
      }
    },

    // Update Password
    updatePassword: async (req, res) => {
      try {
          const { user_id, current_password, password } = req.body;

          const user = await User.findById(user_id);
          if (!user) {
              throw new Error("User not found");
          }

          const passwordMatch = await bcrypt.compare(current_password, user.password);
          if (!passwordMatch) {
              throw new Error("Current password is incorrect");
          }

          const newHashedPassword = await bcrypt.hash(password, 8);

          const [updateResult, updateError] = await of(
              User.updateOne(
                  { _id: mongoose.Types.ObjectId(user_id) },
                  { $set: { password: newHashedPassword } }
              )
          );
          if (updateError) throw updateError;
          return ReS(res, 200, { msg: "Password updated successfully" });

      } catch (error) {
          return ReE(res, 400, { msg: error.message });
      }
    },


}