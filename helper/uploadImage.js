import path from 'path';

export const modifiedImage = (currentFile) => {

    if (currentFile) {

        let trimSpace = currentFile.name.replaceAll(' ', '');
        let file_Name = Date.now() + '-' + trimSpace
        let newPath = path.join(process.cwd(), 'public/', file_Name)

        currentFile.mv(newPath);

        return file_Name;

    } else return undefined;

}