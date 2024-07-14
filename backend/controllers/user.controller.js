import User from "../models/user.model.js";

// Get all users except the logged in user
export const getUsers = async (req, res) => {

	try {
		const loggedInUserId = req.user._id;	// Get the logged in user's id

		// Find all users except the logged in user
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);	// Send the response

	} catch (error) {

		// console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "API Error: getUsers controller" });
	}
}