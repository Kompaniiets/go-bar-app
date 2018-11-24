const LOCATION_QUERY = `
    SELECT
          id, (
            6371 * acos (
              cos(radians($lat))
              * cos(radians(lat))
              * cos(radians(lng) - radians($lng))
              + sin (radians($lat))
              * sin(radians(lat))
            )
          ) AS distance
        FROM locations
        HAVING distance < $radius
        ORDER BY distance
`;

const ADD_PAGINATION = 'LIMIT $offset, $limit';

const GET_LOCATIONS_BY_PARAMS = `
        ${LOCATION_QUERY}
        ${ADD_PAGINATION};
`;

const COUNT_LOCATIONS = `
        SELECT 
            COUNT(DISTINCT barGroups.id) AS countRows
        FROM
            (${LOCATION_QUERY}) AS barGroups
`;

module.exports = {
    GET_LOCATIONS_BY_PARAMS,
    COUNT_LOCATIONS
};
