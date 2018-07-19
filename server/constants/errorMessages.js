module.exports = {
    VALIDATOR_ERROR: 'Validator error',
    INTERNAL_ERROR: 'Internal server error has occurred',
    DATABASE_ERROR: 'Database error',
    NOT_FOUND_ERROR: 'Not Found',
    NOT_IMPLEMENTED_ERROR: 'Not Allowed',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    UNPROCESSABLE_ENTITY: 'Unprocessable Entity',
    CONFLICT: 'Conflict',
    GONE: 'Gone',
    FAILED_DEPENDENCY: 'Failed dependency',
    NOT_ALLOWED: 'Method not allowed',

    NAME_INVALID: '!!First and last name max is 30 symbols, required, can\'t contain only spaces.',
    MIN_PASSWORD_LENGTH: '!!Minimal length: 6 characters.',
    MAX_PASSWORD_LENGTH: '!!Maximal length: 50 characters.',
    EMAIL_VALIDATION: '!!Please enter a valid email.',
    PASSWORD: '!!Password should contain at least 1 letter and 1 digit.',
    LOGIN_VALIDATION: '!!Invalid email address or password.',

    INVALID_PHONE_FORMAT: 'Fails to match the required pattern +15555555555',

    EMAIL_TAKEN: 'Email already being used',
    UNIQUE_VIOLATION: 'unique violation',
    PATH_EMAIL: 'email',
    PATH_TOKEN: 'token',
    PATH_REFRESH_TOKEN: 'refreshToken',
    PATH_API_KEY: 'Api key',
    PATH_IMAGE: 'image',
    INVALID_EMAIL: 'Email address is not registered',
    ACCOUNT_NOT_VERIFIED: 'Your account hasn\'t been activated yet. Please check your email.',
    ACCOUNT_ALREADY_VERIFIED: 'Your account is already verified.',
    INVALID_TOKEN: 'Invalid token',
    INVALID_ACCESS_TOKEN: 'Invalid access token',
    INVALID_REFRESH_TOKEN: 'Invalid refresh token',
    INVALID_CREDENTIALS: 'Invalid credentials',
    INVALID_CONFIRM_EMAIL_LINK: 'Incorrect token',
    INVALID_FILE_TYPE: 'Incorrect image format. Allowed formats is \'png\', \'jpeg\', \'jpg\', \'PNG\', \'JPEG\', \'JPG\'',
    IMAGE_MISSING: 'Invalid image',
    IMAGE_TOO_LARGE: 'Image size must be less than 10 mb',
    AUTHORIZATION_FAILED: 'Invalid email address or password',
    INVALID_RESTORE_PASSWORD_LINK: 'The link you are trying to follow has already been used. Please log in using the updated password or reset it again.',
    EXPIRED_RESTORE_PASSWORD_LINK: 'Unfortunately, the link has expired. Please request email address verification again in your account.',

    INSTRUCTOR_INVALID_ROLE: 'User must be an instructor',
    INSTRUCTOR_PATH: 'instructorId',
    INSTRUCTOR_CANNOT_ADD_SELF: 'Cannot add self',
    INSTRUCTOR_ALREADY_ADDED_TO_FAVORITES: 'Instructor already added to favorites',
    INSTRUCTOR_ONLY_STUDENT_CAN_ADD: 'Only students can add instructors',
    INSTRUCTOR_PRICE_PER_HOUR_NOT_SET: 'Unable to book instructor. Price per hour not set.',

    RECORD_NOT_FOUND: 'Record not found',
    RECORD_ALREADY_EXISTS: 'Record already exists',
    PATH_ID: 'id',
    PERMISSION_DENIED: 'Permission denied',
    INSTRUCTOR_INFO_TAKEN: 'Instructor additional information already being created',
    WSL_RANKING_VALIDATION: '!!WSL Ranking must be number from 0 to 300',
    MAX_DATE_VALIDATION: '!!Date of training should not be later than current time',
    MIN_DATE_VALIDATION: '!!Date of training should not be longer than 100 years ago',
    PROFESSIONAL_REQUIRED: 'At least 1 of WSL, @instagram OR Sponsor should be required if user is professional',
    BOARD_TYPE_MAX_LENGTH: '!!Maximum, 3 options can be selected!',
    BOARD_TYPE_VALIDATION: '!!The board type must be one of: 1, 2 or 3.',
    ADDITIONAL_INFO_VALIDATION: '!!The value must be one of: 1, 2 or 3.',
    INCORRECT_PASSWORD: 'Incorrect password!',
    INTEGER_PRICE: '!!Price per hour should be from $10 to $10000',
    DEFAULT_LOCATION_CONFLICT: 'You can\'t delete default location',
    AGE_REQUIRED: 'One of the fields dateOfBirth or isAdult is required!',
    MUST_BE_UNIQUE: '!!All values must be unique',
    RADIUS_MISSING: 'Please enter a radius!',
    MORE_THEN_5_LOCATIONS: 'You can\'t add more than 5 locations!',
    TYPE_STRIPE_ERROR: 'StripeInvalidRequestError',
    TYPE_STRIPE_CARD_ERROR: 'StripeCardError',
    MUST_BE_GREATER: '!!maxPrice cannot be less {{limit}}',
    CARD_UNABLE_DELETE_DEFAULT: 'Unable to delete default card.',
    CARD_NO_DEFAULT_OR_NOT_EXISTS: 'User has no default card or specified card does not exist',
    PAYMENT_EXPIRED: 'Payment expired',
    STARS_LENGTH_VALIDATION: '!!Stars should be from 1 to 5',
    REQUEST_TO_YOURSELF: 'You can\'t perform this operation on yourself',
    REVIEW_ALREADY_CREATED: 'Review for this lessons already exists',
    INSTRUCTOR_NOT_EXIST: 'Instructor with such id does not exist',
    STUDENT_NOT_EXIST: 'Student with such id does not exist',
    LESSON_NOT_COMPLETED: 'Lesson is not completed',
    LESSON_NOT_FOUND: 'Session not found.',
    CONVERSATION_NOT_EXIST: 'Conversation not exist',
    ACCOUNT_EXISTS: 'Account exists. Please log in using your email address',
    NOT_RETURNED_BY_FACEBOOK: 'Unfortunately, Facebook does not provide email address associated with your account. Please update Facebook permissions for applications and try again or log in using other method.',
    NOT_RETURNED_BY_GOOGLE: 'Unfortunately, Google does not provide email address associated with your account. Please update Google permissions for applications and try again or log in using other method.',
    NOT_CONSIST_IN_CHAT: 'You are not consist in this conversation',
    UUID_TAKEN: 'uuid already being used',
    PATH_UUID: 'uuid',
    CHAT_BOT_NOT_EXIST: 'Chat bot is not exist in users table!',
    MALFORMED_ACCESS_TOKEN: 'Malformed access token',
    ENTER_REASON: 'Reason must be one of 1, 2 or 3.',
    USER_CONVERSATIONS: 'Please select only the conversations in which you are a member',
    PATH_CONVERSATION_ID: 'conversationId',
    IMAGE_ALREADY_UPLOAD: 'Message with this uuid already has an image',
    INCORRECT_ROLE: 'You selected an incorrect role',
    PATH_ROLE: 'role',
    NOT_FOUND_CONVERSATION: 'Conversations not found',
    CANT_CALL: 'You can\'t call this user',
    USER_HAVE_NO_PHONE_NUMBER: 'Please, enter your phone number in settings',
    USER_NOT_FOUND: 'User not found',
    RECIPIENT_HAVE_NO_PHONE_NUMBER: 'The recipient does not have a phone number',
    CANT_REPORT: 'You can\'t report user with the same role.',
    RECIPIENT_NOT_FOUND: 'Recipient not found',
    WRONG_ANSWERS: 'Don’t worry though, study up, and you’ll be able to retake the quiz in 24 hours!',
    ID_CARD_ALREADY_EXISTS: 'Personal ID card already exists',
    INVALID_NAME_ON_CARD: '!!Name on card max is 61 symbols, required, can\'t contain only spaces.',
    INVALID_CARD_NUMBER: '!!Card number max is 20 symbols, required, can\'t contain only spaces.',
    INVALID_SCHOOL_OF_CERTIFICATION: '!!School of certification max is 20 symbols, required, can\'t contain only spaces.',
    CERTIFICATION_ALREADY_EXISTS: 'Certification already exists',
    ROLE_ALREADY_EXIST: 'Role already exists',
    ACCOUNT_BLOCKED: 'Your account was blocked. Contact administrator in order to clarify details.',
    FAQ_NOT_FOUND: 'FAQ not found',
    REPORT_NOT_FOUND: 'Report not found',
    USER_NOT_FOUND_IN_CACHE: 'User is not found in cache',
    SAME_EMAIL: 'New email must differ from the current one.',
    WRONG_CURRENT_EMAIL: 'Wrong current email',
    ALREADY_SENT_EMAIL: 'Email was already sent',
    INVALID_INTEGER_AMOUNT: 'parameter_invalid_integer',
    PENDING_SESSIONS: 'You have pending or upcoming sessions',
    STUDENT_ACCOUNT_NOT_VERIFIED: 'Email Verification Necessary. Please verify your email and make sure to have default card set properly in the account settings in order to request a session.',
    INSTRUCTOR_ACCOUNT_NOT_VERIFIED: 'Please make sure to verify your email address and link a stripe account to be available for requests from your Surf Guests.',
    EMAIL_ALREADY_VERIFIED: 'Email already verified',
    USER_HAS_NOT_YET_PASSED_QUIZ: 'User has not yet passed quiz',
    USER_ALREADY_PASSED_QUIZ: 'User already passed quiz',
    CAN_NOT_USE_FOR_SOCIAL_PROFILE: 'Can not use this option for social account',
};
