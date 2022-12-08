import { of } from "await-of";
import { Category } from "../connection/db.js";

const categoryController = {
    create: async (req, res, next) => {
        try {
            const { type } = req.body;
            Category.findOne({ type: type }, function (err, user) {
                if (err) {
                    console.log("Errr", err)
                    res.status(200).json({ msg: 'Please add proper type' })
                } else {
                    // const category = await of(Category.create({
                    //     type: type
                    // }))
                    // res.status(200).json({ msg: "Added Successfully", data: category });
                }
            })
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    }
}
export default categoryController;