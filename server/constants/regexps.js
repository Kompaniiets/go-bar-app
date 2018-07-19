module.exports = {
    WITHOUT_LATIN_CHAR: /^[^а-яА-Я]+$/,
    PASSWORD_VALIDATION: /^(?=.*[A-Za-zа-яА-Я])(?=.*\d).+$/,
    MULTI_SPACE_TRIM: /\s\s+/g,
    PHONE: /^\+?[1]{1}\d{10}$/,
};
