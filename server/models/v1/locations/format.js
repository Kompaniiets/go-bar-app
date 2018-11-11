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

            if (item.bar) {
                location.bar = {
                    id: item.bar.id,
                    email: item.bar.email,
                    firstName: item.bar.firstName,
                    lastName: item.bar.lastName,
                    barName: item.bar.barName,
                    phone: item.bar.phone,
                };
            }

            if (item.schedule) {
                location.opensIn = item.schedule.opensIn;
                location.closesIn = item.schedule.closesIn;
                location.numberOfTables = item.schedule.numberOfTables;
            }

            if (item.bookedTables.length) {
                location.tables = item.bookedTables.map(i => ({
                    userId: i.userId,
                    startAt: i.startAt,
                    endAt: i.endDate
                }));
            }

            return location;
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
