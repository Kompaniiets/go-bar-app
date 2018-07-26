module.exports = () => {
    function baseUser(data) {
        function userStructure(item) {
            const user = {
                id: item.id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                isBar: item.isBar,
                isVerified: item.isVerified,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            };

            if (item.token && item.refreshToken) {
                user.session = {
                    accessToken: item.token,
                    refreshToken: item.refreshToken,
                    expiresAt: item.lifeTime
                };
            }

            return user;
        }

        if (Array.isArray(data)) {
            return data.map(user => userStructure(user));
        }

        return userStructure(data);
    }

    function baseBar(data) {
        function userStructure(item) {
            const bar =  {
                id: item.id,
                email: item.email,
                barName: item.barName,
                phone: item.phone,
                isBar: item.isBar,
                isVerified: item.isVerified,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            };

            if (item.token && item.refreshToken) {
                bar.session = {
                    accessToken: item.token,
                    refreshToken: item.refreshToken,
                    expiresAt: item.lifeTime
                };
            }

            return bar;
        }

        if (Array.isArray(data)) {
            return data.map(user => userStructure(user));
        }

        return userStructure(data);
    }

    return {
        baseUser,
        baseBar
    };
};
