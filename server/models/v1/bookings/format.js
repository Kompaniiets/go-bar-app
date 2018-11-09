module.exports = () => {
    function base(data) {
        function resStructure(item) {
            return {

            };
        }

        if (Array.isArray(data)) {
            return data.map(item => resStructure(item));
        }

        return resStructure(data);
    }

    return {
        base,
    };
};
