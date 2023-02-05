
export const ReS = async (res, code, obj) => { // Success Web Response
    obj.success = true;
    return res.status(code).json(obj);
};

export const ReE = async (res, code, obj) => { // Error Web Response
    obj.success = false;
    return res.status(code).json(obj);
};