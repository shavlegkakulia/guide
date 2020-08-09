class CommonService {
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    serializedata = (data) => JSON.parse(JSON.stringify(data));

    sortAskDesc(prop, reverse) {
        return function (a, b) {
            if (a[prop] < b[prop]) return reverse ? 1 : -1;
            if (a[prop] > b[prop]) return reverse ? -1 : 1;
            return 0;
        };
    }
}

export default new CommonService()