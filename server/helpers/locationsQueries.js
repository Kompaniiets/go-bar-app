const GET_LOCATIONS_BY_PARAMS = `
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
        LIMIT $offset, $limit;
`;

module.exports = {
    GET_LOCATIONS_BY_PARAMS
};
