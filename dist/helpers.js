const filterObj = (obj) => Object.fromEntries(Object
    .entries(obj)
    .filter(([_, value]) => {
    return value !== undefined && value !== null;
}));
export default filterObj;
