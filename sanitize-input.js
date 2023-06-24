const { body } = require('express-validator');


app.post('/api/messages', authenticateToken, [
    body('message')
      .trim()
      .notEmpty().withMessage('Message content is required')
      .isString().withMessage('Message must be a string')
      .isLength({ min: 1, max: 500 }).withMessage('Message must be between 1 and 500 characters')
      .escape()
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const user = req.user; // User object retrieved from the access token in the middleware
  
    // Save the message to the database
    const message = {
      userId: user.id, // Assuming the user object has an "id" property
      content: req.body.message,
      timestamp: new Date()
    };
  
    saveMessageToDatabase(message); // Replace with your logic to save the message to the database
  
    res.status(201).json({ message: 'Message created successfully' });
  });

app.post('/api/messages', [
  // Validate and sanitize the message
  body('content')
    .trim()
    .notEmpty().withMessage('Message content is required')
    .isLength({ min: 1, max: 500 }).withMessage('Message must be between 1 and 500 characters')
    .matches(/^[a-zA-Z0-9\s\.,?!]+$/).withMessage('Message can only contain alphanumeric characters, spaces, and punctuation marks')
    .escape(),
  body('author')
    .trim()
    .notEmpty().withMessage('Author name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Author name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Author name can only contain letters and spaces')
    .escape(),
  body('timestamp')
    .optional({ nullable: true, checkFalsy: true })
    .isISO8601().withMessage('Timestamp must be a valid ISO 8601 date')
    .toDate(),
  body('isImportant')
    .optional({ nullable: true, checkFalsy: true })
    .isBoolean().withMessage('isImportant must be a boolean value'),
  body('category')
    .optional({ nullable: true, checkFalsy: true })
    .isIn(['general', 'announcement', 'private']).withMessage('Invalid message category'),
  body('attachments')
    .optional({ nullable: true, checkFalsy: true })
    .isArray().withMessage('Attachments must be an array')
    .custom((value) => {
      // Perform additional custom validation on the attachments
      // ...
      return true; // Return true if validation passes
    }),
  body('location')
    .optional({ nullable: true, checkFalsy: true })
    .isObject().withMessage('Location must be an object')
    .custom((value) => {
      // Perform additional custom validation on the location object
      // ...
      return true; // Return true if validation passes
    }),
  body('tags')
    .optional({ nullable: true, checkFalsy: true })
    .isArray().withMessage('Tags must be an array')
    .custom((value) => {
      // Perform additional custom validation on the tags array
      // ...
      return true; // Return true if validation passes
    }),
  body('priority')
    .optional({ nullable: true, checkFalsy: true })
    .isInt().withMessage('Priority must be an integer')
    .toInt(),
  // Add more validators as needed
  body('customField1')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      // Perform custom validation on customField1
      // ...
      return true; // Return true if validation passes
    }),
  body('customField2')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      // Perform custom validation on customField2
      // ...
      return true; // Return true if validation passes
    }),
  // Add more custom field validators as needed
], (req, res) => {
  // Handle the route logic
});