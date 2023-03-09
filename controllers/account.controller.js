import bcrypt from 'bcryptjs';
import { of } from 'await-of';
import { User } from '../models/user.model.js';
import { ReE, ReS } from '../helper/utils.js';

const accountController = {

    // Get User Details
    getUerDetails: async (req, res) => {
        try {
            const { user_id } = req.body;
            const [user, error] = await of(User.findOne({_id: mongoose.Types.ObjectId(user_id)}));
            if (error) throw error;
            return ReS(res, 200, { data: user });
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Profile
    updateProfile: async (req, res) => {
        try {

            const { user_id, name, email, phone } = req.body;
      
            const [updateResult, updateError] = await of(
                User.updateOne(
                  {
                    _id: mongoose.Types.ObjectId(user_id),
                  },
                  { 
                    $set: { 
                        name: name,
                        email: email,
                        phone: phone
                    } 
                  }
                )
              );
              if (updateError) throw updateError;
              return ReS(res, 200, { msg: "Profile Updated Successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Password
    updatePassword: async (req, res) => {
        try {
            
            const { user_id, password } = req.body;

            var new_password = bcrypt.hashSync(password, 8);
      
            const [updateResult, updateError] = await of(
                User.updateOne(
                  {
                    _id: mongoose.Types.ObjectId(user_id),
                  },
                  { 
                    $set: { password: new_password } 
                  }
                )
              );
              if (updateError) throw updateError;
              return ReS(res, 200, { msg: "Password Updated Successfully" });

        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

}