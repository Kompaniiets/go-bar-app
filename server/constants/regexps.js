module.exports = {
    WITHOUT_LATIN_CHAR: /^[^а-яА-Я]+$/,
    PASSWORD_VALIDATION: /^(?=.*[A-Za-zа-яА-Я])(?=.*\d).+$/,
    MULTI_SPACE_TRIM: /\s\s+/g,
    PHONE: /^\+?[1-9]\d{1,14}$/,
    TIME: /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9](:[0-5][0-9]){0,1}$/
};
