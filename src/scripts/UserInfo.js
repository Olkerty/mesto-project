import {api} from "./script.js";

export class UserInfo {
    constructor(name, profession) {
        this._name = document.querySelector(`.${name}`);
        this._profession = document.querySelector(`.${profession}`);
    }

    getUserInfo() {
        return api.loadAvatar();
    }

    setUserInfo(name, profession) {
      return  api.submitEditFormToServer(name, profession)
            .then((res) => {
                this._name.textContent = res.name;
                this._profession.textContent = res.about;
            })
    }
}
