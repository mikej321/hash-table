class HashMap {
    constructor() {
        this.bucket = new Array(16);
    }

    hash(key) {
        return stringToNumber(key);
    }

    set(key, value) {
        let thisHash = this.hash(key);
        thisHash = thisHash % 16;

        let myObj = {
            [`${key}`]: value
        }

        this.bucket[thisHash] = myObj;
    }

    get(key) {
        let thisHash = this.hash(key);
        thisHash = thisHash % 16;

        if (thisHash < 0 || thisHash >= this.bucket.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.bucket[thisHash] === undefined) {
            return null;
        } else if (this.bucket[thisHash].hasOwnProperty(key)) {
            let thisVal = Object.values(this.bucket[thisHash]);
            return thisVal[0];
        }
    }

    has(key) {
        let thisHash = this.hash(key);
        thisHash = thisHash % 16;

        if (thisHash < 0 || thisHash >= this.bucket.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.bucket[thisHash] === undefined) {
            return false;
        } else if (this.bucket[thisHash].hasOwnProperty(key)) {
            return true;
        }
    }

    remove(key) {
        let thisHash = this.hash(key);
        thisHash = thisHash % 16;

        if (thisHash < 0 || thisHash >= this.bucket.length) {
            throw new Error('Trying to access index out of bound');
        }

        if (this.bucket[thisHash] === undefined) {
            return false;
        } else if (!this.bucket[thisHash].hasOwnProperty(key)) {
            return false;
        } else if (this.bucket[thisHash].hasOwnProperty(key)) {
            this.bucket.splice(thisHash, 1);
            return true;
        }
    }

    length() {
        let bucketLength = 0;
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] !== undefined) {
                bucketLength++;
            }
        }
        return bucketLength;
    }

    clear() {
        this.bucket = new Array(16);
    }

    keys() {
        let keyArr = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] !== undefined) {
                for (const key in this.bucket[i]) {
                    keyArr.push(key);
                }
            }
        }
        return keyArr;
    }

    values() {
        let valueArr = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] !== undefined) {
                let thisVal = Object.values(this.bucket[i]);
                valueArr.push(thisVal[0]);
            }
        }
        return valueArr;
    }

    entries() {
        let entriesArr = [];
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i] !== undefined) {
                entriesArr.push(Object.entries(this.bucket[i]));
            }
        }
        return entriesArr;
    }
}

function stringToNumber(string) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < string.length; i++) {
        hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }

    return hashCode;
}