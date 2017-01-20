const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];

export function isEmail(value) {
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'INVALID_EMAIL';
    }
}

export function required(value) {
    if (isEmpty(value)) {
        return 'REQUIRED';
    }
}

export function isPasswordCorrect(value){
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    if (!isEmpty(value) && !re.test(value))
        return 'INVALID_PASSWORD'
}

export function minLength(min) {
    return value => {
        if (!isEmpty(value) && value.length < min) {
            return `INVALID_MIN_LENGTH`;
        }
    };
}

export function maxLength(max) {
    return value => {
        if (!isEmpty(value) && value.length > max) {
            return `INVALID_MAX_LENGTH`;
        }
    };
}

export function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return 'INVALID_INTEGER';
    }
}

export function oneOf(enumeration) {
    return value => {
        if (!~enumeration.indexOf(value)) {
            return 'INVALID_ONE_OF';
            // return `Must be one of: ${enumeration.join(', ')}`;
        }
    };
}

export function match(field) {
    return (value, data) => {
        if (data) {
            if (value !== data[field]) {
                return 'INVALID_MATCH';
            }
        }
    };
}

export function createValidator(rules) {
    return (data = {}) => {
        const errors = {};
        Object.keys(rules).forEach((key) => {
            const rule = join([].concat(rules[key])); // concat enables both functions and arrays of functions
            const error = rule(data[key], data);
            if (error) {
                errors[key] = error;
            }
        });
        return errors;
    };
}