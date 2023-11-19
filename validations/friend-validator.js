const { body } = require('express-validator');

// Validates that the user ID is a positive integer
const validateUserId = body('userID')
    .isInt({ min: 1 }).withMessage('User ID must be a positive integer');

// Validates that the user IDs are positive integers and not equal
const validateUserIds = [
    body('userID1')
        .isInt({ min: 1 }).withMessage('User ID 1 must be a positive integer'),
    body('userID2')
        .isInt({ min: 1 }).withMessage('User ID 2 must be a positive integer'),
    body().custom(body => {
        if (body.userID1 === body.userID2) {
            throw new Error('User IDs cannot be the same');
        }
        return true;
    })
];

module.exports = {
    validateUserId,
    validateUserIds
};
