module.exports = () => {
    function base(data) {
        function resStructure(item) {
            const location = {
                id: item.id,
                userId: item.userId,
                title: item.title,
                info: item.info,
                lat: item.lat,
                lng: item.lng,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt
            };

            if (item.schedule) {
                location.opensIn = item.schedule.opensIn;
                location.closesIn = item.schedule.closesIn;
                location.numberOfTables = item.schedule.numberOfTables;
            }

            return location;
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
