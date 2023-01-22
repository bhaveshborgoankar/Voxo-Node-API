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
            
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

    // Update Password
    updatePassword: async (req, res) => {
        try {
            
        } catch (error) {
            return ReE(res, error.code, { msg: error.message });
        }
    },

}