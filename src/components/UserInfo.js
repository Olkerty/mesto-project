export class UserInfo {
    constructor(name, profession, api) {
        this._name = document.querySelector(`.${name}`);
        this._profession = document.querySelector(`.${profession}`);
        this._api = api;
    }

    getUserInfo() {
        return this._api.loadAvatar();
    }

    setUserInfo(name, profession) {
      return  this._api.submitEditFormToServer(name, profession)
            .then((res) => {
                this._name.textContent = res.name;
                this._profession.textContent = res.about;
            })
    }
}
