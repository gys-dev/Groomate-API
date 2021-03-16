module.exports = {
    getRandomField: (fields = []) => {
        const length = fields.length;
        const randomInx = Math.floor(Math.random() * length);

        return fields[randomInx];
    },

    getRandomInRange: (start, end) => {
        return Math.floor(Math.random() * (end - start + 1)) + start;
    },

    getHostURL: (req) => {
        return req.protocol + '://' + req.headers.host;
    }
      
}