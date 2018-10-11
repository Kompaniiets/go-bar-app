module.exports = () => {
    function base(data) {
        function resStructure(item) {
            return {
                id: item.id,
                userId: item.userId,
                title: item.title,
                info: item.info,
                lat: item.lat,
                lng: item.lng,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };
        }

        if (Array.isArray(data)) {
            return data.map(user => resStructure(user));
        }

        return resStructure(data);
    }

    return {
        base,
    };
};
