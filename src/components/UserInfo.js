export class UserInfo {
    constructor({ name, description }) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(description);
    }

    getUserInfo() {
        const userInfoObject = {};
        userInfoObject['profile-name'] = this._name.textContent;
        userInfoObject['profile-description'] = this._description.textContent;
        return userInfoObject;
    }

    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.about;
    }
}