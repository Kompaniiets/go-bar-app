const CONSTANTS = require('../../../constants');

module.exports = () => {
    function baseResponse(data) {
        function resStructure(item) {
            return {
                id: item.id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                isBar: item.isBar,
                avatarUrl: item.imageId ? `${CONSTANTS.S3.BASE_PATH}${item.image.url}` : '',
                isVerified: item.isVerified,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                token: item.token
            };
        }

        if (Array.isArray(data)) {
            return data.map(item => resStructure(item));
        }

        return resStructure(data);
    }

    function baseUser(data) {
        function userStructure(item) {
            const user = {
                id: item.id,
                email: item.email,
                firstName: item.firstName,
                lastName: item.lastName,
                isBar: item.isBar,
                avatarUrl: item.imageId ? `${CONSTANTS.S3.BASE_PATH}${item.image.url}` : '',
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
            return data.map(item => userStructure(item));
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
                avatarUrl: item.imageId ? `${CONSTANTS.S3.BASE_PATH}${item.image.url}` : '',
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
            return data.map(item => userStructure(item));
        }

        return userStructure(data);
    }

    return {
        baseUser,
        baseBar,
        baseResponse
    };
};
