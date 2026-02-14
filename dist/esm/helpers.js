export const formDate = (dateString) => {
    const ms = Date.parse(dateString);
    if (Number.isNaN(ms)) {
        return 0;
    }
    return ms / 1000;
};
export const pickFirstNonEmpty = (...values) => {
    for (const value of values) {
        if (value && value.trim().length > 0) {
            return value;
        }
    }
    return null;
};
