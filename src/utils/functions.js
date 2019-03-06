export const getInt = (nr) => {
    let o = parseInt(nr, 10);
    if (isNaN(o))
        return null;
    return o;
}