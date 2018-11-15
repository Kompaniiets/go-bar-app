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
                updatedAt: item.updatedAt,
                tables: !item.bookedTables ? [] : new Array(item.schedule.numberOfTables).fill({})
            };

            if (item.bar) {
                location.user = {
                    id: item.bar.id,
                    email: item.bar.email,
                    firstName: item.bar.firstName,
                    lastName: item.bar.lastName,
                    barName: item.bar.barName,
                    phone: item.bar.phone,
                };
            }

            if (item.schedule) {
                location.schedule = {
                    id: item.schedule.id,
                    locationId: item.schedule.locationId,
                    opensIn: item.schedule.opensIn,
                    closesIn: item.schedule.closesIn,
                    numberOfTables: item.schedule.numberOfTables,
                    createdAt: item.schedule.createdAt,
                };
            }

            if (item.bookedTables && item.bookedTables.length) {
                location.tables = item.bookedTables.map(i => ({
                    userId: i.userId,
                    startAt: i.startAt,
                    endAt: i.endAt
                }));

                if (location.tables.length < item.schedule.numberOfTables) {
                    location.tables = location.tables.concat(new Array(item.schedule.numberOfTables - location.tables.length).fill({}));
                }
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
