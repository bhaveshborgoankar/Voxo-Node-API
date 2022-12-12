
export const ReS = async (res, code, message, data) => { // Success Web Response
    return data ? res.status(code).json({ msg: message, data: data })
        : res.status(code).send(message);
};

export const ReE = async (res, code, message) => { // Error Web Response
    return res.status(code).send(message);
};