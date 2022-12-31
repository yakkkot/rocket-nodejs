const isEmailValidReg = (email) => {
    const isValid = new RegExp(/[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return isValid.test(email);
};

module.exports = {
    isEmailValidReg
};