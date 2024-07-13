export function formatName(fullName)  {
    const nameParts = fullName.split(' ');
    let formattedName = nameParts.slice(0, 2).join(' ');
    return formattedName;
}

export function ellipsisName(fullName) {
    if (fullName.length > 20) {
        return fullName.substring(0, 17) + '...';
    }
    return fullName;
}