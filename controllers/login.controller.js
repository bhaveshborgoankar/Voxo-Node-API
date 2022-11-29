const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        res.status(200).json({ message: "Again Login123" })
    } catch (error) {
        console.log(error)
        return
    }
}
export default loginController