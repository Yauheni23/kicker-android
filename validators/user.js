export const validateCreateUser = (user) => {
    const isValidUser = user.name.search(/^[\wА-Яа-я-]*$/) !== -1 && user.name.length >= 2 && user.name.length <= 20;
    const isValidPassword = user.password.search(/^[A-Za-z0-9]*$/) !== -1 && user.password.length >= 2 && user.password.length <= 20;

    return isValidPassword && isValidUser;
};

export const validateRegisterUser = (user) => {
    const isValidUser = user.name.search(/^[\wА-Яа-я-]*$/) !== -1 && user.name.length >= 2 && user.name.length <= 20;
    const isValidPassword = user.password.search(/^[A-Za-z0-9]*$/) !== -1 && user.password.length >= 2 && user.password.length <= 20;
    const isSame = user.repeatedPassword === user.password;

    return isValidPassword && isValidUser && isSame;
};
