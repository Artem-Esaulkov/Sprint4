export class UserInfo {
    constructor({ name, description }) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
    }

    getUserInfo() {
        const userInfoObject = {};
        userInfoObject[this._name.name] = this._description.textContent;
        return userInfoObject;
    }

    setUserInfo(data) {
        this._name = data.name;
        this._description = data.value;
    }
}