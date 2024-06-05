// ** Returns initials from string
// export const getInitials = string => string.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '')

export const getInitials = (name) => {
    if (!name) return ''; // Return an empty string if name is undefined or null

    const initials = name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase();

    return initials;
};