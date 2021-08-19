export const renameFile = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileName = file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 4).toString(4))
        .join('')

    callback(null, `${name}-${randomName}.${fileName}`);
}

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(xlsx|docx|pdf)$/)) {
        return callback(new Error('Invalid format type'), false)
    }

    callback(null, true);
}
