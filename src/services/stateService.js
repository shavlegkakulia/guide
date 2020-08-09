
class StateService {
    static states = [];

    _createState(key) {
        let state = StateService.states.find(x => x.key === key);
        let isNew = state == null;
        state = state || {
            key: key,
            value: {},
            subscriptions: []
        };

        if (isNew) StateService.states.push(state);
        return state;
    }

    getState(key) {
        let state = this._createState(key);

        return {
            value: state.value,
            subscribe: (fn) => {
                state.subscriptions.push(fn);
                fn(state.value);

                return {
                    unsubscribe: () => {
                        let index = state.subscriptions.indexOf(fn);
                        if (index !== -1) state.subscriptions.splice(index, 1);
                    }
                };
            }
        };
    }

    setState(key, value) {
        let state = this._createState(key);

        state.value = { ...state.value, ...value };
        for (let subscription of state.subscriptions)
            subscription(state.value);
    }

    clearState(key) {
        let clear = (state) => {
            state.value = {};
        }
        if (key) {
            let state = this.getState(key);
            clear(state);
            return;
        }

        for (let state of StateService.states)
            clear(state);
    }
}

export default new StateService();