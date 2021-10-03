const { User } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');
const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            const foundUser = await User.findOne({
                _id: context.user._id
            });

            if (!foundUser) {
                return res.status(400).json({ message: 'Cannot find a user with this id!' });
            }
            return foundUser;

        }
    },
    Mutation: {
        login: async (parent, [email, password]) => {
            const user = await User.findOne({ email: email });
            if (!user) {
                return res.status(400).json({ message: "Can't find this user" });
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                return res.status(400).json({ message: 'Wrong password!' });
            }
            const token = signToken(user);
            return { token, user };

        },
        addUser: async (parent, args) => {
            const user = await User.create(args);

            if (!user) {
                return ({ message: 'Something is wrong!' });
            }
            const token = signToken(user);
            return ({ token, user });

        },
        saveBook: async (parent, args, context) => {
            const updatedUser = await context.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args } },
                { new: true, runValidators: true }
            );
            return updatedUser;

        },
        removeBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: bookId } } },
                { new: true }
            );

            return updatedUser;

        }

    }


}

module.exports = resolvers;