
export const ReS = async (res, code, obj) => { // Success Web Response
    return res.status(code).json(obj);
};

export const ReE = async (res, code, obj) => { // Error Web Response
    return res.status(code).json(obj);
};